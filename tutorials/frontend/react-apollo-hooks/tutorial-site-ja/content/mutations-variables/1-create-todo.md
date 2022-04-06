---
title: "todoの作成 - ミューテーション"
metaTitle: "todoを作成するミューテーション | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Mutationで新しいパーソナルtodoを作成します。GraphiQLミューテーションを試用して、認証トークンを渡して承認結果を取得します。"
---

ここでは、GraphQL Mutationを使って新しいtodoを作成する方法を学びます。

todoへの入力を実行するためのgraphql mutationを定義します。

```graphql
mutation ($todo: String!, $isPublic: Boolean!) {
  insert_todos(objects: {title: $todo, is_public: $isPublic}) {
    affected_rows
    returning {
      id
      title
      created_at
      is_completed
    }
  }
}
```

また、変数に値を渡す必要があります。

アプリケーションデータベースに対してGraphiQLを使ってこのミューテーションを [ 試して ](https://hasura.io/learn/graphql/graphiql) 、どのような応答が得られるか確認します。

このgraphql mutationをReactアプリに組み込みましょう。

