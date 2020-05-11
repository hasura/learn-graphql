---
title: "todos テーブルの作成"
metaTitle: "todos テーブルの作成 | Hasura GraphQL チュートリアル"
metaDescription: "Hasuraコンソールで Data タブに移動し、Create table をクリックして、todos テーブルを作成します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/u-5n4gKQQnw" />

次にモデル `todos` モデルの作成に移りましょう

`todos` テーブルには次のカラムを用意します:

- `id` (type integer;auto-increment)
- `title` (type text)
- `is_completed` (type boolean and default false)
- `is_public` (type boolean and default false)
- `created_at` (type timestamp and default now())
- `user_id` (type text)

各コラムは名前から意味が分かります。

Hasura コンソールで、Data タブセクションに移動し、Create Table をクリックします。 上記のようにテーブルを作成するための値を入力します。

![users テーブルの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

完了したら `Add Table` ボタンをクリックしてテーブルを作成します。
