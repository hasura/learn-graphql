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