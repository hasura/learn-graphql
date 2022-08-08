---
title: "応答制限"
metaTitle: "応答制限 | Hasura GraphQL上級チュートリアル"
metaDescription: "応答制限により、1回のリクエストでアクセスできるデータ量を制限できます。データベースのボトルネックを作らないためには、レート制限に加えて、応答制限も重要です"
---

API制限を設定すると、返ってくる行数を制限でき、その上で集計クエリにアクセスすることもできます。

例えば、レート制限で100req/minを設定したとします。しかし、もし各要求がデータベースから数千行相当のデータを取得したらどうでしょうか。これが、データベースのボトルネックになってしまいます。

応答制限により、1回のリクエストでアクセスできるデータ量を制限できます。この制限は、ロールベースのアクセス許可レイヤーで設定できます。

Slackモデルの例で、 `channel_thread` で返ってくる行数を常に最大100行に制限する場合、以下に示すようにLimit in permissionsで設定します。

`channel_thread` テーブルとHasura Consoleの `Permissions` タブに移動します。

![ チャネルスレッドの応答制限 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

`Row Select Permissions` の下の `Limit` を100または任意の値に設定します。

デフォルトでは、集計クエリは設定できません。このクエリを有効にするには、ロール権限で明示的に有効にする必要があります。ユーザーが `count` のようなデータを要求しても安易にデータが公開されないよう、デフォルトではクエリが無効になっています。
