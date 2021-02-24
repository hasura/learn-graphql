---
title: "カスタムレゾルバーの記述"
metaTitle: "カスタムレゾルバーの記述 | Hasura GraphQL チュートリアル"
metaDescription: "このパートでは、カスタムリゾルバーを作成し、それを Hasura GraphQL エンジンのリモートスキーマとして追加する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/_d3sn_S6u-E" />

Auth0 からプロファイル情報を取得する最初のユースケースを見てみましょう。

すべてのデータ要件に対して単一の GraphQL エンドポイントを維持することが理想的です。

Hasura には、リモートの GraphQL スキーマをマージして、統合された GraphQL API を提供する機能があります。Auth0 プロファイル情報を取得するユースケースを処理するために、カスタム GraphQL サーバーにカスタムリゾルバーを記述します。Hasura はこのカスタム GraphQL サーバーを既存の自動で生成されたスキーマとマージできます。このカスタム GraphQL サーバーが `Remote Schema` です。

![Remote schema アーキテクチャ](https://hasura.io/docs/latest/_images/remote-schemas-arch1.png)

## GraphQL カスタムリゾルバーを記述する
それでは、後で Hasura の GraphQL API にマージできるカスタムリゾルバーを作成しましょう。

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

function getProfileInfo(user_id){
    const headers = {'Authorization': 'Bearer '+process.env.AUTH0_MANAGEMENT_API_TOKEN};
    console.log(headers);
    return fetch('https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/'+user_id,{ headers: headers})
        .then(response => response.json())
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
            return getProfileInfo(user_id).then( function(resp) {
              console.log(resp);
              if (!resp) {
                return null;
              }
              return {email: resp.email, picture: resp.picture};
            });
          } catch(e) {
            console.log(e);
            return null;
          }
        }
    },
};

const context = ({req}) => {
  return {headers: req.headers};
};

const schema = new ApolloServer({ typeDefs, resolvers, context});

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

```

上記のサーバーで、何が起こっているのかを分析してみましょう。

- `auth0_profile` と `Query` の GraphQL タイプを定義します。
- 次に、クエリタイプ `auth0` のカスタムリゾルバーを記述し `Authorization` ヘッダーを解析してトークンを取得します。
- 次に `jsonwebtoken` ライブラリの `jwt` メソッドを使用してトークンをデコードします。これにより auth0 プロファイル情報を取得するために必要な user_id が提供されます。
- [Auth0 の管理 API](https://auth0.com/docs/api/management/v2/create-m2m-app) にリクエストを送信し、トークンとuser_idを渡してこのユーザーの詳細を取得します。
- 応答を受け取ったら、オブジェクト `{email：resp.email、picture：resp.picture}` を応答として返します。そうでなければ、nullを返します。

## デプロイ

[![GLITCHへのデプロイ](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~auth0-hasura-remote-schema)

### 環境変数
Glitchで独自のプロジェクトにリミックスした後 `.env` ファイルを変更して
- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

の値を適切な値に設定します。

おめでとうございます！最初の GraphQL カスタムリゾルバーを記述してデプロイしました。
