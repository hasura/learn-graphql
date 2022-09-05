---
title: "生产就绪身份验证"
metaTitle: "生产就绪身份验证 | Hasura 身份验证 Slack 教程"
metaDescription: "本教程的这一部分将介绍如何配置允许列表，以便你可以让 Hasura GraphQL 为生产做好准备"
---

Hasura GraphQL API 为应用程序管理员和常规用户公开若干查询。为每个角色明确定义了权限。但除此之外，你还可以准确指定应该执行的查询列表。

允许列表是由 GraphQL 引擎存储在其元数据中的安全查询列表（GraphQL 查询、变更或订阅）。

你可以通过名为 `HASURA_GRAPHQL_ENABLE_ALLOWLIST` 的环境变量启用允许列表。

![允许列表环境配置](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/enable-allowlist-env.png)

在 Slack 应用程序中，我们有若干可以列出的查询和变更，且只有这些查询和变更可以由服务器执行。

例如，Slack 应用程序所需的部分查询包括：

- 获取用户所在的工作空间列表

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

- 获取工作空间中的频道列表

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp) {
  channel(where: {workspace_id: $workspaceId}) {
    id
    name
    created_by
  }
}
```

请注意这里使用了变量，因此将允许具有不同变量值的相同查询。

- 获取发布在某个频道中的消息列表

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
