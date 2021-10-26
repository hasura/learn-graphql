---
title: "数据建模"
metaTitle: "使用 Hasura 创建数据模型 | Hasura GraphQL 教程"
metaDescription: "该教程介绍如何在 Postgres 中创建数据模型并使用 Hasura 控制台创建表"
---

在课程的这一部分，我们将为一个实时待办事项应用程序创建数据模型。 我们的待办事项应用程序将含有以下功能：

- 用户可以维护个人待办事项
- 用户可以查看公共待办事项
- 使用该应用程序的当前在线用户列表
- 在有用户注册时发送电子邮件

从广义上讲，这意味着我们在该应用程序中有两个主要模型： `users`和`todos`，带有各自的属性集。

我们将在后续步骤中进行详述。

最终的模型如下所示：

![模式待办事项应用程序](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

在我们使用控制台或直接在 Postgres 上创建表时，Hasura GraphQL 引擎会使用解析器自动创建 GraphQL 模式对象类型和相应的查询/变更字段。
