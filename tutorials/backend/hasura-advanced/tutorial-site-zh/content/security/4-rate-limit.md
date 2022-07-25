---
title: "流量限速"
metaTitle: "流量限速 | Hasura GraphQL 高级教程"
metaDescription: "流量限速确保可以限制由恶意或实现不佳的查询引起的 API 性能问题。"
---

API 性能问题通常是由恶意或实现不佳的查询引起的。如果是恶意查询，我们可以通过配置允许列表，以某种方式进行限制，正如我们在上一步中的操作。但有时，你或许希望配置 API 访问的限制条件。

此操作的实现方式如下：

- API 请求的速率 - 流量限速
- 限制请求的深度 - 查询深度限制

## 配置 API 限制 {#configuring-api-limit}

Hasura Cloud 支持你在 Pro/监测选项卡中配置 API 限制。请转到控制台 `Pro` 选项卡的 `API Limits` 页面。单击 `Configure`，开始指定规则。

### 流量限速 {#configuring-rate-limits}

限制每分钟 GraphQL 操作的数量。它采用了滑动窗口法。这意味着，无论 Hasura 何时收到一项请求，它都会计算该客户端从当前时间开始到此前一分钟的速率。

你可以配置操作的数量，比如 100 个。接下来是根据某些独特的参数配置它。这可以基于 IP 地址或会话变量，如 `x-hasura-*`。

当 API 面向更广泛的公共受众以及存在未经身份验证的公共访问查询时，流量限速的 `IP address` 方式就非常有用。

当你应用程序的用户在你的 API 和数据库上具有相同的负载时，流量限速的会话变量方式就非常有用。

![基于角色的 API 限制](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/role-based-api-limit.png)

API 限制可以根据每个角色配置，也可以为所有角色进行全局配置。

### 查询深度限制 {#query-depth-limits}

根据深度来限制 GraphQL 操作，防止深度嵌套查询。API 限制由角色（匿名、用户）定义，且可以限制查询速率、深度，或两者兼有。独特的请求参数可以包括 IP 地址或会话变量（x-hasura-user-id、x-hasura-org-id 等）

在我们的 Slack 模式下，假设某个用户进行以下查询：

```graphql
query userDetails {
  users {
    id
    name
    display_name
    bio
    channel_members {
      id
      user {
        id
        name
      }
      channel {
        id
        name
        channel_members {
          id
          user {
            id
          }
        }
      }
    }
  }
}
```

该条查询通过关系具有多个深度。有时，由于关系的性质，你可能会在查询中多次循环遍历它们。例如，这里 `channel_members` 与其中的 `user` 关系被查询了两次。这可能会多次继续，导致生成非常长的 SQL 查询。此类查询会影响数据库的性能，而且由于这些查询没有添加任何值，因此我们应该能够将查询的深度限制为某个合理的数量。

如何确定查询的正确深度？在“允许列表”选项卡中，你有一个 `New Operations` 列表，供你清晰地了解目前有多少条该深度的查询。

假设在这种情况下，我们可以允许一条深度为 5 的查询，而不会影响其他真实查询的性能。我们可以通过 API 限制进行相同的配置。

![API 限制](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/api-limits.png)
