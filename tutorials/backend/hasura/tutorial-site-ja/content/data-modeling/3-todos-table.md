---
title: "todosテーブルを作成する"
metaTitle: "todosテーブルを作成する | Hasura GraphQLチュートリアル"
metaDescription: "データタブに移動して、テーブルの作成をクリックして、Hasuraコンソールでtodosテーブルを作成します。"
---

では、もう 1 つのモデル `todos` を作成してみましょう。

`todos` テーブルには、以下の列が表示されます。

- `id`（タイプ整数（自動インクリメント））、
- `title`（タイプテキスト）、
- `is_completed`（タイプブーリアン、デフォルトはfalse）
- `is_public`（タイプブーリアン、デフォルトはfalse）
- `created_at`（タイムスタンプ、デフォルトはnow()）
- `user_id`（タイプテキスト）

これらの列は、todo項目のプロパティと関連付けられています。

id列をプライマリキーに設定する事を忘れないでください。

Hasuraコンソールで、`DATA` タブセクションに移動して、`Create Table` をクリックします。上記の通り、テーブルを作成する値を入力します。

![テーブルユーザーを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

完了後、`Add Table` ボタンをクリックして、テーブルを作成します。
