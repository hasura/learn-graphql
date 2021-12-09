---
title: "GraphQL Introspection"
metaTitle: "GraphQL Introspection | GraphQL Tutorial"
metaDescription: "Learn about what is GraphQL Introspection and how it helps make the tooling around the community like GraphiQL."
---

A key feature of GraphQL that gives a lot of benefits over REST is Introspection. The GraphQL query language is strongly typed. This strong type system gives the ability to query and understand the underlying schema. 

The schema acts as the contract between the frontend and backend teams. But how does the frontend developer know what the backend schema looks like? How do they prevent over-fetching or under-fetching? This is possible due to Introspection queries.

## Introspection Queries {#introspection-queries}

A GraphQL server supports introspection over its schema using the same GraphQL query language.

A server exposes the following introspection queries on the `Query` operation type.

- `__schema`
- `__type`
- `__typename`

Note that introspection queries start with `__`.

## Community Tooling {#community-tooling}

The ability to introspect is what allows the community to build awesome tooling around GraphQL. There's [GraphiQL](https://github.com/graphql/graphiql) and [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) which leverages the Introspection feature to provide self-documentation to developers and try out APIs quickly.

The above tools use the `__schema` introspection query to give the documentation of the schema. You can explore more by trying out the `__schema` query to see the different selection set, fields, and directives.
