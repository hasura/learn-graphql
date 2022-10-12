---
title: "Rulesでユーザーを同期する"
metaTitle: "RulesでAuth0ユーザーを同期する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、Auth0のルールの設定について学び、Auth0のユーザーがデータベース内のユーザーと同期できるようにします。"
---

Auth0には、ログイン要求のたびに呼び出されるように設定できるルールがあります。Auth0設定の2番目のステップを思い出してください。カスタムJWTクレームを適用するルールを作成しました。ここでは、Auth0におけるルールを設定して、Auth0のユーザーがデータベース内のユーザーと同期できるようにする必要があります。以下のコードスニペットによって、それが可能です。再度Rules機能を使用して、新しい空のルールを作成して、以下のコードスニペットに貼り付けます。

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

![Auth0挿入ルール](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-sync-rule.png)

**注**：アプリに応じて、`x-hasura-admin-secret` および `url` パラメーターを適切に変更します。
ここでは、 `users` テーブルにミューテーションを実行する要求を行います。

それでおしまいです！このルールは、サインアップまたはログインが成功するたびにトリガーされます。そして、Hasura GraphQLミューテーションを使用して、ユーザーデータをデータベースに挿入または、更新します。

上記の要求では、`id` 値と `name` 値によってユーザーテーブルでミューテーションを実行します。
