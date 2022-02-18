---
title: "ユーザーテーブルを作成する"
metaTitle: "ユーザーテーブルを作成する | Hasura GraphQLチュートリアル"
metaDescription: "データタブに移動して、テーブルの作成をクリックして、Hasuraコンソールでユーザーテーブルを作成します。"
---

`users` テーブルを作成することから始めましょう。

`users` テーブルには、以下の列が表示されます。

- `id`（type Text）、
- `name`（type Text）、
- `created_at`（type Timestamp and default now()）
- `last_seen`（type Timestamp and nullable）

これらの列は、ユーザー項目のプロパティと関連付けられています。`last_seen` 列は、ユーザーがオンラインになった時の最新のタイムスタンプを保存するために使用されます。

Hasuraコンソールで、`DATA` タブセクションに移動し、接続済みのHerokuデータベース（左側ナビゲーションから）をクリックします。データベース名は `default` になり、スキーマ名は `public` になります。`public` スキーマに移動し、`Create Table` をクリックします。上記の通り、テーブルを作成する値を入力します。

![テーブルユーザーを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

完了後、`Add Table` ボタンをクリックして、テーブルを作成します。

完璧です。アプリに必要な最初のテーブルが作成されました。
