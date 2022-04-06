---
title: "カスタムJWTクレームのルール"
metaTitle: "カスタムJWTクレームのルール | Hasura GraphQLチュートリアル"
metaDescription: "JWT内のカスタムクレームは、発信者の役割についてHasuraに通知するために使用され、Hasuraは、発信者ができることとできないことを決めるために必要な認証ルールを適用できます。"
---

JWT内の[カスタムクレーム](https://auth0.com/docs/scopes/current/custom-claims)は、発信者の役割についてHasuraに通知するために使用され、Hasuraは、発信者ができることとできないことを決めるために必要な認証ルールを適用できます。Auth0ダッシュボードで、[ルール](https://manage.auth0.com/#/rules)に移動します。

`+ Create Rule` ボタンをクリックします。次の画面で、`Empty rule` テンプレートを選択します。

ルールに `hasura-jwt-claims` と名前を付けます。

以下のスクリプトをルールに追加します。

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

![カスタムJWTクレームルール](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule-accessToken.png)
