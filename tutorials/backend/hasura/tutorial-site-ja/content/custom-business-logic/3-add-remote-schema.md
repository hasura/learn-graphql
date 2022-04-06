---
title: "リモートスキーマを追加する"
metaTitle: "リモートスキーマを追加する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、コンソールを使って、Hasura GraphQL Engineにリモートスキーマを追加する方法を紹介します。"
---

カスタムリゾルバーを書いて、Glitchにデプロイしました。GraphQLエンドポイントを準備しました。リモートスキーマとして、Hasuraに追加しましょう。

## 追加する {#add}

コンソールの `Remote Schemas` タブに移動して、`Add` ボタンをクリックします。

![リモートスキーマを追加する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-remote-schema.png)

リモートスキーマに名前を付けます（auth0など）。GraphQL Server URLに、前のステップでデプロイしたグリッチアプリのurlを入力します。

`Forward all headers from the client` を選択して、`Add Remote Schema` をクリックします。

## 試してみましょう {#try-it-out}

コンソールGraphiQLタブに移動して、以下のGraphQL queryを試します。

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

Auth0を設定して、テストした後に得たJWTトークンを覚えていますか。ここでは、同じJWTトークンで `Authorization` ヘッダーを渡して、適切なデータを取得する必要があります。

![リモートスキーマクエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/query-remote-schema.png)

ご覧の通り、Hasuraは、カスタムGraphQLスキーマと、[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/)上の既存の自動生成APIを統合しました。
