---
title: "online_users ビューへの権限の設定"
metaTitle: "online_users ビューへの権限の設定 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは Hasura コンソールを使用して、online_usersビューに選択の操作の権限を設定する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/mmX5JRhT1-c" />

`online_users` ビューの下の Permissions タブに移動して、関連する権限を追加します。

## 選択の権限

このビューではユーザーがデータを選択だけできるようにして、変更を行わないようにします。 したがって、挿入、更新、削除の権限は定義していません。

行の選択権限については `Without any checks` を選択しカラムの選択の権限で `id` カラムと `last_seen` カラムの両方を選択します。

![online users permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

`Save Permissions` をクリックします。 リアルタイムToDoアプリに必要なすべてのアクセス制御ルールを完了しました。
