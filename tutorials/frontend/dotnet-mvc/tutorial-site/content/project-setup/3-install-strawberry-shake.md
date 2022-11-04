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
dotnet tool install --global StrawberryShake.Tool
```

This will install Strawberry Shake as a global tool. You can verify the installation by running the following command:

```bash
dotnet tool list -g
```

This should show Strawberry Shake in the list of installed tools.

We will generate the client and queries in a future step.