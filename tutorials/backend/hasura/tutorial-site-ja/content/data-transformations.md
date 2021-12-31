---
title: "データ変換"
metaTitle: "Postgresでのデータ変換 | Hasura GraphQLチュートリアル"
metaDescription: "ViewsとSQL関数を使ってPostgresデータ変換を活用して、アプリに必要なオンラインユーザーを検索します。"
---



todoアプリのリアルタイム機能の1つは、オンラインユーザーのリストの表示です。ユーザーが最後にオンラインにいた時刻を示す `last_seen` の値に基づいて、この情報を取得する方法が必要です。

これまで、テーブルとリレーションシップを構築していました。[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/)では、次のものを使って、データ変換を実行できます。

- [ビュー](https://hasura.io/learn/database/postgresql/views/)
- SQL関数

この例では、`Views` を利用します。このビューは、過去30秒にログインしオンラインになっているユーザーをアプリが検索するために必要です。

## ビューを作成する {#create-view}

このビューを作成するためのSQLステートメントは、以下のようになります。

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

このビューを追加して、Hasuraでビューを追跡して、クエリできるようにします。

コンソール -> DATA -> SQLページに移動します。

![ビューonline_usersを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-view.png)

`Run` をクリックして、ビューを作成します。

## オンラインユーザーへのサブスクリプション {#subscription-to-online-users}

サブスクリプションクエリを `online_users` ビューに作成して、テストしましょう。

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

別のタブで、既存のユーザーの `last_seen` 値を更新して、サブスクリプション応答が更新されることを確認します。

![ユーザー last_seen を更新する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/update-users-last-seen.png)

`last_seen` 列の `now()` として値を入力して、`Save` をクリックします。

サブスクリプションクエリが実行されているタブに戻って、更新された応答を確認します。

![サブスクリプションオンラインユーザー](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-subscription.png)
