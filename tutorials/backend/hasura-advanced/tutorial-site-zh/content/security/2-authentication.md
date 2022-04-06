---
title: "身份验证和授权"
metaTitle: "身份验证和授权 | Hasura GraphQL 高级教程"
metaDescription: "Hasura 身份验证可以使用 JWT、webhook 和未经身份验证的公共访问来实现。Hasura 的授权可使用基于角色的权限来实现。"
---

Hasura 身份验证可以通过以下方式实现：

- [JWT](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/)
- [Webhook](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook/)
- [未经身份验证的公共访问](https://hasura.io/docs/latest/graphql/core/auth/authentication/unauthenticated-access/)

在所有这些情况下，必须先配置一个 `admin secret`。

Hasura 的授权可以通过以下方式实现：

- 基于角色的权限：按角色、按模式、按表、按操作类型
- 为插入、选择、更新和删除设置角色访问规则（记录和字段）

[身份验证](https://hasura.io/learn/graphql/hasura/authentication/)和[授权](https://hasura.io/learn/graphql/hasura/authorization/)均已在我们的 Hasura 基本功能教程中介绍。请回顾一下。

同样地，对于本教程中使用的 Slack 模型，我们的 [Slack 授权教程](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/)讲述了如何从零开始设置基于角色的权限。
