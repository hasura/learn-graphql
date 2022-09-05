---
title: "访问控制"
metaTitle: "通过 Hasura 授权 | Hasura 身份验证 Slack 教程"
metaDescription: "教程的这一部分介绍如何通过为模型定义基于角色的访问控制规则，在 Hasura GraphQL 引擎中进行授权。"
---

在本教程的这一部分，我们将为自己创建的每个模型定义基于角色的访问控制规则。访问控制规则有助于根据特定条件限制对表的查询。

访问控制规则可以应用于

- 行级
- 列级

## 行级 {#row-level}

借助行级访问控制，用户可以访问表，但不一定能访问表中的所有行。这特别有助于保护表中的个人敏感数据。这样一来，你可以允许所有用户访问表，但只能访问表中的特定行。

![行级访问控制](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/row-level-access-control.png)

## 列级 {#column-level}

列级访问控制允许你将访问限制在表中的特定列。这有助于隐藏不相关、敏感或用于内部目的的数据。数据的常见表达式如下所示：

![列级访问控制](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/column-level-access-control.png)

可以想象，将这两种规则结合起来，可以提供灵活而强大的方式，以控制对所涉及的不同利益相关者的数据访问。

## 操作类型 {#types-of-operations}

访问控制规则可以应用于所有的 CRUD 操作（创建、读取、更新和删除）。可以将某些操作完全限制为不允许用户执行。

在上一部分，我们了解到 Slack 应用程序需要一个叫作 `user` 的角色。我们将在下一部分为该角色创建权限。