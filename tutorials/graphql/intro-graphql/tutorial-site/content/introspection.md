---
title: "GraphQL Introspection"
metaTitle: "GraphQL Introspection | GraphQL Tutorial"
metaDescription: "Learn about what is GraphQL Introspection and how it helps make the tooling around the community like GraphiQL."
---

A key feature and superpower of GraphQL is the Schema Introspection.

## What is GraphQL Introspection? {#graphql-introspection}

The GraphQL query language is strongly typed. Due to its strong type system, GraphQL gives you the ability to query and understand the underlying schema. 

Thus, the Introspection feature allows you to query the schema and discover the available queries, mutations, subscriptions, types and fields in a specific GraphQL API.

The schema acts as a contract between the frontend and backend, improving the communication between them. But how does the frontend client know what the schema looks like? How do they prevent over-fetching or under-fetching? How do they know what operations are available? That's where the Introspection query helps.

## GraphQL Introspection Query {#graphql-introspection-query}

A server exposes the following introspection queries on the `Query` operation type.

- `__schema`
- `__type`
- `__typename`

Note that introspection queries start with `__`.

## Schema Introspection {#schema-introspection}

Let's see some examples of introspective queries. We will query the field `__schema` field to find out the available queries, mutations and types.

### Fetch Available Queries {#fetch-available-queries}

There are scenarios where you might want to see all the available queries in a GraphQL API. You can query the schema as follows:

```graphql
{
  __schema {
    queryType {
      fields {
        name
        description
      }
    }
  }
}
```

The above query returns the name and description of all the available queries.

### Fetch Available Mutations {#fetch-available-mutations}

You can also fetch all the available mutations with the following query:

```graphql
{
  __schema {
    mutationType {
      fields {
        name
        description
      }
    }
  }
}
```

Similar to the first query, it returns the name and description of all available mutations.

### Fetch Existing Types {#fetch-existing-types}

Lastly, you can fetch all the types as follows:

```graphql
{
  __schema {
    types {
      name
      description
    }
  }
}
```

This way, you can see all the types available in the GraphQL API. Similarly, you can retrieve all the available directives and subscriptions.

## GraphQL Introspection Security & Exploits {#graphql-introspection-security-and-exploits}

The Schema Introspection is a great feature and it can be really helpful, but it can cause problems too.

As you might remember, the Schema Introspection allows developers to query the API schema and see all the available resources. That means potential attackers can get a good understanding of your API and they can even get access to resources that are not meant to be publicly available. All this information available to potential attackers makes it easier to exploit your GraphQL API.

Should you disable the introspection query? Although it can be helpful, especially in the dev environment, turning off the introspection in production is recommended.

## Community Tooling {#community-tooling}

The ability to introspect is what allows the community to build great tooling around GraphQL. There's [GraphiQL](https://github.com/graphql/graphiql) and [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) which leverages the Introspection feature to provide self-documentation to developers and try out APIs quickly.

The above tools use the `__schema` introspection query to give the schema documentation. You can explore more by trying out the `__schema` query to see the different selection sets, fields, and directives.