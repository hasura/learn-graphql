---
title: "users テーブルの作成"
metaTitle: "users テーブルの作成 | Hasura GraphQL チュートリアル"
metaDescription: "Hasuraコンソールで Data タブに移動し、Create table をクリックして、テーブルユーザーを作成します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/YLRYrEgJRA0" />

users テーブルを作成することから始めましょう。

`users` テーブルには次のカラムがあります:

- `id` (type text)
- `name` (type text)
- `created_at` (type timestamp and default now())
- `last_seen` (type timestamp and nullable)

カラムはほとんどが名前から意味が分かります。`last_seen` カラムは、ユーザーがオンラインの時の最新のタイムスタンプを格納するために使用されます。

Hasuraコンソールで `Data` タブセクションに移動し `Create Table` をクリックします。上記のようにテーブルを作成するための値を入力します。

![Create table users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

完了したら `Add Table` ボタンをクリックしてテーブルを作成します。

すごい！ アプリに必要な最初のテーブルを作成することができました。
