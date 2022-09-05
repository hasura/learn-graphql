---
title: "身份验证"
metaTitle: "使用 Hasura 进行身份验证 | Hasura GraphQL 教程"
metaDescription: "教程的这一部分将介绍的是，如何通过与 Auth0 等身份验证提供程序集成，从而在 Hasura GraphQL 引擎中进行身份验证"
---

这一部分将讲解如何集成身份验证提供程序。

实时待办事项应用程序需要登录界面保护。 我们将使用 [Auth0](https://auth0.com) 作为此示例的身份/身份验证提供程序。

**注**： Auth0 有一个面向至多 7,000 个活跃用户的免费计划。

其基本思路是，每当用户使用 Auth0 进行身份验证时，客户端应用程序都会收到一个令牌，该令牌可在所有 GraphQL 请求的`Authorization`头中发送。 Hasura GraphQL 引擎将验证该令牌是否有效，并允许用户执行适当的查询。

让我们开始吧！
