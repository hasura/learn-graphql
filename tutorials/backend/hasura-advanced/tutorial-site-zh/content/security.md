---
title: "安全性"
metaTitle: "安全性 | Hasura GraphQL 高级教程"
metaDescription: "这一部分将介绍如何优化 Hasura 从而提高安全性。在默认情况下，某些设置可能更加开放，因此需要明确的配置，以保护数据访问的安全。"
---

就服务方式而言，GraphQL 与 REST API 有着根本的不同：API 是通过单个端点提供服务的。这意味着，基于 URL 的过滤无法应用于 GraphQL API。此外，REST API 依赖于 GET、POST、PUT 和 DELETE 等请求方法，而 GraphQL 通常通过 POST（或在实时情况下通过 websocket）提供服务。如果没有身份验证保护，攻击者可以爬取 GraphQL 端点（通常在 /graphql 提供服务），并滥用接口控制台（如 GraphiQL）。

这一部分将介绍如何优化 Hasura 从而提高安全性。在默认情况下，某些设置可能更“开放”，因此需要明确的配置，以保护数据访问的安全。

我们将了解以下内容

- 服务级安全
- 身份验证和授权
- 允许列表
- 流量限速
- 响应速率限制

并针对每个用例进行优化。
