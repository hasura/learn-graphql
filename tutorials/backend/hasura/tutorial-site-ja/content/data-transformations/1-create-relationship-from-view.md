---
title: "ユーザーへのリレーションシップを作成"
metaTitle: "ビューから手動でリレーションシップを作成 | Hasura GraphQL チュートリアル"
metaDescription: "このパートでは Hasura Console を使用して、ビューからテーブルへの手動でリレーションシップを作成する方法を学びます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/QuaNRk2c5KI" />

ビューが作成されたので、ビューの `id` カラムに基づいてユーザー情報を取得できる方法が必要です。 ビューの `id` カラムを使用して、ビュー `online_users` からテーブル `users` への手動のリレーションシップを作成してみましょう。

コンソール -> Data -> online_users -> Relationships ページに移動します。

リレーションシップタイプを `Object Relationship` で選択して、新しいリレーションシップを追加します。 関係名を `user` として入力します。
現在のカラムの設定を `id` として選択すると、リモートテーブルは `users` になり、リモートカラムは再び `id` になります。

現在のビューの id カラムを users テーブルの id カラムにマッピングして、リレーションシップを作成します。

![create relationship from view](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

すごい！ これでこのアプリのデータモデリングは完了です。
