---
title: "创建 Auth0 应用程序"
metaTitle: "创建 Auth0 应用程序 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何使用单页 Web 应用控制面板创建一款 Auth0 应用程序。"
---

1. 导航至 [Auth0 控制面板](https://manage.auth0.com/)
2. 注册/登录帐户
3. 创建新用户。
4. 单击左侧的`Applications`菜单选项，然后单击`+ Create Application`按钮。
5. 在“创建应用程序”窗口中，为你的应用程序设置名称并选择`Single Page Web Applications`。（假设前端应用程序将是基于 react/vue 等框架构建的单页应用）

![创建 Auth0 应用程序](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

## 创建 Auth0 API {#create-auth0-api}

我们需要在 Auth0 上创建 API，以确保`accessToken`成为有效的 JWT。 单击左侧边栏上的`APIs`部分，然后单击`+ Create API`按钮。

![创建 Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

现在在出现的弹出窗口中，赋予 API 名称和标识符。 我们可以从技术层面赋予任何值。

比如名称为`hasura`，标识符为`https://hasura.io/learn`。

![Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

我们可以不改变签名算法。 (RS256)

完成后，请单击“创建”。
