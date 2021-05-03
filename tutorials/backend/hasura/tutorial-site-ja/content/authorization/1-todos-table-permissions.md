---
title: "todos テーブルの権限のセットアップ"
metaTitle: "todos テーブルの権限のセットアップ | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、Hasuraコンソールを使用して、挿入、選択、更新、および削除操作のためのtodosテーブルの権限を設定する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/AM1KbJL0kTo" />

'todos' テーブルの下の 'Permissions' タブに移動して、関連する権限を追加します。

## 挿入の権限

- 新しい役割を入力するテキストボックスに `ユーザー` と入力します
- 「insert(挿入)」権限の編集（鉛筆）アイコンをクリックします。 これにより、下のセクションが開き、カスタムチェックを構成して列を許可できます。
- カスタムチェックで、次の条件を選択します
```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![Todos row permission insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

カラム挿入権限の下で `title` カラムと `is_public` カラムを選択します。

![Todos insert column permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)


最後にカラムのプリセットの下で `from session variable` から `X-HASURA-USER-ID` へのマッピングから `user_id` を選択します。

`Save Permissions` をクリックします。

## 選択の権限

次に「select(選択)」権限の編集アイコンをクリックします。 カスタムチェックで、次の条件を選択します
```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![Todos select permission row](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

カラム選択権限の下で、すべてのカラムを選択します。

![Todos select column permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

`Save Permissions` をクリックします

## 更新の権限

「update(更新)」権限の編集アイコンをクリックします。 カスタムチェックで `With same custom checks as insert` を選択します。

カラムの更新権限の下で、`is_completed` カラムを選択します。

![Todos update permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission.png)

終わったら `Save Permissions` をクリックします。

## 削除の許可

最後に削除の許可については、カスタムチェックで、`With same custom checks as insert, update`を選択します。

![Todos delete permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

`Save Permissions` をクリックすると `todos` テーブルのアクセス制御が完了します。
