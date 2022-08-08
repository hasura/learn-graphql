---
title: "编写自定义解析器"
metaTitle: "编写自定义解析器 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何编写自定义解析器并将其添加为 Hasura GraphQL 引擎中的远程模式。"
---

现在，我们已了解如何使用“操作”扩展 GraphQL API。 我们先前提到，自定义 API 图表的另一种方式是通过一个自定义 GraphQL 服务器来实现。

我们还是以从 Auth0 获取配置文件信息的用例为例。

Hasura 可以合并远程 GraphQL 模式并提供统一的 GraphQL API。 为了处理获取 Auth0 配置文件信息的用例，我们将在一个自定义 GraphQL 服务器中编写自定义解析器。 然后，Hasura 可以将此自定义 GraphQL 服务器与现有的自动生成的模式合并。

该自定义 GraphQL 服务器就是`Remote Schema`。

## 编写 GraphQL 自定义解析器 {#write-graphql-custom-resolver}

那么，让我们编写一个稍后可以合并到 Hasura 的 GraphQL API 中的自定义解析器。

```javascript
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const typeDefs = gql`
  type auth0_profile {
    email: String
    picture: String
  }

  type Query {
    auth0: auth0_profile
  }
`;

function getProfileInfo(user_id) {
  const headers = {
    Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
  };
  console.log(headers);

  return fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`, {
    headers,
  });
}

const resolvers = {
  Query: {
    auth0: (parent, args, context) => {
      // read the authorization header sent from the client
      const authHeaders = context.headers.authorization || '';
      const token = authHeaders.replace('Bearer ', '');

      // decode the token to find the user_id
      try {
        if (!token) {
          return 'Authorization token is missing!';
        }

        const decoded = jwt.decode(token);
        const user_id = decoded.sub;

        // make a rest api call to auth0
        return getProfileInfo(user_id)
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp);
            if (!resp) {
              return null;
            }

            return { email: resp.email, picture: resp.picture };
          });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });
schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});

```

在上述服务器中，我们分解一下正在进行的事项：

- 我们为`auth0_profile`和`Query`定义 GraphQL 类型。
- 然后，我们为“查询”类型`auth0`编写一个自定义解析器，我们从中解析`Authorization`标头，以获取令牌。
- 然后，我们使用`jsonwebtoken`库的`jwt`方法解码令牌。 这提供了获取 Auth0 配置文件信息所需的 user_id。
- 我们请求 [Auth0 的管理 API](https://auth0.com/docs/api/management/v2/create-m2m-app)，传入令牌和 user_id，以获取关于该用户的详细信息。
- 在得到响应后，我们会返回对象`{email: resp.email, picture: resp.picture}`作为响应。 此外，我们还会返回`null`。

**注**
写入的大多数代码与我们在上一部分为“操作”写入的 REST API 非常相似。 在这里，我们使用 Apollo Server 从零开始编写一个自定义 GraphQL 服务器。
如果你已在`Creating Actions`部分创建了`auth0`“操作”，那么“操作”将与 Auth0 远程模式发生冲突。 为了解决这个问题，你可以删除“操作”，以创建远程模式或重命名`auth0`和`auth0_profile`类型。

## 部署 {#deploy}

让我们将上述自定义 GraphQL 服务器部署到 Glitch。 Glitch 是创建和部署应用程序 (Node.js) 的平台，支持快速在云端测试和迭代代码。 单击下面的“部署到 Glitch”按钮，开始此操作。

[![部署到 GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~auth0-hasura-remote-schema)

### 环境变量 {#environment-variables}

在 Glitch 上重新组合你自己的项目后，请修改`.env`文件，以正确输入

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

值。

恭喜！ 你已编写并部署自己的第一个 GraphQL 自定义解析器。
