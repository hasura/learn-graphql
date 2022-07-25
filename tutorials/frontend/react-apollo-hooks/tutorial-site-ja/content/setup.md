---
title: "チュートリアルとボイラープレートのセットアップ"
metaTitle: "TodoアプリのReactボイラープレートのセットアップ | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQLバックエンドはすでに準備されています。ここでは、静的なUIをReact.jsを使って、実際に動作するリアルタイムアプリに変換します"
---

このチュートリアルでは、GraphQLバックエンドと基本的なアプリのUIはすでに準備されています。ここでは、「静的な」UIを実際に動作するリアルタイムアプリに変換します。

### ボイラープレートをcloneして実行する

1. [ learn-graphql ](https://github.com/hasura/learn-graphql) repo.をcloneします。ターミナルで以下のコマンドを実行します。

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/frontend/react-apollo-hooks/app-boilerplate
```

2. `app-boilerplate` ディレクトリに移動します。

```bash
cd tutorials/frontend/react-apollo-hooks/app-boilerplate
```

3. dependenciesをインストールして、「静的な」アプリを実行します
   - `npm install`
   - `npm start`

4. ユーザーでサインアップ/ログインして、todoアプリのページを読み込みます

上記の手順を実施した後は、以下のようなページが表示されるはずです。

![ ログイン後のボイラープレート ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

### Graphi QLをロードしてGraphQL APIを試す

1. https://hasura.io/learn/graphql/graphiql に移動します
2. ログインします（有効なユーザートークンを使って、GraphQL APIのテストを実施できるようにします）

上記の手順を実施した後は、以下のようなページが表示されるはずです。

![ ログイン後のGraphiQL ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### GraphQLエンドポイント

このチュートリアルでは、 `https://hasura.io/learn/graphql` エンドポイントを使用して、GraphQL要求を作成します。

上記のGraphQLエンドポイントを独自のバージョンで実行したい場合は、Hasuraバックエンドチュートリアルに従って独自のバージョンを作成します。

- Hasuraクラウドの導入

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- Hasuraバックエンドのセットアップ

[ Hasuraバックエンドチュートリアル ](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole) に移動して、独自のバージョンの作成を開始してください。
