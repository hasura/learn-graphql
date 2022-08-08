---
title: "自定义 JWT 声明规则"
metaTitle: "自定义 JWT 声明规则 | Hasura GraphQL 教程"
metaDescription: "JWT 内的自定义声明用于向 Hasura 说明调用方的角色，以便 Hasura 实施必要的授权规则，以确定该调用方的权限。"
---

JWT 内的[自定义声明](https://auth0.com/docs/scopes/current/custom-claims)用于向 Hasura 说明调用方的角色，以便 Hasura 实施必要的授权规则，以确定该调用方的权限。
在 Auth0 控制面板中，导航至[规则](https://manage.auth0.com/#/rules)。

单击`+ Create Rule`按钮。 在下一个屏幕中，选择`Empty rule`模板。

将规则命名为`hasura-jwt-claims`。

将以下脚本添加至规则中。

```javascript
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.accessToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

![自定义 JWT 声明规则](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule-accessToken.png)
