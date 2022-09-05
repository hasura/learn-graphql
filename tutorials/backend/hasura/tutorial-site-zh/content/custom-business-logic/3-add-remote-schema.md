---
title: "添加远程模式"
metaTitle: "添加远程模式 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何使用 Hasura 控制台在 Hasura GraphQL 引擎中添加远程模式"
---

我们已编写自定义解析器并将其部署到 Glitch。 我们已准备好 GraphQL 端点。 让我们将其添加到 Hasura，作为一个远程模式。

## 添加 {#add}

转到控制台的`Remote Schemas`选项卡，然后单击`Add`按钮。

![添加远程模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-remote-schema.png)

为该远程模式命名（比如 Auth0）。
在 GraphQL 服务器 URL 中，输入你刚刚在上一步部署的 Glitch 应用程序 url。

选择`Add Remote Schema`，然后单击`Forward all headers from the client`。

## 试一下 {#try-it-out}

转到“控制台 GraphiQL”选项卡，然后了解以下 GraphQL 查询。

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

还记得我们在配置 Auth0 并将其测试后得到的 JWT 令牌吗？ 在这里，你还需要使用相同的 JWT 令牌传入`Authorization`标头，以获取正确的数据。

![远程模式查询](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/query-remote-schema.png)

如你所见，Hasura 已通过 Postgres 将自定义 GraphQL 模式与现有的自动生成的 API 合并。
