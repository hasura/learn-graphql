---
title: "リレーションシップクエリを試す"
metaTitle: "リレーションシップクエリを試す | Hasura GraphQL チュートリアル"
metaDescription: "Hasura GraphQL エンジンを使用して、シンプルなクエリとネストされたデータを使用して todos テーブル用のGraphQL APIを試してみる"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/0-UZahHSoGg" />

作成されたリレーションシップのGraphQL APIを試してみましょう。

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

次のフォーマットで応答を確認できます:

![relationship query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

ご覧のとおり同じレスポンスで、クエリしたとおりにユーザー情報の結果を取得しています。 これは、1対1のクエリ/オブジェクト関係の簡単な例です。
