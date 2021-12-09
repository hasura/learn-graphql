---
title: "创建操作"
metaTitle: "通过操作扩展 Hasura Graph | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何写入操作，以扩展 Graph 并自定义业务逻辑"
---

我们以从 Auth0 获取配置文件信息的第一个用例为例。

理想情况下，你希望为所有数据需求维护一个单一 GraphQL 端点。

为了操作获取 Auth0 配置文件信息的用例，我们将在自定义 Node.js 服务器中编写一个 REST API。 REST API 可以以任何语言/框架编写，但对于此示例，我们使用 Node.js。

然后，Hasura 可以将此 REST API 与现有的自动生成的 GraphQL 模式合并，客户端即可使用该单一 GraphQL 端点查询所有内容。

## 创建操作 {#creating-an-action}

在 Hasura 控制台上，转到`Actions`选项卡，然后单击`Create`，以创建新操作。

![操作定义](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-definition.png)

### 操作定义 {#action-definition}

我们需要定义我们的操作及操作类型。 由于我们仅读取 API 中的数据，因此我们将“查询”类型用于此操作。 该定义将包含该操作的名称（此例中为 auth0）、输入参数（此例中无）和操作的响应类型（此例中为`auth0_profile`）。

```graphql
type Query {
  auth0 : auth0_profile
}
```

### 类型定义 {#types-definition}

我们将该操作的响应类型定义为`auth0_profile`。那么，我们希望从该 Auth0 API 中返回什么？ 我们需要尚未存储在我们的数据库中的`id`、`email`和`picture`字段。

```graphql
type auth0_profile {
  id : String
  email : String
  picture : String
}
```

这三个字段都是字符串类型。 请注意，`auth0_profile`是一个含有 3 个关键字（id、电子邮件和照片）的对象类型，而且我们正在响应中返回该对象。

在编写 REST API 并将其部署到公共端点上后，我们将稍后更改处理程序 URL。

![创建操作](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-action.png)

在完成上述字段的配置后，请单击`Create`。

## 编写 REST API {#write-rest-api}

现在操作已创建，我们在 Node.js Express 应用程序中写入一个 REST API，稍后可以为该操作配置该应用程序。

转到`Codegen`选项卡，以快速开始使用样板代码 :)

单击`Try on Glitch`，以部署服务器。 Glitch 是创建和部署应用程序 (Node.js) 的平台，支持快速在云端测试和迭代代码。

![操作代码生成器](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-codegen-tab.png)

现在用以下内容替代`src/server.js`的内容：

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const getProfileInfo = (user_id) => {
    const headers = {'Authorization': 'Bearer '+process.env.AUTH0_MANAGEMENT_API_TOKEN};
    console.log(headers);
    return fetch('https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/'+user_id,{ headers: headers})
        .then(response => response.json())
}

app.post('/auth0', async (req, res) => {

  // get request input
  const { session_variables } = req.body;

  const user_id = session_variables['x-hasura-user-id'];
  // make a rest api call to auth0
  return getProfileInfo(user_id).then( function(resp) {
    console.log(resp);
    if (!resp) {
      return res.status(400).json({
        message: "error happened"
      })
    }
    return res.json({
      email: resp.email,
      picture: resp.picture
    })
  });

});

app.listen(PORT);
```

在上述服务器中，我们分解一下正在进行的事项：

- 我们接收到来自操作的有效负载`session_variables`，作为请求正文。
- 我们向 [Auth0 的管理 API](https://auth0.com/docs/api/management/v2/create-m2m-app) 发出请求，传入`user_id`，以获得关于该用户的详细信息。
- 在获得服务器中的 Auth0 API 的响应后，我们就会生成以下对象`{email: resp.email, picture: resp.picture}`，并将其发送回客户端。 此外，我们还会返回错误用例。

如果你在上述代码处遇到困难，请使用以下 Glitch 上的[现成服务器](https://glitch.com/~auth0-hasura-action)克隆它。
你也需要重新组合 Glitch 项目，以开始修改任意代码。

### 环境变量 {#environment-variables}

在你的 Glitch 应用程序源代码中，请修改`.env`文件，以正确输入

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

值。 可通过该 Auth0 项目获取 AUTH0_MANAGEMENT_API_TOKEN。

![Auth0 管理 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-management-api.png)

恭喜！ 你已写入并部署第一个 Hasura 操作来扩展 Graph。

## 权限 {#permission}

现在，若要查询新添加的类型，我们需要赋予`user`角色执行这一查询类型的权限。 转到新创建操作的`Permissions`选项卡，然后为用户角色配置访问权限。

![操作权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-permission.png)

好了，现在如何查询这一新添加的 API 呢？

首先，我们需要更新该操作的 webhook url。 从 Glitch 中复制已部署的应用程序 URL，然后将其添加为 webhook 处理程序。 不要忘记添加路由`/auth0`和 Glitch 应用程序 URL。

![操作处理程序](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-handler-update.png)

现在转到 GraphiQL，然后尝试以下查询：

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

还记得我们在[配置 Auth0 并对其测试](https://hasura.io/learn/graphql/hasura/authentication/5-test-with-headers/)后得到的 JWT 令牌吗？ 在这里，你还需要使用相同的 JWT 令牌传入`Authorization`标头，以获取正确的数据。

在 GraphiQL 中，取消选中`x-hasura-admin-secret`标头，创建一个名为`Authorization`的新标头，然后将其粘贴在值`Bearer eyJhb.....`中。

**注**： 你需要输入正确的标头值。 你可以用正确的令牌传入授权标头，然后你的 Node.js 服务器就会收到来自会话变量的正确`x-hasura-user-id`值，以便 API 发挥预期的作用。

就是这样！ 现在，你已使用自定义代码扩展了内置 GraphQL API。
