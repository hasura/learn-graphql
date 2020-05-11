---
title: "リレーションシップの作成"
metaTitle: "リレーションシップの作成 | Hasura GraphQL チュートリアル"
metaDescription: "チュートリアルのこの部分では Hasura コンソールを使用して2つのテーブル間のリレーションシップを作成する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/D0QthrXu_Jc" />

外部キー制約が作成されたので Hasura Console はそれに基づいてリレーションシップを自動的に提案します。

`todos` テーブルの下の `Relationships` タブに移動すると、以下のような提案された関係が表示されます。

![Todos Relationships Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-page.png)

提案されたオブジェクト関係で `Add` をクリックします。

リレーションシップ名を `user`（すでに入力済み）として入力し `Save` をクリックします。

![User Object Relationship](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-user.png)

これで todos と users テーブルの間に関係が確立されました。
