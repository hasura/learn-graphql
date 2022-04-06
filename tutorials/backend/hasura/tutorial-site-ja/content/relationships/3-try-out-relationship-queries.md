---
title: "リレーションシップクエリを試す"
metaTitle: "リレーションシップクエリを試す | Hasura GraphQLチュートリアル"
metaDescription: "Hasura GraphQL Engineを使って、クエリとネストされたデータを持つテーブルtodos用のGraphQL APIを紹介します"
---

作成されたリレーションシップ用のGraphQL APIを見ていきましょう。

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

以下の形式で応答を確認できます。

![リレーションシップ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

ご覧の通り、同じ応答でクエリしたとおりにユーザー情報の結果が得られます。これは、1対1のクエリ/オブジェクトリレーションシップの一例です。
