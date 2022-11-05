---
title: "useQuery hook"
metaTitle: "Strawberry Shake Query | ASP.NET MVC GraphQL Tutorial"
metaDescription: "We will use the Apollo Client useQuery React hook from @apollo/client to make GraphQL queries"
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the ASP.net MVC application.

## Create a GraphQL Query
We will now take our GraphQL query and create `GetTodos.graphql` in our application. We will use the Strawberry Shake GraphQL client to create the query class.

1. Create a new File `GetTodos.graphql` in the application. Add the following to the file:

```graphql
query getMyTodos {
  todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
    id
    title
    created_at
    is_completed
  }
}
```

2. Compile your project
  
```bash
dotnet build
```

This will generate a folder `TodoClient/Generated` with the client code.

3. Now we will use dependency injection to inject the client into our controller. Add the following to the `Program.cs` file:

```csharp
builder.Services
    .AddTodoClient()
    .ConfigureHttpClient(client => client.BaseAddress = new Uri("http://localhost:8080/v1/graphql"));
```

## Create Todos Controller & Views
We will now create a new controller `TodosController` to handle the GraphQL queries. 

1. Create a new file `TodosController.cs` in the `Controllers` folder. Add the following to the file:

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Services;

namespace TodoApp.Controllers;

[Authorize]
public class TodosController : Controller
{
    private readonly ITodoClient _todoClient;
    private readonly JwtTokenService _tokenService;

    public TodosController(ITodoClient todoClient, JwtTokenService tokenService)
    {
        _todoClient = todoClient;
        _tokenService = tokenService;
    }
    
    // GET
    public IActionResult Index()
    {
        return View();
    }
}
```

2. In our controller we will add a method to make it easier to get the User ID from the built in authetnication: 
  
```csharp
private string UserId() => HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
```

As you can see we are injecting the `ITodoClient` into the controller. This is the Strawberry Shake client that we generated in the previous step. We are also making this the route authenticated to protect the data.


2. Let's add navigation to the main menu in the `Views/Shared/_Layout.cshtml` file:

```html
<li class="nav-item">
  <a class="nav-link text-dark" asp-area="" asp-controller="Todos" asp-action="Index">Todos</a>
</li>
```

3. Add a new view `Index.cshtml` in the `Views/Todos` folder. Add the following to the file:

```html
@model TodoApp.Models.TodoViewModel

@{
    ViewData["Title"] = "Todos";
}

<h1 class="display-4">Todos</h1>
