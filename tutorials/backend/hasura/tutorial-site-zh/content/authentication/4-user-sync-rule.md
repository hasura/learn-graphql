---
title: "运用规则同步用户"
metaTitle: "运用规则同步 Auth0 用户 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何在 Auth0 中设置规则，使 Auth0 用户与我们数据库中的用户同步"
---

Auth0 的规则可以设置为在每次发出登录请求时被调用。 请回顾一下 Auth0 配置的第二步，我们之前已创建一条应用自定义 JWT 声明的规则。 现在，我们需要在 Auth0 中设置一条规则，使 Auth0 用户与我们数据库中的用户同步。 以下代码片段可以帮助我们实现同样的目的。 再次使用“规则”功能，创建一条新的空规则并粘贴以下代码片段：

```javascript
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;

  const admin_secret = "xxxx";
  const url = "https://ready-panda-91.hasura.app/v1/graphql";
  const query = `mutation($userId: String!, $nickname: String) {
    insert_users(objects: [{
      id: $userId, name: $nickname, last_seen: "now()"
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`;

  const variables = { "userId": userId, "nickname": nickname };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

![Auth0 插入规则](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-sync-rule.png)

**注**： 根据你的应用程序适当修改`x-hasura-admin-secret`和`url`参数。
在此，我们发出对`users`表进行变更的请求。

就是这样！ 现在，每次成功注册或登录都会触发该规则，而且我们使用 Hasura GraphQL 变更将用户数据插入或更新到我们的数据库中。

上述请求使用`id`和`name`值对用户表执行变更。
