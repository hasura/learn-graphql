---
title: "todoの取得 - query"
metaTitle: "Queryによるtodoの取得 | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Queryでパーソナルtodoを取得します。ここではGraphQL Queryを使って、認証トークンを渡して承認結果を取得します。"
---

最初に作成するgraphql queryでは、パーソナルtodoを取得します。ログインしたユーザーのデータベースからtodoデータを読み込む必要があります。必要なデータを取得するためのgraphql queryを定義します。

```graphql
query getMyTodos {
  todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
    id
    title
    created_at
    is_completed
  }
}
```

アプリケーションデータベースに対してGraphiQLを使ってこのqueryを [試して](https://hasura.io/learn/graphql/graphiql) 、どのような応答が得られるかを確認します。

**注** ：queryして結果を取得する前に、 `Authorization: Bearer <token>` ヘッダーを渡す必要があります。Auto0経由でログインした後、トークンはUIにauto-fillされます。

このqueryは、Reactアプリで実際に使用するgraphql queryなので、期待通りに動作するか検証します。

このgraphql queryをReactアプリに組み込みましょう。