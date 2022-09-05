---
title: "开发模式"
metaTitle: "开发模式 | Hasura GraphQL 高级教程"
metaDescription: "在编写自定义代码的本地开发中，你可能希望查看 Hasura Actions 等自定义代码处理程序 webhook 调用的确切详情。"
---

在编写自定义代码的本地开发中，你可能希望查看 Hasura Actions 等自定义代码处理程序 webhook 调用的确切详情。

## 启用开发模式 {#enable-dev-mode}

前往 Hasura Cloud 控制面板的项目设置，然后添加新的环境变量。

新的环境变量将为布尔值为真的 `HASURA_GRAPHQL_DEV_MODE`。

![启用开发模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

启用后，这会将 `extensions` 键添加至响应的 `errors` 对象。`internal` 键包含错误信息，包括生成的 SQL 语句和来自 Postgres 的例外信息。

当然，强烈建议仅在开发/预发布环境中启用此开发模式，并且仅适用于 `admin` 角色。为了强制该扩展仅适用于管理员角色，我们可以添加一个新的环境变量，叫作 `true` 布尔值，其值为 `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS`。
