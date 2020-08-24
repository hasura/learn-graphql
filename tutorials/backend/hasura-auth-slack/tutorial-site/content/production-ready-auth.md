---
title: "Production Ready Auth"
metaTitle: "Production Ready Auth | Hasura Auth Slack Tutorial"
metaDescription: "This part of the tutorial will teach you how to configure Allow Lists so that you can go production ready with Hasura GraphQL"
---

The Hasura GraphQL API exposes a number of queries to both the admins and regular users of the app. The permissions are clearly defined for each role. But on top of these, you can exactly specify a list of queries that should be executed.

The Allow-list is a list of safe queries (GraphQL queries, mutations or subscriptions) that is stored by the GraphQL engine in its metadata.

You can enable Allow Lists via environment variable called `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

![Allow list env config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/enable-allowlist-env.png)

In the Slack app we have a number of queries and mutations that can be listed down and only those can be allowed to be executed by the server.

For example, some of the queries required for the slack app are 

- Fetch the list of workspaces a user is part of

```graphql
query {
  users {
    workspaces {
      id
      name
    }
  }
}
```

- Fetch the list of channels in a workspace

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp) {
  channel(where: {workspace_id: $workspaceId}) {
    id
    name
    created_by
  }
}
```

Note that this uses variables and hence the same query with different values for variables will be allowed.

- Fetch the list of messages posted in a channel

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp, $offset: Int!) {
  channel(where: {workspace_id: $workspaceId}, limit: 20, offset: $offset) {
    id
    name
    channel_threads {
      channel_thread_messages {
        id
        message
      }
    }
  }
}
```