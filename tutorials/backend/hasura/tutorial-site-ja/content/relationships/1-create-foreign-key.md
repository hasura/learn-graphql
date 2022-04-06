---
title: "外部キーを作成する"
metaTitle: "外部キーを作成する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、Hasuraコンソールを使ってテーブル列用に外部キーを作成する方法を学びます。"
---

 `todos`テーブルでは、 `user_id`列の値が  テーブル`users`の  `id`列にあるのが理想です。そうでなければ、一貫性のないデータが発生します。

[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/)では、外部キー制約を定義してこの条件を強制できます。

 テーブル `todos` の  `user_id` 列用のものを定義します。

コンソール -> DATA -> todos -> ページの編集に移動します。

以下のような画面が表示されます。

![todos変更ページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

下部の `Foreign Keys` セクションまでスクロールして、`Add` をクリックします。

![user_id外部キー](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- `users` として参照テーブルを選択します。
-  開始列を `user_id`として、終了列を `id`として選択します。

todosテーブルのuser_id列は、ユーザーテーブルのidの値の1つでなければなりません。

`Save` をクリックして外部キーを作成します。

完璧です。これで、データの一貫性が確保されました。
