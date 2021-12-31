---
title: "GraphQL APIでユーザーを探索"
metaTitle: GraphQL APIでユーザーを探索 | Hasura GraphQLチュートリアル
metaDescription: "クエリ、ミューテーション、サブスクリプションがHasura GraphQL Engineによって自動的に生成されたユーザーテーブル用のGraphQL APIを見ていきます"
---

Hasuraは、その他のデータベースの中でも特に、[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/)でインスタントGraphQL APIを提供します。そのため、[先ほど作成したテーブル](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/)でテストできます。

それでは、`users` テーブルのGraphQL APIを見ていきましょう。APIを見るにはGraphiQLを使います。GraphiQLは、GraphQL統合開発環境（IDE）です。APIと対話するために使用する強力なツールです。

GraphiQLにアクセスするには、コンソール -> API -> GraphiQLタブに移動します。

## ミューテーション {#mutation}

GraphQLミューテーションを使ってユーザーを追加しましょう。以下のコードをGraphiQLインターフェースにコピーします。

```graphql
mutation {
  insert_users(objects:[{id: "1", name:"Praveen"}]) {
    affected_rows
  }
}
```

GraphiQLインターフェースの `Play` ボタンをクリックして、クエリを実行します。

以下のような応答が得られるはずです。

![ユーザーミューテーション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-user.png)

完璧です。これで、先ほど作成した  `users`テーブルのミューテーションクエリを消費しました。

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

それでは、新しいデータを `users` テーブルに挿入して、応答に表示される変化を確認しましょう。

新しいブラウザタブで、コンソール -> `DATA` タブ -> デフォルト -> パブリック -> ユーザー -> 行を挿入に移動して、別の行を挿入します。

![新しいユーザーを挿入する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-insert-new-row.png)

そして、前の `GRAPHIQL` タブに切り替えて、2つの結果を返すサブスクリプション応答を確認します。

![ユーザーサブスクリプション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

アクティブなサブスクリプションクエリは、クエリに応じて、最新の結果のセットを返し続けます。
