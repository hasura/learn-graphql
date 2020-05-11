---
title: "users テーブルの権限の設定"
metaTitle: "users テーブルの権限の設定 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは Hasura コンソールを使用して、挿入、選択、更新、削除の操作を行うためのユーザーテーブルの権限を設定する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/vt7B3Fpa0qc" />

続いて `users` テーブルへの選択および更新操作を許可する必要があります。
左側のサイドバーで `users` テーブルをクリックして users テーブルページに移動し Permissionsタブに切り替えます。

## 選択の権限

「編集」アイコン（鉛筆アイコン）をクリックして、役割ユーザーの選択の権限を変更します。 これにより、下のセクションが開き、その権限の設定ができます。

ここでユーザーは他のすべてのユーザーの `id` と ` name` データにアクセスできるはずです。

![users select permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

`Save Permissions` をクリックします

## 更新の権限

ログインしているユーザーは、自分のレコードのみを変更できる必要があります。その権限を設定しましょう。

カスタムチェック内の行の更新権限で、次の条件を選択します。

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

列の更新権限の下で `last_seen` 列を選択します。これは、フロントエンドアプリから更新されるためです。

![users update permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-update-permission.png)

`Save Permissions` をクリックすると `users` テーブルのアクセス制御ルールが完成します。
