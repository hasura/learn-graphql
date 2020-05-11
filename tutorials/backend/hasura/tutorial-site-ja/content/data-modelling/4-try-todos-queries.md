---
title: "GraphQL APIs を試す"
metaTitle: "todos の GraphQL APIs を試す | Hasura GraphQL チュートリアル"
metaDescription: "Hasura GraphQL エンジンによってクエリ、ミューテーション、サブスクリプションが自動的に生成される todos テーブルのGraphQL APIを試してみる"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/AflCqgGu-ms" />

`users` テーブルと同様に、前のステップで作成された `todos` テーブルにも自動生成された GraphQL API を試すことができます。

それでは `todos` テーブル用の GraphQL API を見てみましょう。

## ミューテーション

コンソール -> GRAPHIQL から GraphQL Mutations を使用して todo を作成します。

```graphql
mutation {
  insert_todos(objects:[{title: "My First Todo", user_id: "1"}]) {
    affected_rows
  }
}
```

クエリを実行するには、GraphiQLインターフェースの `Play` ボタンをクリックします。

次のようなレスポンスが得られるはずです:

![Todo ミュテーション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-todo.png)

## クエリ

次に、先ほど作成したデータをクエリしてみましょう。

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

次のようなレスポンスが得られるはずです:

![Todo クエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-todo.png)

作成中に値を指定しなかった場合でも `is_public` や ` is_completed` などの一部のカラムにはデフォルト値があることに注意してください。

## サブスクリプション

`todos` テーブルに対して単純なサブスクリプションクエリを実行して、テーブルへの変更を監視してみましょう。 上記の graphql クエリで `query` を `subscription` に置き換えます

```graphql
subscription {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

最初に、サブスクリプションクエリは既存の結果をレスポンスに返します。

次に、新しいデータを todos テーブルに挿入して、レスポンスの内容を見てみましょう。

新しいタブでコンソールに行き -> Data タブ-> todos -> Insert Rowに移動し、別の行を追加します。

![新しい todo を追加](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todo-insert-new-row.png)

そして前の GRAPHIQL タブに切り替えて、2つの結果を返すサブスクリプションのレスポンスを確認します。

![Todo サブスクリプション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-todo.png)
