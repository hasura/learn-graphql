---
title: "Allow Lists"
metaTitle: "Allow Lists | Hasura GraphQL Advanced Tutorial"
metaDescription: "Allowlist can be configured to safely allow a limited number of GraphQL operations (queries/mutations/subscriptions) for your project."
---

[Allowlist](https://hasura.io/docs/latest/security/allow-list/) can be configured to safely allow a limited number of GraphQL operations (queries/mutations/subscriptions) for your project.

You can add operations to Allowlist as follows:
- Using Console
- Using Metadata
- Automatically through Hasura Cloud

## Allowlist through Console {#allowlist-through-console}

For example, in the slack demo, you can restrict only the `users` query to go through and deny all other queries. Do this by heading to the `Settings` tab on Console and navigating to the `Allow List` page.

![Allow Lists on Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

You can manually add an operation by specifying an operation name and definition. Consider the operation name is `users`, whereas the definition is the following:

```graphql
query {
  users {
    id
    name
  }
}
```

![Allow List operation](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

Similarly, you can manually upload a GraphQL file with the list of all operations to achieve the same result.

## Allowlist through Metadata {#allowlist-through-metadata}

An "allow list" can have multiple collections, with each collection containing different queries. You can add a collection with the help of the following [APIs](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections/#api-query-collections).

## Allowlist through Hasura Cloud {#allowlist-through-hasura-cloud}

Hasura Cloud provides an efficient way to add operations to the Allowlist from a list of previously executed operations.

Head to the `Allow List` tab inside the `MONITORING` tab of the Hasura Cloud project. Then navigate to `NEW OPERATIONS` to see the list of operations that are not in the allow list yet.

![Hasura Cloud Allowlist](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

In this example, select the user and introspection queries. You can choose them from the list of operations instead of manually entering them one by one.

Note that even Introspection queries need to be added explicitly to allow the GraphiQL interface to work. One other tip that would be useful is to ensure that the client uses named queries, so it's easier to add them to the allowlist. It's also easier to inspect and debug.

## Enabling Allowlist {#enabling-allowlist}

The Allowlist feature needs to be enabled because it comes disabled by default.

Set the `HASURA_GRAPHQL_ENABLE_ALLOWLIST` env variable to `true` to start using the Allowlist.

Head to the `Env vars` tab on the project settings page on Hasura Cloud to enable this env.
