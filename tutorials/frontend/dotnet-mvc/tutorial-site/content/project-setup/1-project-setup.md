---
title: "ASP.NET Project Setup"
metaTitle: "ASP.NET Project Setup | ASP.NET MVC GraphQL Tutorial"
metaDescription: "In this step we will configure a new ASP.NET MVC project to use Hasura GraphQL Engine as the backend."
---

## ASP.NET Project Setup
To get started with ASP.NET MVC, we will create a new ASP.NET MVC project.

### Create a new ASP.NET MVC project with CLI
To create a new ASP.NET MVC project, we will use the `dotnet` CLI. If you don't have the CLI installed, you can follow the instructions [here](https://docs.microsoft.com/en-us/dotnet/core/tools/).

```bash
dotnet new mvc --name TodoApp --auth Individual
```

This will create a new ASP.NET MVC project with the name `TodoApp` and will also configure the project to use individual user accounts.

### Create a new ASP.NET MVC project with Visual Studio
If you are using Visual Studio, you can create a new ASP.NET MVC project by following these steps:

- Open Visual Studio
- Click on `Create a new project`
- Search for `ASP.NET Web Application`
- Select `ASP.NET Web Application (.NET Framework)`
- Click on `Next`
- Select `MVC` as the template
- Click on `Create`

