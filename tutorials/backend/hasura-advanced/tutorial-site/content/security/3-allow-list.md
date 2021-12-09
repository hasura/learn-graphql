---
title: "Allow Lists"
metaTitle: "Allow Lists | Hasura GraphQL Advanced Tutorial"
metaDescription: "Allowlist can be configured to safely allow a limited number of GraphQL operations (queries/mutations/subscriptions) for your project."
---

Allowlist can be configured to safely allow a limited number of GraphQL operations (queries/mutations/subscriptions) for your project.

Operations to Allowlist can be added

- Using Console
- Using Metadata
- Automatically through Hasura Cloud

## Allowlist through Console {#allowlist-through-console}

For example, in our slack demo, we can restrict only the `users` query to go through and deny all other queries. This can be done by heading to the `Settings` tab on Console and navigating to the `Allow List` page.

![Allow Lists on Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

We can add an operation manually by specifying an operation name and the operation definition.

Let's say the operation name is `users` and the definition is

```graphql
query {
  users {
    id
    name
  }
}
```

![Allow List operation](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

Similarly this can be added via a file upload by manually uploading a graphql file with the list of all operations.

## Allowlist through Metadata {#allowlist-through-metadata}

Queries can be stored in collections and a collection can be added to or removed from the allow-list. A collection can be added through the following [APIs](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections.html#api-query-collections)

## Allowlist through Hasura Cloud {#allowlist-through-hasura-cloud}

While the above is done manually by entering in all the operations, Hasura Cloud gives a quick way to enable Allowlist from the list of operations that were already executed in the past.

Head to the `Allow List` tab inside the `Pro` tab of Hasura Cloud project. Then navigate to `New Operations` to see the list of operations that are not in the allow list yet.

![Hasura Cloud Allowlist](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

In our example, we would like to select only the user query and hence we can explictly select that from the list of operations instead of manually entering them one by one.

Do note that even Introspection queries need to be added explictly to allow the GraphiQL interface to work and this tab let's you do that quickly. One other tip that would be useful is that, always ensure named queries are made from the client so that it's easier to add them to allowlist and also easier to inspect and debug.

## Enabling Allowlist {#enabling-allowlist}

Allowlist need to be explictly enabled through the env `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

Head to the `Env vars` tab on the project settings page on Hasura Cloud to enable this env.
