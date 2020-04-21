---
title: "ユーザとルールの同期"
metaTitle: "ユーザとルールの同期 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは Auth0 のルールをセットアップして Auth0 のユーザーがデータベースのユーザーと同期できるようにする方法を学びます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/i5rMmXXcVsk" />

Auth0 のルールを設定して Auth0 のユーザーがデータベース内のユーザーと同期できるようにする必要があります。 次のコードスニペットを使用すると同じことができます。再びルール機能を使用して、新しいルールを作成し、次のコードスニペットに貼り付けます。

```javascript
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;

  const admin_secret = "xxxx";
  const url = "https://learn-hasura-backend.herokuapp.com/v1/graphql";

  request.post({
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      url:   url,
      body:    `{\"query\":\"mutation($userId: String!, $nickname: String) {\\n          insert_users(\\n            objects: [{ id: $userId, name: $nickname }]\\n            on_conflict: {\\n              constraint: users_pkey\\n              update_columns: [last_seen, name]\\n            }\\n          ) {\\n            affected_rows\\n          }\\n        }\",\"variables\":{\"userId\":\"${userId}\",\"nickname\":\"${nickname}\"}}`
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

![Auth0 挿入ルール](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-insert-rule.png)

**注意**: アプリに応じて `x-hasura-admin-secret` および `url` パラメーターを適切に変更します。
ここでは `users` テーブルに変更を加える簡単なリクエストを作成しています。

それでおしまいです！このルールは、サインアップまたはログインが成功するたびにトリガーされ Hasura GraphQL ミューテーションを使用してユーザーデータをデータベースに挿入または更新します。

上記のリクエストは `id` と `name` の値を使用して users テーブルに対して変更を実行します。
