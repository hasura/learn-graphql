---
title: "todoの削除 - mutation"
metaTitle: "Mutationによるtodosの削除 | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Mutationでパーソナルtodoを削除します。GraphiQLでmutationを試して、todoを削除する承認トークンを渡します。"
---

ここでは、GraphQL Mutationsを使って既存のtodoを削除する方法を学びます。

todosへのmutationを行うためのgraphql queryを定義します。

```graphql
mutation removeTodo ($id: Int!) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
```

アプリケーションデータベースに対してGraphiQLでこのmutationを [ 試して ](https://hasura.io/learn/graphql/graphiql) 、どのような応答が得られるかを確認します。また、変数に値を渡す必要があります。

このgraphql mutationをReactアプリに組み込みましょう。