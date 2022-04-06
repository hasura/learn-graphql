---
title: "GraphQL 响应缓存"
metaTitle: "GraphQL 响应缓存 | Hasura GraphQL 高级教程"
metaDescription: "Hasura GraphQL 引擎 (OSS) 支持查询缓存，其中缓存完全符合条件的 GraphQL AST 的内部表示。"
---

Hasura GraphQL 引擎 (OSS) 支持查询缓存，其中缓存完全符合条件的 GraphQL AST 的内部表示。在发出 GraphQL 查询后，生成的 SQL 是预编译语句，其中包含访问数据库的正确会话变量。这些预编译语句有助于快速进行查询。详细了解[查询缓存](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/performance/)

现在，某些查询的访问频率比其他查询高。通常可能存在延迟且响应缓慢的现象，原因包括：

- 响应大小
- 服务器位置
- 并行 API 调用等的数量

Hasura Cloud 支持缓存查询响应。在配置了缓存的情况下收到查询时，Hasura Cloud 确保缓存响应数据，以加快响应时间。

**注**：已为 `Standard` 层云项目启用 GraphQL 响应缓存，缓存大小不超过 100 MB。

## 缓存的工作原理是什么？{#how-does-caching-work}

Hasura 含有与各个数据源中的数据模型有关的元数据，以及应用层授权规则。这有助于 Hasura 提供端到端的应用缓存。

只有在满足以下条件的情况下，才可以缓存 GraphQL 查询的响应：

- 此查询未使用远程模式或远程联接
- 此查询和任何相关的用户权限均未使用会话变量
- 响应 JSON 小于 100 KB

缓存的响应在 LRU（最近最少使用的）缓存中存储一段时间，然后根据使用情况按需从缓存中将其删除。

例如，Slack 模型中的 `users` 记录会受到频繁的访问 。我们可以通过以下查询缓存这一内容：

```graphql
query slackUsersCached @cached {
  users {
    id
    name
    display_name
    bio
  }
}
```

请注意，在上述查询中，我们包括了 `@cached` 指令，指明需要缓存此条查询。在 `default` 情况下，此条查询的响应缓存 `60 seconds`。

现在，让我们验证是否已成功缓存此响应。在理想情况下，HTTP 响应将包含一个 `Cache-Control` 标头，表示返回的响应存储在缓存中的最大秒数。在此时间过后，将从 LRU 中将其删除。

![缓存-控制响应标头](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cache-control.png)

你可以查看缓存-控制响应标头的值，该值表明此响应还将被缓存多少秒。

## 缓存时长 {#cache-lifetime}

可以使用 @cached 查询指令的 ttl 参数控制一个条目存储在缓存中的最大时长。该值为整数秒数：

```graphql
query usersCached @cached(ttl: 300) {
  users {
    id
    name
    display_name
    bio
  }
}
```
在上述查询中，我们为 @cached 指令包括了一个 `ttl` 参数。该参数可用于指明缓存将存储多长时间。

最长时间值为 300 秒（5 分钟），而这就是我们在上述查询中使用的值。

现在阅读 `Cache-Control` 标头，即可了解该查询将在缓存中存储多长时间。客户端通常可以使用此标头跟踪已缓存的响应。
