---
title: "通过 Auth0 连接 Hasura"
metaTitle: "通过 Auth0 连接 Hasura | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何通过该 Auth0 应用程序连接 Hasura，并使用 HASURA_GRAPHQL_JWT_SECRET 保护你的应用程序"
---

这一部分将介绍如何通过你刚刚在上一步中创建的 Auth0 应用程序连接 Hasura。

在此之前，我们需要通过管理员密码保护我们的端点。 目前为止，GraphQL 端点还未加密，任何人都可以查询和管理数据。 [阅读文档](https://hasura.io/docs/latest/graphql/cloud/projects/secure/#adding-an-admin-secret))，了解如何将管理员密码添加到 Hasura Cloud 项目中。

在添加管理员密码后，我们需要配置 Hasura，以使用 Auth0 公钥。 使用以下链接生成 JWT 配置更简单 - [https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)

![jwt-config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/generate-jwt-config.png)

生成的配置可用作环境变量`HASURA_GRAPHQL_JWT_SECRET`的值。

打开 Hasura Cloud 控制面板，然后来到你的 Hasura Cloud 项目的 "Env vars" 页面：

![Hasura ENV 配置](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

单击`+ New Env Var`，添加新的环境变量。

添加一个名为`HASURA_GRAPHQL_JWT_SECRET`的新配置变量，然后将生成的 JWT 配置复制并粘贴到值的输入框中。

最后应该会得到如下结果：

![添加新的环境云](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-env-cloud.png)

单击`Add`，你的环境变量就会应用于该项目。

太好了！ 现在，你的 Hasura 实例已使用 Auth0 进行保护。
