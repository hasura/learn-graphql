---
title: "Install Strawberry Shake"
metaTitle: "Strawberry Shake | ASP.NET MVC GraphQL Tutorial"
metaDescription: "In this step we will install Strawberry Shake, a GraphQL client for .NET."
---

## Strawberry Shake
[Stawberry Shake](https://chillicream.com/docs/strawberryshake) is a GraphQL client for .NET. It is a GraphQL client that is generated from a GraphQL schema. It is a strongly typed client that is easy to use and integrates well with ASP.NET Core.

### Install Strawberry Shake
To install Strawberry Shake, we will use the `dotnet` CLI.

1. Create tool manifest file:
```bash
dotnet new tool-manifest
```

2. Install Strawberry Shake:

```bash
dotnet tool install StrawberryShake.Tools --local
```

This will install Strawberry Shake as a global tool. You can verify the installation by running the following command:

```bash
dotnet tool list -g
```

3. Add Strawberry Shake to the project:

```bash
dotnet add package StrawberryShake.Transport.Http
```

4. Add the Strawberry Shake CSharp Analyzer:

```bash
dotnet add package StrawberryShake.CodeGeneration.CSharp.Analyzers
```

This should show Strawberry Shake in the list of installed tools.

### Generate Strawberry Shake client

1. To add the client to access the GraphQL API, we will run the following command:

```bash
 dotnet graphql init http://localhost:8080/v1/graphql/ -n TodoClient -p ./TodoClient --headers x-hasura-admin-secret=123456
```

2. We will need to customize the `.graphqlrc.json` file to add the `x-hasura-admin-secret` header. Add the following to the `headers` section:

```json
{
  "schema": "schema.graphql",
  "documents": "**/*.graphql",
  "extensions": {
    "strawberryShake": {
      "name": "TodoClient",
      "namespace": "TodoApp.GraphQL",
      "url": "http://localhost:8080/v1/graphql/",
      "dependencyInjection": true,
      "headers": {
          "x-hasura-admin-secret": "123456"
      },
    }
  }
}
```

This will create a new class called `TodoClient` in the `TodoClient` folder. This class will be used to access the GraphQL API. We will begin to use this class in the next step.