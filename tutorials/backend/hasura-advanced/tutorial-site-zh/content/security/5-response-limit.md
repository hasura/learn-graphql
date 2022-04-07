---
title: "响应速率限制"
metaTitle: "响应速率限制 | Hasura GraphQL 高级教程"
metaDescription: "我们可以通过响应速率限制，限制单个请求中可以访问的数据量。除了流量限速，响应速率限制对于避免造成数据库瓶颈非常重要"
---

在配置好 API 限制后，你还可以限制返回的行数，并在此基础上限制访问聚合查询。

假设你的流量限速为每分钟 100 条查询。但是假如每条请求都会从数据库中提取数千行的数据呢？这会构成数据库的瓶颈。

我们可以通过响应速率限制，限制单个请求中可以访问的数据量。这可以在基于角色的权限层中配置。

在我们的 Slack 模型示例中，如果我们希望将 `channel_thread` 限制为在任何时间点返回的最大行数为 100 行，那么我们可以在权限中配置这一限制，如下所示：

前往 `channel_thread` 表，并转到 Hasura 控制台上的 `Permissions` 选项卡。

![通道线程响应速率限制](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

在 `Row Select Permissions` 下将 `Limit` 配置为 100 或任何希望的值。

在默认情况下，不允许进行聚合查询。需要在角色权限下明确启用这一功能。这是为了确保类似 `count` 的数据不会轻易提供给提出请求的用户。
