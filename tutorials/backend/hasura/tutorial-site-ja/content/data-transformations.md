---
title: "データ変換"
metaTitle: "Postgres のデータ変換 | Hasura GraphQL チュートリアル"
metaDescription: "ビューとSQL関数を使って Postgres データ変換を活用し、アプリに必要なオンラインユーザーを見つけます"
---

import YoutubeEmbed from "../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/vunIhyeTaac" />

todo アプリのリアルタイム機能の1つは、オンラインユーザーのリストを表示することです。ユーザーが最後にオンラインになった時期を知らせる `last_seen` の値に基づいてこの情報を取得する方法が必要です。

これまでのところ、テーブルと関係を構築していました。
Postgres では、以下を使用してデータ変換を実行できます。
- ビュー
- SQL関数

この例では `Views` を使用します。 このビューは、過去30秒間にログインしてオンラインになっているユーザーを見つけるためにアプリで必要になります。

## ビューの作成

このビューを作成するための SQL 構文は次のようになります:

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

このビューを追加して、それをクエリできるように Hasura でビューを追跡しましょう。

コンソール -> Data -> SQL ページに移動します。

![Create view online_users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-view.png)

`Run` をクリックしてビューを作成します。

## オンラインユーザーへのサブスクリプション

次に `online_users` ビューへのサブスクリプションクエリを作成してテストしましょう。

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

別のタブで、既存のユーザーの `last_seen` 値を更新して、サブスクリプションのレスポンスが更新されることを確認します。

![Update users last_seen](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/update-users-last-seen.png)

`last_seen` 列の値を `now()` として入力し `保存` をクリックします。

次にサブスクリプションクエリが実行されているタブに戻り、更新されたレスポンスを確認します。

![Subscription online users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-subscription.png)
