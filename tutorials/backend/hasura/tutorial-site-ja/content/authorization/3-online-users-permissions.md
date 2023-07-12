---
title: "online_usersビューの権限を設定する"
metaTitle: "online_usersビューの権限を設定する | Hasura GraphQLチュートリアル"
metaDescription: "本チュートリアルでは、Hasuraコンソールを使ってonline_usersビューに閲覧、更新操作の権限を設定する方法を学びます。"
---

`online_users` ビューの下の権限タブに移動して、関連する権限を追加します。

## 閲覧権限 {#select-permission}

このビューでは、ユーザーがデータを閲覧できるようにしたいだけなので、ミューテーションは行いません。そのため、挿入、更新、削除に対する権限は定義しません。

行の閲覧権限については、 `Without any checks` を選択して、列の閲覧権限で列 `id` および `last_seen` を両方選択します。

![online_usersビューの閲覧権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

`Save Permissions` をクリックします。リアルタイムtodoアプリに必要なすべてのアクセス制御ルールを設定しました。
