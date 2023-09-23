---
title: "todosテーブル権限を設定する"
metaTitle: "todosテーブル権限を設定する | Hasura GraphQLチュートリアル"
metaDescription: "このチュートリアルでは、Hasuraコンソールを使って操作を挿入、選択、更新、削除するため、todosテーブルに権限を設定する方法を学びます"
---

`todos` テーブルの下の権限タブに移動して、関連する権限を追加します。

## 権限を挿入する {#insert-permission}

ログインしたユーザーが、新しいtodoエントリを作成して、is_publicとタイトル列だけを指定できるようにします。

- 新しい役割を入力するテキストボックスに、“user”と入力します
- 「挿入」権限の編集（鉛筆）アイコンをクリックします。これにより、下のセクションが開き、カスタムチェックを設定して列を許可できます。
- カスタムチェックで、以下の条件を選択します。

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![todo行権限挿入](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

列の挿入権限の下で、`title` および `is_public` 列を選択します。

![todos挿入列権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

最後に、列のプリセットの下で、`X-HASURA-USER-ID` への `from session variable` マッピングから `user_id` を選択します。

**注：**セッション変数は、各要求の認証サービスから返されるキーと値のペアです。ユーザーが要求すると、セッショントークンは `USER-ID` にマッピングされます。この `USER-ID` は許可で使用され、`user_id` 列にセッション変数 `USER-ID` の値に等しい値がある場合にのみ、テーブルへの挿入が許可されることを示すことができます。

`Save Permissions` をクリックします。

## 権限 {#select-permission} を選択します

todoエントリがパブリックになっているか、ユーザーがログインしていれば、todoエントリを表示できるようにします。

「選択」権限の編集アイコンをクリックします。カスタムチェックで、以下の条件を選択します。

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![todos選択権限行](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

列選択権限の下で、すべての列を選択します。

![todos選択列権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

`Save Permissions` をクリックする

## 権限 {#update-permission} を更新する

ユーザーがis_completed列しか更新できないようにします。

「更新」権限の編集アイコンをクリックします。更新前カスタムチェックで `With same custom checks as insert` を選択します。

そして、列更新権限の下で、`is_completed` 列を選択します。

![todos更新権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

完了したら `Save Permissions` をクリックします。

## 権限 {#delete-permission}を削除する

ログインしたユーザーのみ、todoエントリを削除できます。

最後に、削除権限についてはカスタムチェックの下で `With same custom checks as insert, pre update` を選択します。

![todos削除権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

`Save Permissions` をクリックすると、`todos` テーブルのアクセス制御が完了します。
