---
title: ".NET"
metaTitle: ".NET | GraphQL Backend Stack Tutorial"
metaDescription: "Learn how to integrate .NET with Hasura."
---

## What is .NET 
.NET is an open-source and cross-platform framework supported by Microsoft. Learn more about .NET [here](https://dotnet.microsoft.com/).

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out [the documentation](https://hasura.io/docs/latest/index/).

See the [the server source code on Github](https://github.com/hasura/learn-graphql/backend/backend-stack/tutorial-site/source-code/dtonet).

## Create a new .NET project

We will begin by creating a new .NET project. We will use the `dotnet` command line tool to create a new project. We will also be using .NET's minimal api template to create a new project. 


```bash
dotnet new web -o dotnet-graphql
cd dotnet-graphql
```

This will create a simple `Program.cs` file with a basic `Hello World` program. 

```csharp
using dotnet.action;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/action", (ActionPayload<LoginArgs> action) =>
{
    return new LoginResponse() { AccessToken = "<sample value>"};
});

app.Run();
```


In `action/action.cs`, we will create following models.

```csharp

namespace dotnet.action;

public class LoginResponse
{ 
    public string AccessToken { get; set; }
}

public class Mutation
{
    public LoginResponse Login { get; set; }
}

public class LoginArgs
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class ActionPayload<T>
{
    public Dictionary<string, string> SessionVariables { get; set; }
    
    public T Input { get; set; }
}
```


Run the application using:
    
```bash 
dotnet run
```

### Hasura Actions

We can integrate this endpoint into Hasura and generate the code using [Hasura Actions](https://hasura.io/docs/latest/actions/index/). In the Actions tab on the Hasura Console we will set up a custom login function



```graphql
type Mutation {
  login(username: String!, password: String!): LoginResponse
}
```

New types definition:

```graphql
type LoginResponse {
  AccessToken: String!
}
```

In the Hasura API explorer tab you should now be able to test it

```graphql
mutation {
  login(password: "password", username: "username") {
    AccessToken
  }
}
```

Result:

```json
{
  "data": {
    "login": {
      "AccessToken": "<sample value>"
    }
  }
}
```


### Event Triggers

With [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can get notified whenever an event happens in our database.


Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

1.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

1.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We will make a class to represent the payload.

```csharp
public class EventTriggerPayload<T>
{
    public Event<T> Event { get; set; }
    public string Created_At { get; set; }
    public string Id { get; set; }
    public Trigger Trigger { get; set; }
    public Table Table { get; set; }
}

public class Table
{
    public Table(string name = "", string schema = "dbo")
    {
        this.name = name;
        this.schema = schema;
    }


    public string schema { get; set; }
    public string name { get; set; }
}

public class Trigger
{
    public string Name { get; set; }
}

public class Event<T>
{
    public object Session_Variables { get; set; }
    public string Op { get; set; }
    public Data<T> Data { get; set; }
}

public class Data<T>
{
    public T Old { get; set; }
    public T New { get; set; }
}
```


1.  We will also create a model to represent our data.

```csharp
public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
```
1. Now we will add an HTTP handler to our `Program.cs` file.

```csharp
app.MapPost("/event", (EventTriggerPayload<User> payload) =>
{
    Console.WriteLine($"New user created: {payload.Event.Data.New.Name}");
    return new { };
});
```

When you add a user in Hasura your Go server should receive the event.

## Create .NET GraphQL Server

We will use [Hot Chocolate](https://chillicream.com/docs/hotchocolate/) to create a GraphQL server.

1. Add the Hot Chocolate NuGet package to your project.

```bash
dotnet add package HotChocolate.AspNetCore
```

1. Define the Todo Type in `Todo.cs`

```csharp
namespace HasuraDOTNetSample.Models;
public class Todo {
    public string Id { get; set; }

    public string Text { get; set; }

    public bool Done { get; set; }

    public User User { get; set; }
}
```


1. Add a Query type to `Query.cs`

```csharp
namespace HasuraDOTNetSample.Models;

public class Query
{
    public Todo[] GetTodos() => new Todo[]
    {
        new Todo { Id = "1", Text = "Todo 1", Done = false, User = new User { Id = "1", Name = "User 1" } },
        new Todo { Id = "2", Text = "Todo 2", Done = true, User = new User { Id = "2", Name = "User 2" } },
        new Todo { Id = "3", Text = "Todo 3", Done = false, User = new User { Id = "3", Name = "User 3" } },
    };
}
```

1. Add GraphQL Services to `Program.cs`

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();
```

This will add a GraphQL endpoint to your application. You can test it by going to `/graphql` in your browser. For more information on Hot Chocolate check out the [Get Started](https://chillicream.com/docs/hotchocolate/get-started).

### Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. In the Hasura Console remote schema tab, add your .NET GraphQL server `<Go server URL>/graphql`

1. In the API Explorer tab, try querying the sample todos.

   ```graphql
   query {
     todos {
       id
       text
       done
     }
   }
   ```

## Query GraphQL from .NET using Strawberry Shake

We can use [Strawberry Shake](https://chillicream.com/docs/strawberryshake/) to query our GraphQL server from .NET. This will generate a strongly typed client for us.

1. Create a dotnet tool-manifest

```bash
dotnet new tool-manifest
```

1. Install the Strawberry Shake Tools to your computer.

```bash
dotnet tool install StrawberryShake.Tools --local
```

1. Install the required Dependencies.

```bash
dotnet add package StrawberryShake.Transport.Http
dotnet add package StrawberryShake.CodeGeneration.CSharp.Analyzers
```

1. Add Dependency Injection and Http Extensions

```bash
dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package Microsoft.Extensions.Http
```

1. Add GraphQL client to your project using CLI tools

```bash
dotnet graphql init <Hasura URL>/v1/graphql -n HasuraClient 
```

1. Let's add a GraphQL query to your project.

```graphql
query GetUsers {
  user {
    id
    name
  }
}
```

1. Compile your project

```bash
dotnet build
```

This will create a client in `Generated` folder called `HasuraClient.StrawyberryShake.cs`. This will contain a strongly typed client for your GraphQL server.


1. Now let's enable your application to use the client we just created.
  
```csharp
builder.Services
    .AddHasuraClient()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri("<Hasura URL>/v1/graphql"));

IServiceProvider services = builder.Services.BuildServiceProvider();

var client = services.GetRequiredService<HasuraDOTNetSample.IHasuraClient>();
```

1. Lets add a simple get end-point to your application to return data from the GraphQL server using the new client

```csharp
app.MapGet("/getTodos", async (HasuraDOTNetSample.HasuraClient hasuraClient) =>
{
    var result = await hasuraClient.GetUsers.ExecuteAsync();
    return Results.Ok(result);
});
```
