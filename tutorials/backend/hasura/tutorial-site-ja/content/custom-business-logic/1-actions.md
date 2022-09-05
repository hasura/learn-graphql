---
title: "アクションの作成"
metaTitle: "アクションでHasuraグラフを拡張する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、グラフを拡張してカスタムビジネスロジックを実行するためのアクションを書く方法について紹介します"
---

ここでは、Auth0からのプロファイル情報を取得する最初のユースケースを紹介します。

すべてのデータ要件に対する単一のGraphQLエンドポイントを維持するのが理想です。

Auth0プロファイル情報を取得するユースケースを処理するため、カスタムNode.jsサーバーにREST APIを書きます。これは任意の言語/フレームワークで書くことができますが、この例ではNode.jsを使います。

Hasuraは、このREST APIを既存の自動生成されたGraphQLスキーマと統合できるため、クライアントは単一のGraphQLエンドポイントを使用して、すべてをクエリできるようになります。

## アクションの作成 {#creating-an-action}

Hasuraコンソールで、`Actions` タブに移動し、`Create` をクリックして、新しいアクションを作成します。

![アクションの定義](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-definition.png)

### アクションの定義 {#action-definition}

アクションとアクションの種類を定義する必要があります。APIからのデータ読み取りしか行っていないため、このアクションのクエリタイプを使用します。この定義には、アクションの名前（この場合、auth0）、入力引数（この場合、なし）、アクションの応答タイプ（この場合、`auth0_profile`）があります。

```graphql
type Query {
  auth0 : auth0_profile
}
```

### タイプ定義 {#types-definition}

アクションの応答タイプは `auth0_profile` であると定義しました。では、Auth0 APIから見返りに何が欲しいのでしょうか？これまでデータベースに保存されていない `id`、`email`、および `picture` フィールドが欲しいです。

```graphql
type auth0_profile {
  id : String
  email : String
  picture : String
}
```

3つのフィールドはすべて、タイプ文字列です。`auth0_profile` は、3つのキー（id、メール、および画像）があるオブジェクトタイプであり、応答でこのオブジェクトを返すことに注意してください。

REST APIを書いて、パブリックエンドポイントにデプロイしたら、後でハンドラーURLを変更します。

![アクションを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-action.png)

上記のフィールドの設定が完了したら、`Create` をクリックします。

## REST APIを書く {#write-rest-api}

アクションが作成されたので、このアクションに後で設定できるNode.js ExpressアプリにREST APIを書きます。

`Codegen` タブに移動して、ボイラープレートコードを使用して手早く始めましょう:)

`Try on Glitch` をクリックして、サーバーをデプロイします。Glitchは、アプリ（Node.js）をビルドおよびデプロイするためのプラットフォームであり、それによってクラウドでコードを手早くテストし、反復できます。

![アクションcodegen](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-codegen-tab.png)

`src/server.js` の内容を以下のものに置き換えます。

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

上記のサーバーで、何が起こっているかを見ていきましょう。

- アクションからの要求本文としてペイロード `session_variables` を受け取ります。
- [Auth0のManagement API](https://auth0.com/docs/api/management/v2/create-m2m-app)に要求して、`user_id` を渡し、このユーザーに関する詳細を取得します。
- サーバー内のAuth0 APIから応答を得たら、以下のオブジェクト `{email: resp.email, picture: resp.picture}` を形成して、クライアントに返します。または、エラーケースを返します。

上記のコードで行き詰まった場合は、Glitchで以下の[既製サーバー](https://glitch.com/~auth0-hasura-action)を使用して、それをクローンします。
コードの変更を開始するには、Glitchプロジェクトもリミックスする必要があります。

### 環境変数 {#environment-variables}

Glitchアプリソースコードで、`.env` ファイルを変更して、

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

値を適切に入力します。AUTH0_MANAGEMEN_API_TOKENは、Auth0プロジェクトから取得できます。

![Auth0 Management API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-management-api.png)

おめでとうございます！グラフを拡張するための最初のHasuraアクションを書いて、デプロイしました。

## 権限 {#permission}

新しく追加されたタイプをクエリするには、このクエリタイプの `user` ロールに権限を与える必要があります。新しく作成されたアクションの `Permissions` タブに移動して、ロールユーザーのアクセス権を設定します。

![アクション権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-permission.png)

では、この新しく追加されたAPIをどのようにクエリするのでしょうか？

まず、アクションのウェブフックurlを更新する必要があります。デプロイされたアプリURLをGlitchからコピーして、ウェブフックハンドラーとして追加します。GlitchアプリURLと一緒にルート `/auth0` を追加することを忘れないでください。

![アクションハンドラー](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-handler-update.png)

GraphiQLに移動して、以下のクエリを試します。

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

[Auth0を設定してテスト](https://hasura.io/learn/graphql/hasura/authentication/5-test-with-headers/)した後に、得たJWTトークンを覚えておいてください。ここでは、同じJWTトークンで `Authorization` ヘッダーを渡して、適切なデータを取得する必要があります。

GraphiQLで、`x-hasura-admin-secret` ヘッダーのチェックを外し、`Authorization` という新しいものを作成して、値 `Bearer eyJhb.....` にこれを貼り付けます。

**注**：適切なヘッダー値を渡す必要があります。正しいトークンで承認ヘッダーを渡すことができれば、Node.jsサーバーはセッション変数から適切な `x-hasura-user-id` 値を受け取り、APIが想定通りに動作するようになります。

そうです！これで、組み込みGraphQL APIをカスタムコードで拡張しました。
