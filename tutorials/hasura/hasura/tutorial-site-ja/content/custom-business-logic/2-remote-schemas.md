---
title: "カスタムリゾルバーを書く"
metaTitle: "カスタムリゾルバーを書く | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、カスタムリゾルバーを書き、Hasura GraphQL Engineのリモートスキーマとして追加する方法を紹介します。"
---

アクションを使ってGraphQL APIを拡張する方法はすでに紹介しました。APIグラフをカスタマイズするもう一つの方法は、カスタムGraphQLサーバーを使うことだと説明しました。

ここでは、Auth0からのプロファイル情報の取得と同じユースケースを紹介します。

Hasuraは、リモートGraphQLスキーマを統合して、統一されたGraphQL APIを提供できます。Auth0プロファイル情報を取得するユースケースを処理するため、カスタムリゾルバーをカスタムGraphQLサーバーに書き込みます。Hasuraは、後でこのカスタムGraphQLサーバーを既存の自動生成スキーマと統合できます。

このカスタムGraphQLサーバーは `Remote Schema` です。

## GraphQLカスタムリゾルバーを書く {#write-graphql-custom-resolver}

では、HasuraのGraphQL APIに後で統合できるカスタムリゾルバーを書きましょう。

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

上記のサーバーで、何が起こっているかを見ていきましょう。

- `auth0_profile` および `Query` のGraphQLタイプを定義します。
- そして、クエリタイプ `auth0` のカスタムリゾルバーを書き、`Authorization` ヘッダーを解析してトークンを取得します。
- `jsonwebtoken` ライブラリの `jwt` メソッドを使ってトークンをデコードします。これによって、auth0プロファイル情報の取得に必要なuser_idが与えられます。
- [Auth0のManagement API](https://auth0.com/docs/api/management/v2/create-m2m-app)に要求して、トークンとユーザーidを渡し、このユーザーに関する詳細を取得します。
- 応答を取得したら、オブジェクト `{email: resp.email, picture: resp.picture}` を応答として返します。または、`null` を返します。

**注**書かれたコードのほとんどは、アクションの前のセクションで書いたREST APIコードと非常に似ています。ここでは、Apollo Serverを使って、カスタムGraphQLサーバーを最初から書き出します。`Creating Actions` パートから `auth0` アクションを作成した場合、アクションはauth0リモートスキーマと衝突します。これを解決するには、リモートスキーマを作成できるようにアクションを削除するか、`auth0`タイプ と `auth0_profile` タイプの名前を変更します。

## デプロイ {#deploy}

上記のカスタムGraphQLサーバーをGlitchにデプロイしましょう。Glitchは、アプリ（Node.js）をビルドおよびデプロイするためのプラットフォームであり、それによってクラウドでコードを手早くテストし、反復できます。まず、以下のGlitchにデプロイするボタンをクリックします。

[![Glitch にデプロイする](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~auth0-hasura-remote-schema)

### 環境変数 {#environment-variables}

Glitchで自分のプロジェクトにリミックスした後、`.env` ファイルを変更して

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

値を適切に入力します。

おめでとうございます！最初のGraphQLカスタムリゾルバーを書いて、デプロイしました。
