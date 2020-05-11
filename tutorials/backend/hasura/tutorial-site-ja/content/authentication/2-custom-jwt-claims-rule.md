---
title: "カスタム JWT クレームのルール"
metaTitle: "カスタム JWT クレームのルール | Hasura GraphQL チュートリアル"
metaDescription: "JWT 内のカスタムクレームは、発信者の役割について Hasura に通知するために使用されます。これにより Hasura は 発信者が実行できることと実行できないことを決定するために必要な承認ルールを決定します。"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/AAVn87dBOCU" />

[カスタムクレーム](https://auth0.com/docs/scopes/current/custom-claims) は、JWT 内で Hasura に呼び出し元の役割を通知するために使用されます。これにより Hasura は必要な承認規則を適用して、呼び出し元が実行できることと実行できないことを決定します。
Auth0ダッシュボードで [Rules](https://manage.auth0.com/#/rules) に移動します。

次のルールを追加して `hasura-jwt-claim` の下にカスタム JWT クレームを追加します。

```javascript
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.idToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

![Custom JWT Claims Rule](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule.png)
