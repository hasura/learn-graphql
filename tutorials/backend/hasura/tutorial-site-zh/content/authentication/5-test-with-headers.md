---
title: "Auth0 令牌测试"
metaTitle: "测试 Auth0 JWT 令牌 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何通过获得 Auth0 令牌并使用授权标头发出 GraphQL 查询，从而借助 Hasura 测试 Auth0 设置"
---

Hasura 已配置为与 Auth0 一起使用。 现在，通过获得 Auth0 的访问令牌并使用授权标头进行 GraphQL 查询，以查看是否已应用权限，进而测试该设置。

若要获得测试用的 JWT 令牌，我们要在 Auth0 上设置一个扩展程序。

1. 安装[身份验证 API 调试器扩展程序](https://auth0.com/docs/extensions/authentication-api-debugger-extension)。 这可以支持我们配置和生成访问令牌。

若要安装该扩展程序：

请导航至 [Auth0 控制面板](https://manage.auth0.com/#)的[扩展](https://manage.auth0.com/#/extensions)页面，

![Ahth0 扩展调试器](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-extensions-debugger.png)

单击 Auth0 身份验证 API 调试器框。 会出现“安装扩展”窗口。 单击“安装”。

2. 授权该扩展

安装该扩展后，即可在`Installed Extensions`选项卡下单击它。 URL 将类似于`https://<auth0-domain>.<region>.webtask.run/auth0-authentication-api-debugger`

它会提示你使用“Auth0 UI 登录”方式进行登录。 请务必使用最初用来创建 Auth0 帐户的凭据登录。 这一步是为了基本授权扩展程序的使用，并允许它访问读取该应用程序的客户端详细信息。

![授权 Auth0 应用程序](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authorize-auth0-app.png)

在授权该应用程序后，应该就会看到“调试器”页面。

3. 配置 Auth0 应用程序

在 API 调试器页面，选择你在本教程前几步中创建的应用程序的名称。

![Auth0 API 调试器](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-api-debugger.png)

现在，复制那里提及的回调 URL。 转到“Auth0 应用程序”页面，进入你的应用程序的设置，然后将该 URL 添加至“允许的回调 URL”。

4. 设置受众

切换至“配置”旁的“OAuth2 / OIDC”选项卡，然后向下滚动，配置该“受众”值。

![Auth0 受众](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/configure-audience.png)

输入`https://hasura.io/learn`作为“受众”值，并切换旁边的`Use Audience`选项。
请回顾一下，我们在前面一步中创建了具有上述受众值的 API。

5. 回到 Auth0 身份验证 API 调试器的扩展设置。 单击“用户流”中的“OAuth2 / OIDC 登录”按钮。 它将提示你以用户身份登录。 使用任意帐户在该 UI 上注册，登录成功后，你将回到身份验证调试器页面，且已打印 JSON 响应。

![身份验证调试器访问令牌](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-debugger-access-token.png)

在“哈希片段”部分，你将能够看到对象中的`access_token`密钥。

5. 测试 JWT

调试器应向你提供含有 JWT 声明的已解码有效负载，该声明已在密钥`https://hasura.io/jwt/claims`下为 Hasura 配置。现在在该对象内，角色信息将在`x-hasura-role`密钥下可用，且用户 id 信息将在`x-hasura-user-id`密钥下可用。

从现在起，你将能够使用该 access_token 发出经过身份验证的请求。 你可以在“Hasura Console GraphiQL”选项卡中添加`Authorization: Bearer <access_token>`标头，以发出此类请求。
