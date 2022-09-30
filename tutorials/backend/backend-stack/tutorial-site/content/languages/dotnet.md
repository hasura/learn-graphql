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