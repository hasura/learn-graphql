---
title: "GraphQL APIs を試す"
metaTitle: "GraphQL APIs で users を試してみる | Hasura GraphQL チュートリアル"
metaDescription: "Hasura GraphQL Engineによってクエリ、ミューテーション、サブスクリプションが自動的に生成されるテーブルユーザー向けのGraphQL APIを試してみる"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/ixSMUiWvKrM" />

Hasura が Postgres を介して Instant GraphQL API を提供しているので、作成したばかりのテーブルでテストできます。

まず `users` テーブルの GraphQL API を見てみましょう。

## ミューテーション

コンソール -> GRAPHIQL タブに移動し GraphQL ミューテーションを使用してユーザーを追加します。


```graphql
mutation {
  insert_users(objects:[{id: "1", name:"Praveen"}]) {
    affected_rows
  }
}
```

クエリを実行するには GraphiQL インターフェースの `Play` ボタンをクリックします。

次のようなレスポンスが得られるはずです。

![ユーザーミュテーション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-user.png)

すごい！ これで作成した `users` テーブルのミューテーションクエリが実行されました。簡単ですね。

**ヒント**: GraphiQL インターフェースの `Explorer` を使用して、数回のクリックでミューテーションを実行できます。

## クエリ

次に先ほど追加したデータをクエリしてみましょう。

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

次のようなレスポンスが得られるはずです:

![ユーザークエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-user.png)

`created_at` などのデフォルト値があるカラムへの値は自動的に追加されます。

## サブスクリプション

テーブルへの変更をリアルタイムで受け取るために `users` テーブルに対して単純なサブスクリプションクエリを実行してみましょう。

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

最初に、サブスクリプションクエリは既存の結果をレスポンスで返します。

次に users テーブルに新しいデータを追加して、応答に表示される変更を確認します。

新しいタブで、コンソール -> Data タブ-> users -> Insert Row に移動し、別の行を追加します。

![新しいユーザーの追加](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-insert-new-row.png)

そして前の `GRAPHIQL` タブに切り替えて、2つの結果を返すサブスクリプションの応答を確認します。

![User Subscription](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

アクティブなサブスクリプションクエリは、クエリに応じて最新の結果セットを返し続けます。
