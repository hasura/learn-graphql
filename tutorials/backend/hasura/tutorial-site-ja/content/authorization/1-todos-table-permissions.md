---
title: "todosテーブル権限を設定する"
metaTitle: "todosテーブル権限を設定する | Hasura GraphQLチュートリアル"
metaDescription: "このチュートリアルでは、Hasuraコンソールを使ってtodosテーブルに挿入、閲覧、更新、削除操作の権限を設定する方法を学びます。"
---

`todos` テーブルの下の権限タブに移動して、関連する権限を追加します。

## 挿入権限 {#insert-permission}

ログインしたユーザーが、新しいtodoエントリを作成して、is_publicとタイトル列だけを指定できるようにします。

- 新しい役割を入力するテキストボックスに、“user”と入力します
- 「挿入」権限の編集（鉛筆）アイコンをクリックします。これにより、下のセクションが開き、カスタムチェックを設定して列を許可できます。
- カスタムチェックで、以下の条件を選択します。

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![todos行の挿入権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

列の挿入権限の下で、`title` および `is_public` 列を選択します。

![todos列の挿入権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

最後に、列のプリセットの下で、`X-HASURA-USER-ID` への `from session variable` マッピングから `user_id` を選択します。

**注：**セッション変数は、各要求の認証サービスから返されるキーと値のペアです。ユーザーが要求すると、セッショントークンは `USER-ID` にマッピングされます。この `USER-ID` は許可で使用され、`user_id` 列にセッション変数 `USER-ID` の値に等しい値がある場合にのみ、テーブルへの挿入が許可されることを示すことができます。

`Save Permissions` をクリックします。

## 閲覧権限 {#select-permission}

todoエントリがパブリックになっているか、ユーザーがログインしていれば、todoエントリを表示できるようにします。

「閲覧」権限の編集アイコンをクリックします。カスタムチェックで、以下の条件を選択します。

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![todos行の閲覧権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

列の閲覧権限の下で、すべての列を選択します。

![todos列の閲覧権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

`Save Permissions` をクリックする

## 更新権限 {#update-permission}

ユーザーがis_completed列しか更新できないようにします。

「更新」権限の編集アイコンをクリックします。更新前カスタムチェックで `With same custom checks as insert` を選択します。

そして、列の更新権限の下で、`is_completed` 列を選択します。

![todos更新権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

完了したら `Save Permissions` をクリックします。

## 削除権限 {#delete-permission}

ログインしたユーザーのみ、todoエントリを削除できます。

最後に、削除権限についてはカスタムチェックの下で `With same custom checks as insert, pre update` を選択します。

![todos削除権限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

`Save Permissions` をクリックすると、`todos` テーブルのアクセス制御が完了します。
