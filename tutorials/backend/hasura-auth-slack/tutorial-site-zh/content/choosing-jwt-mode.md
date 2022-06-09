---
title: "身份验证模式"
metaTitle: "身份验证模式 | Hasura 身份验证 Slack 教程"
metaDescription: "教程的这一部分介绍如何选择正确的身份验证模式"
---

这一部分将介绍不同的身份验证模式。身份验证在 Hasura 之外处理。你可以引入自己的身份验证服务器，并将其与 Hasura 集成。大致有两个方案。

- JWT 模式
- Webhook 模式

## JWT 模式 {#jwt-mode}

你可以配置 GraphQL 引擎，以使用 JWT 授权模式，从而授权所有传入的请求。身份验证服务器将会返回一个有效的 JWT 令牌，该令牌由 GraphQL 引擎解码和验证，从而授权并获取关于请求的元数据。

由身份验证服务器发出 JWT 令牌的常见架构如下所示：

![JWT 模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/jwt-mode.png)

身份验证服务器向该应用程序发出含有相关 `x-hasura-*` 声明的 JWT 令牌，然后由应用程序将令牌发送至 Hasura GraphQL 引擎。Hasura 然后验证该声明，以允许请求通过。

## Webhook 模式 {#webhook-mode}

你还可以配置 GraphQL 引擎，以使用 webhook 模式。你的身份验证服务器公开一个 webhook，用于对所有传入 Hasura GraphQL 引擎服务器的请求进行验证，并获取关于该请求的元数据，从而评估访问控制规则。

使用 webhook 的架构如下所示：

![Webhook 模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/webhook-mode.png)

### 未经身份验证的模式 {#unauthenticated-mode}

有时候，你希望允许用户无需登录即可访问数据。这对于面向所有用户开放的公共提要非常有用。尽管我们的 Slack 应用程序没有将此作为用例，但还是应该知道何时可以使用这一模式。
