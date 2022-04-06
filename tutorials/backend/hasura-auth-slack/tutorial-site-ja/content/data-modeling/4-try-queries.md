---
title: "GraphQL APIを試す"
metaTitle: "GraphQL APIを試す | Hasura Auth Slackチュートリアル"
metaDescription: "クエリ、ミューテーション、サブスクリプションがHasura GraphQL Engineによって自動的に生成されるテーブルユーザー用のGraphQL APIを紹介します"
---

Hasuraが[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/)でインスタントGraphQL APIを提供することは学びました。それを、[先ほど作成したテーブル](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/)でテストできます。

それでは、`users` テーブルのGraphQL APIを紹介します。

## ミューテーション {#mutation}

コンソール -> GRAPHIQLタブに移動して、GraphQLミューテーションを使ってユーザーを挿入します。

```graphql
mutation {
  insert_users(objects:[{name:"Praveen", email: "myemail@example.com", password: "password123"}]) {
    affected_rows
  }
}
```

GraphiQLインターフェースの `Play` ボタンをクリックして、クエリを実行します。

以下のような応答が得られるはずです。

```graphql
{
  "data": {
    "insert_users": {
      "affected_rows": 1
    }
  }
}
```

完璧です。これで、先ほど作成した `users` テーブルのミューテーションクエリを消費しました。簡単ですね。

**ヒント**：GraphiQLインターフェースの `Explorer` を使って、数回のクリックでミューテーションを生成できます。

## クエリ {#query}

それでは、挿入されたばかりのデータのクエリを行いましょう。

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

以下のような応答が得られるはずです。

![ユーザークエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-user.png)

`created_at` などの一部の列には、ミューテーション中に挿入しなくてもデフォルトの値があります。

## サブスクリプション {#subscription}

`users` テーブルに対してサブスクリプションクエリを実行して、テーブルの変更を確認しましょう。

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

最初に、サブスクリプションクエリは、応答に既存の結果を返します。

それでは、新しいデータをユーザーテーブルに挿入して、応答に表示される変更を確認しましょう。

新しいタブで、コンソール -> DATAタブ -> ユーザー -> 行を挿入に移動して、別の行を挿入します。

そして、前の `GRAPHIQL` タブに切り替えて、2つの結果を返すサブスクリプション応答を確認します。

![ユーザーサブスクリプション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

アクティブなサブスクリプションクエリは、クエリに応じて、最新の結果のセットを返し続けます。
