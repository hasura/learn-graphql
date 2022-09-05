---
title: "online_usersビューの権限を設定する"
metaTitle: "online_usersビューの権限を設定する | Hasura GraphQLチュートリアル"
metaDescription: "本チュートリアルでは、Hasuraコンソールを使って選択操作するためのonline_usersビューに対する権限を設定する方法を学びます。"
---

`online_users` ビューの下の権限タブに移動して、関連する権限を追加します。

## 権限 {#select-permission} を選択します

このビューでは、ユーザーがデータを選択できるようにしたいだけなので、ミューテーションは行いません。そのため、挿入、更新、または削除に対する権限は定義しません。

行選択権限については、 `Without any checks` を選択して、列選択権限で列 `id` および `last_seen` を両方選択します。

![オンラインユーザー権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

`Save Permissions` をクリックします。リアルタイムtodoアプリに必要なすべてのアクセス制御ルールを設定しました。
