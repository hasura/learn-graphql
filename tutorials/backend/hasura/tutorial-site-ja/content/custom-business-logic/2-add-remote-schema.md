---
title: "リモートスキーマを追加"
metaTitle: "リモートスキーマを追加 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、コンソールを使用してHasura GraphQL エンジンにリモートスキーマを追加する方法を見ていきます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/01t4t2t4q1c" />

カスタムリゾルバを作成し Glitch にデプロイしました。GraphQL エンドポイントの準備ができました。それを Hasura にリモートスキーマとして追加しましょう。

## 追加

コンソールの `Remote Schemas` タブに行き `Add` ボタンをクリックします。

![リモートスキーマの追加](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-remote-schema.png)

リモートスキーマの名前を指定します(auth0 としましょう)。
GraphQL サーバーの URL に、前の手順でデプロイしたグリッチアプリの URL を入力します。

`Forward all headers from the client` を選択し `Add Remote Schema` をクリックします。

## やってみましょう

コンソールの GraphiQL タブに移動し、次の GraphQL クエリを試しましょう。

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

適切なデータを取得するには `Authorization` ヘッダーとトークンを渡す必要もあります。

![リモートスキーマクエリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/query-remote-schema.png)

ご覧のとおり Hasura はカスタム GraphQL スキーマを既存の自動生成された API と Postgres にマージしました。
