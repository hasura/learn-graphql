---
title: "todoの更新 - mutation"
metaTitle: "Mutationによるtodoの更新 | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Mutationで既存のパーソナルtodoを更新します。GraphiQLでmutationを試して、todoの完了をマークする認証トークンを渡します。"
---

ここでは、GraphQL Mutationsを使って既存のtodoの完了をマークする方法を学びます。

todosでmutationを行うためのgraphql queryを定義します。

```graphql
  mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
      affected_rows
    }
  }
```
また、variablesに値を渡す必要もあります。

アプリケーションデータベースに対してGraphiQLでこのmutationを[試して](https://hasura.io/learn/graphql/graphiql)、どのような応答が得られるかを確認します。

それでは、このgraphql mutationをReactアプリに組み込みましょう。
