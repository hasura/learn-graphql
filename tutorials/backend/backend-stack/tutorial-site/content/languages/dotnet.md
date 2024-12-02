---
title: "GraphQL with .NET (dotnet): Tutorial with server and API examples"
metaTitle: "GraphQL with .NET (dotnet): Tutorial with server and API examples"
metaDescription: "In this tutorial, learn how to integrate .NET (dotnet) in a GraphQL backend server stack along with performance and security considerations"
---

## Introduction

GraphQL as a query language, offers a flexible, efficient alternative to traditional REST APIs. For .NET developers, the adoption of GraphQL can significantly enhance the capability and performance of applications, especially when it comes to managing complex data requirements and real-time updates, spanning across multiple data sources. 

This guide delves into how .NET developers can harness the power of GraphQL, with a special focus on the advantages of compiler style GraphQL APIs, as demonstrated by Hasura, over the more traditional resolver style APIs found in many .NET GraphQL libraries.

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

### Why Choose GraphQL for .NET?

GraphQL provides several benefits that make it an attractive choice for .NET developers:

**Efficient Data Fetching**: Unlike REST, GraphQL allows clients to specify the exact data they need, reducing the amount of data transferred and improving response times.
**Strongly Typed Schema**: GraphQL’s schema-first approach aligns well with .NET's strongly typed nature, enabling better tooling and compile-time validation.
**Real-Time Capabilities**: With subscriptions, GraphQL supports real-time updates, making it ideal for applications that require live data, such as chat applications, live sports scores, and financial tickers. Learn more about [GraphQL subscriptions here](https://hasura.io/learn/graphql/intro-graphql/graphql-subscriptions/).
**Microservices**: In a microservices architecture, which is becoming increasingly common in .NET applications, GraphQL can serve as an excellent API gateway, aggregating data from multiple services.

Although not an exhaustive list, these features enhance the developer experience and the performance of applications, making GraphQL a compelling choice for modern .NET projects. We will also delve into how a GraphQL Supergraph will be better suited for projects with multiple data sources. In this comprehensive guide, we'll explore how to leverage GraphQL in your .NET applications, diving deep into queries, mutations, performance optimization.

## Understanding GraphQL in the .NET Ecosystem

Let's explore the landscape of GraphQL in .NET, diving deep into the nuances of compiler-style APIs and resolver-based, schema first approaches.

The .NET ecosystem has embraced GraphQL with several libraries and tools:

- **Hot Chocolate**: A popular .NET GraphQL server that integrates well with ASP.NET Core.
- **GraphQL .NET**: Another widely used GraphQL reference implementation for .NET.

While these libraries offer robust solutions for implementing GraphQL in .NET, they primarily follow a resolver-based approach. As we'll explore in the following sections, this approach can lead to performance issues when data requirements grow (leading to N+1 query problem, fetching more data than necessary from the underlying data source). 

## Setting Up a .NET GraphQL Server with Hot Chocolate

In this section, we'll explore how to set up a GraphQL server in .NET, create queries and mutations, and optimize performance using query planner/compiler approach. Whether you're building a new application or modernizing an existing one, you can apply these concepts.

We will use [Hot Chocolate](https://chillicream.com/docs/hotchocolate/) to create a GraphQL server.

1. Add the Hot Chocolate NuGet package to your project.

```bash
dotnet add package HotChocolate.AspNetCore
```

2. Define the Todo Type in `Todo.cs`

```csharp
namespace HasuraDOTNetSample.Models;
public class Todo {
    public string Id { get; set; }

    public string Text { get; set; }

    public bool Done { get; set; }

    public User User { get; set; }
}
```

3. Add a Query type to `Query.cs`

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

4. Add GraphQL Services to `Program.cs`

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();
```

This will add a GraphQL endpoint to your application. You can test it by going to `/graphql` in your browser. For more information on Hot Chocolate check out the [Get Started](https://chillicream.com/docs/hotchocolate/get-started).

### Best Practices for .NET GraphQL Server Configuration

When setting up your GraphQL server, consider these best practices:

- Use Dependency Injection: Leverage ASP.NET Core's built-in dependency injection to manage your GraphQL types and resolvers.

```.net
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypeExtension<UserQueries>()
    .AddTypeExtension<UserMutations>();
```

## Creating GraphQL Queries in .NET

Once you have set up your GraphQL server, the next step is to create and execute queries. This section will guide you through the process of defining, implementing, and optimizing GraphQL queries in a .NET environment.

### Fundamentals of GraphQL query

GraphQL queries allow clients to request specific data from the server. Unlike REST APIs, where each endpoint returns a fixed data structure, GraphQL queries are flexible and allow clients to ask for exactly what they need.

Key concepts of GraphQL queries include:
- **Fields**: The basic unit of a GraphQL query. Each field represents a piece of data you want to retrieve.
- **Arguments**: Used to pass values to fields, allowing for more specific data requests.
- **Aliases**: Allow you to rename fields in the query response.
- **Fragments**: Reusable units of a query that can be shared across multiple queries.

### Writing and Executing Queries in a .NET Environment

Let's walk through the process of creating and executing a GraphQL query using Hot Chocolate in a .NET application.
1. Define Your Data Model
First, let's define a simple data model:

```csharp
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
}
```

2. Create a Query Type
Next, create a query type that exposes this data:

```csharp
public class Query
{
    public Book GetBook(int id)
    {
        // In a real application, you would fetch this from a database
        return new Book
        {
            Id = id,
            Title = "GraphQL for .NET Developers",
            Author = "Jane Doe"
        };
    }

    public IEnumerable<Book> GetBooks()
    {
        // Return a list of books
        return new List<Book>
        {
            new Book { Id = 1, Title = "GraphQL for .NET Developers", Author = "Jane Doe" },
            new Book { Id = 2, Title = "ASP.NET Core in Action", Author = "John Smith" }
        };
    }
}
```

3. Configure the Query Type in Your GraphQL Server

In your Program.cs or Startup.cs, add the query type to your GraphQL server configuration:

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();
```

4. Execute Queries
Now you can execute queries against your GraphQL server. Here are some example queries:
Fetch a single book:

```graphql
query {
  getBook(id: 1) {
    title
    author
  }
}
```

Fetch all books
```graphql
query {
  getBooks {
    id
    title
    author
  }
}
```

### Query Optimization Techniques
As your GraphQL API grows, you'll need to implement optimization techniques to ensure good performance. Here are some key strategies:
1. Use DataLoader for Batching and Caching
DataLoader helps solve the N+1 query problem by batching and caching database calls:

```csharp
public class BookDataLoader : BatchDataLoader<int, Book>
{
    private readonly IBookRepository _bookRepository;

    public BookDataLoader(
        IBookRepository bookRepository,
        IBatchScheduler batchScheduler) 
        : base(batchScheduler)
    {
        _bookRepository = bookRepository;
    }

    protected override async Task<IReadOnlyDictionary<int, Book>> LoadBatchAsync(
        IReadOnlyList<int> keys,
        CancellationToken cancellationToken)
    {
        var books = await _bookRepository.GetBooksByIdsAsync(keys, cancellationToken);
        return books.ToDictionary(b => b.Id);
    }
}

public class Query
{
    public async Task<Book> GetBook([Service] BookDataLoader dataLoader, int id)
    {
        return await dataLoader.LoadAsync(id);
    }
}
```

2. Use Projections

Projections allow you to optimize database queries based on the requested fields.

3. Compile, don't resolve:

Compile an incoming GraphQL query to a database query (SQL, NoSQL) instead of resolving 

By implementing these query optimization techniques, you can ensure that your GraphQL API remains performant as it scales. In the next section, we'll explore how to implement mutations to modify data through your GraphQL API.

## Implementing GraphQL Mutations with .NET

## Advanced .NET GraphQL Concepts

## Real-world .NET GraphQL Examples

### Example: Querying GraphQL with .NET using Strawberry Shake

We can use [Strawberry Shake](https://chillicream.com/docs/strawberryshake/) to query our GraphQL server from .NET. This will generate a strongly typed client for us.

1. Create a dotnet tool-manifest

```bash
dotnet new tool-manifest
```

2. Install the Strawberry Shake Tools on your computer.

```bash
dotnet tool install StrawberryShake.Tools --local
```

3. Install the required Dependencies.

```bash
dotnet add package StrawberryShake.Transport.Http
dotnet add package StrawberryShake.CodeGeneration.CSharp.Analyzers
```

4. Add Dependency Injection and Http Extensions

```bash
dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package Microsoft.Extensions.Http
```

5. Add GraphQL client to your project using CLI tools

```bash
dotnet graphql init <Hasura URL>/v1/graphql -n HasuraClient
```

6. Let's add a GraphQL query to your project.

```graphql
query GetUsers {
  user {
    id
    name
  }
}
```

7. Compile your project

```bash
dotnet build
```

This will create a client in `Generated` folder called `HasuraClient.StrawyberryShake.cs`. This will contain a strongly typed client for your GraphQL server.

8. Now let's enable your application to use the client we just created.

```csharp
builder.Services
    .AddHasuraClient()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri("<Hasura URL>/v1/graphql"));

IServiceProvider services = builder.Services.BuildServiceProvider();

var client = services.GetRequiredService<HasuraDOTNetSample.IHasuraClient>();
```

9. Let's add a simple get end-point to your application to return data from the GraphQL server using the new client

```csharp
app.MapGet("/getTodos", async (HasuraDOTNetSample.HasuraClient hasuraClient) =>
{
    var result = await hasuraClient.GetUsers.ExecuteAsync();
    return Results.Ok(result);
});
```

## GraphQL .NET Performance Optimization

## Tackling the N+1 Query Problem in GraphQL .NET

## Summary

## Additional Resources



---------------------------------------------------------------------------

## GraphQL server with .NET (dotnet)

.NET is an open-source and cross-platform framework supported by Microsoft. Learn more about .NET [here](https://dotnet.microsoft.com/).

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

- You will learn how to create a GraphQL server with .NET and Hot Chocolate.
- If you have an existing GraphQL API with .NET, you can integrate it with Hasura as a [Remote Schema](https://hasura.io/docs/latest/remote-schemas/index/) to get a unified GraphQL API.
- If you have an existing REST API with .NET, you can transform that declaratively to GraphQL without writing any code using [Hasura REST Connectors](https://hasura.io/docs/latest/actions/rest-connectors/).
- You can also re-use or custom-write REST endpoints with .NET and map the endpoint to a GraphQL schema in Hasura.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out [the documentation](https://hasura.io/docs/latest/index/).

## Create a .NET GraphQL Server with Hot Chocolate

We will use [Hot Chocolate](https://chillicream.com/docs/hotchocolate/) to create a GraphQL server.

1. Add the Hot Chocolate NuGet package to your project.

```bash
dotnet add package HotChocolate.AspNetCore
```

2. Define the Todo Type in `Todo.cs`

```csharp
namespace HasuraDOTNetSample.Models;
public class Todo {
    public string Id { get; set; }

    public string Text { get; set; }

    public bool Done { get; set; }

    public User User { get; set; }
}
```

3. Add a Query type to `Query.cs`

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

4. Add GraphQL Services to `Program.cs`

```csharp
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();
```

This will add a GraphQL endpoint to your application. You can test it by going to `/graphql` in your browser. For more information on Hot Chocolate check out the [Get Started](https://chillicream.com/docs/hotchocolate/get-started).

### .NET GraphQL API Federation using Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. In the Hasura Console Remote Schemas tab, add your .NET GraphQL server `<.NET server URL>/graphql`

2. In the API Explorer tab, try querying the sample todos.

   ```graphql
   query {
     todos {
       id
       text
       done
     }
   }
   ```

## Convert a .NET REST API endpoint to GraphQL

We will begin by creating a new .NET project. We will use the `dotnet` command line tool to create a new project. We will also be using .NET's minimal API template to create a new project.

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


In `action/action.cs`, we will create the following models.

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

### Add .NET REST Endpoint to GraphQL schema using Hasura Actions

We can integrate this endpoint into Hasura and generate the code using [Hasura Actions](https://hasura.io/docs/latest/actions/index/). In the Actions tab on the Hasura Console, we will set up a custom login function


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

In the Hasura API explorer tab, you should now be able to test it

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

### Run async scheduled events using a Python REST API and Hasura GraphQL

With [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can get notified whenever an event happens in our database.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column `id`.

2.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

3.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We will make a class to represent the payload.

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
2. Now we will add an HTTP handler to our `Program.cs` file.

```csharp
app.MapPost("/event", (EventTriggerPayload<User> payload) =>
{
    Console.WriteLine($"New user created: {payload.Event.Data.New.Name}");
    return new { };
});
```

When you add a user in Hasura your .NET server should receive the event.


## Example: Querying GraphQL with .NET using Strawberry Shake

We can use [Strawberry Shake](https://chillicream.com/docs/strawberryshake/) to query our GraphQL server from .NET. This will generate a strongly typed client for us.

1. Create a dotnet tool-manifest

```bash
dotnet new tool-manifest
```

2. Install the Strawberry Shake Tools on your computer.

```bash
dotnet tool install StrawberryShake.Tools --local
```

3. Install the required Dependencies.

```bash
dotnet add package StrawberryShake.Transport.Http
dotnet add package StrawberryShake.CodeGeneration.CSharp.Analyzers
```

4. Add Dependency Injection and Http Extensions

```bash
dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package Microsoft.Extensions.Http
```

5. Add GraphQL client to your project using CLI tools

```bash
dotnet graphql init <Hasura URL>/v1/graphql -n HasuraClient
```

6. Let's add a GraphQL query to your project.

```graphql
query GetUsers {
  user {
    id
    name
  }
}
```

7. Compile your project

```bash
dotnet build
```

This will create a client in `Generated` folder called `HasuraClient.StrawyberryShake.cs`. This will contain a strongly typed client for your GraphQL server.

8. Now let's enable your application to use the client we just created.

```csharp
builder.Services
    .AddHasuraClient()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri("<Hasura URL>/v1/graphql"));

IServiceProvider services = builder.Services.BuildServiceProvider();

var client = services.GetRequiredService<HasuraDOTNetSample.IHasuraClient>();
```

9. Let's add a simple get end-point to your application to return data from the GraphQL server using the new client

```csharp
app.MapGet("/getTodos", async (HasuraDOTNetSample.HasuraClient hasuraClient) =>
{
    var result = await hasuraClient.GetUsers.ExecuteAsync();
    return Results.Ok(result);
});
```

## Summary

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us escape hatches for this custom logic. We've gone over a few ways you can use the power of .NET.

See the [server source code on Github](https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/backend-stack/source-code/dotnet).

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
