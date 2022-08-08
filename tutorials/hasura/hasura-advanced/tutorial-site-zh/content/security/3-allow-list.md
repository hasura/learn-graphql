---
title: "允许列表"
metaTitle: "允许列表 | Hasura GraphQL 高级教程"
metaDescription: "你可以配置允许列表，安全地为你的项目允许有限数量的 GraphQL 操作（查询/变更/订阅）。"
---

你可以配置允许列表，安全地为你的项目允许有限数量的 GraphQL 操作（查询/变更/订阅）。

可通过以下方式进行允许列表操作：

- 使用控制台
- 使用元数据
- 通过 Hasura Cloud 自动添加

## 通过控制台添加允许列表{#allowlist-through-console}

例如，在我们的 Slack 演示中，我们可以仅限 `users` 查询通过，并拒绝所有其他查询。请前往控制台上的 `Settings` 选项卡，然后导航至 `Allow List` 页面，即可完成此操作。

![控制台上的允许列表](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

我们可以通过指定操作名称和操作定义，来手动添加操作。

假设该操作名称为 `users`，其定义为

```graphql
query {
  users {
    id
    name
  }
}
```

![允许列表操作](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

同样地，可以手动上传含有所有操作列表的 GraphQL 文件完成此操作。

## 通过元数据添加允许列表 {#allowlist-through-metadata}

查询可以存储在收藏中，而且可以将收藏添加至允许列表或从中删除。可以通过以下 [API](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections/#api-query-collections) 添加收藏

## 通过 Hasura Cloud 添加允许列表 {#allowlist-through-hasura-cloud}

尽管上述操作是通过手动输入所有操作完成的，但 Hasura Cloud 提供了一种快速方法，根据执行过的操作列表来启用允许列表。

前往 Hasura Cloud 项目 `Pro` 选项卡内的 `Allow List` 选项卡。然后导航至 `New Operations`，查看尚未出现在允许列表中的操作列表。

![Hasura Cloud 允许列表](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

在我们的例子中，我们希望仅选择用户查询，因此我们可以从操作列表中明确选择，而不用手动逐个输入。

请务必注意，内省查询也需要明确添加，才能启用 GraphiQL 界面，而该选项卡支持你快速完成此操作。另外一个有用的提示是，请始终确保从客户端进行命名的查询，这样可以更轻松地将它们添加至允许列表、进行检查和调试。

## 启用允许列表 {#enabling-allowlist}

需要通过环境 `HASURA_GRAPHQL_ENABLE_ALLOWLIST` 明确启用允许列表。

前往 Hasura Cloud 项目设置页面中的 `Env vars` 选项卡，以启用该环境。
