---
title: "権限を試す"
metaTitle: "権限を試す | Hasura GraphQLチュートリアル"
metaDescription: "todosテーブル用のGraphQL APIによる権限のテストを行って、データアクセスがどのように制限されるかを確認します。"
---

`todos` テーブル用のGraphQL APIによる権限のテストを始めましょう。

## クエリ {#query}

では、2つの要求ヘッダーを追加して、データのクエリを行いましょう。

- `x-hasura-role`: `user`
- `x-hasura-user-id`: `1`

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

![todoクエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-permission-testing.png)

ユーザーid `1` に対して、受信した応答がフィルターされることに注意してください。`x-hasura-user-id` から `2` に値を変更すると、ユーザーid `2` に対してのみデータが返されます。これにより、前のステップで設定した権限が確認されます。

`users` テーブルでも、同様に権限設定をテストできます。
