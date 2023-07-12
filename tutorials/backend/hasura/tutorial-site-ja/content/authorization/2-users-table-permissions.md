---
title: "usersテーブル権限を設定する"
metaTitle: "usersテーブル権限を設定する | Hasura GraphQLチュートリアル"
metaDescription: "このチュートリアルでは、Hasuraコンソールを使って操作を挿入、選択、更新、削除するため、ユーザーテーブルに権限を設定する方法を学びます。"
---

また、`users` テーブルに対する操作の選択および更新を許可する必要があります。左側のサイドバーで、`users` テーブルをクリックして、ユーザーテーブルページに移動して、権限タブに切り替えます。

## 権限 {#select-permission} を選択します

編集アイコン（鉛筆アイコン）をクリックして、ロールユーザーの選択権限を変更します。以下のセクションが開いて、権限を設定できます。

ここでは、ユーザーは他のすべてのユーザーの `id` と `name` データにアクセスできるはずです。

![ユーザーが権限を選択する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

`Save Permissions` をクリックする

## 権限 {#update-permission} を更新する

ログインしたユーザーは、自分のレコードだけを変更できるようにする必要があります。この権限を設定しましょう。

行の更新権限で、カスタムチェックで以下の条件を選択します。

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

列の更新権限で、`last_seen` 列を選択します。これは、フロントエンドアプリから更新されるためです。

![ユーザーが権限を更新する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-update-permission.png)

`Save Permissions` をクリックすると、`users` テーブルのアクセス制御ルールが完了します。



