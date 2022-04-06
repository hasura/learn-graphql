---
title: "GraphQL APIのtodosの紹介"
metaTitle: "GraphQL APIのtodosの紹介 | Hasura GraphQLチュートリアル"
metaDescription: "todosテーブル用のGraphQL APIを見ていきます。todosテーブルには、Hasura GraphQL Engineによって、クエリ、ミューテーション、サブスクリプションが自動的に生成されます。"
---

`users` テーブルと同様、前のステップで作成された `todos` テーブルには自動生成されたGraphQL APIがあります。それについて紹介します。

それでは、`todos` テーブルのGraphQL APIを見ていきましょう。

## ミューテーション {#mutation}

コンソール -> API -> GraphiQLタブに移動して、GraphQLミューテーションを使ってtodoを挿入します。

```graphql
mutation {
  insert_todos(objects:[{title: "My First Todo", user_id: "1"}]) {
    affected_rows
  }
}
```

GraphiQLインターフェースの `Play` ボタンをクリックして、クエリを実行します。

以下のような応答が得られるはずです。

![todoミューテーション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-todo.png)

## クエリ {#query}

それでは、先ほど挿入したデータのクエリを行いましょう。

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

以下のような応答が得られるはずです。

![todoクエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-todo.png)

ミューテーション中に挿入しなくても、`is_public` や `is_completed` のような一部の列にはデフォルト値があります。

## サブスクリプション {#subscription}

`todos` テーブルに対してサブスクリプションクエリを実行して、テーブルの変更を確認しましょう。上記のGraphQLクエリで、`query` を `subscription` に置き換えます。

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

最初に、サブスクリプションクエリは、応答に既存の結果を返します。

それでは、新しいデータをtodosテーブルに挿入して、応答に表示される変更を確認しましょう。

新しいタブで、コンソール -> `DATA` タブ -> todo -> 行を挿入に移動して、別の行を挿入します。

![新しいtodoを挿入する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todo-insert-new-row.png)

そして、前の `API` タブに切り替えて、2つの結果を返すサブスクリプション応答を確認します。

![todoサブスクリプション](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-todo.png)
