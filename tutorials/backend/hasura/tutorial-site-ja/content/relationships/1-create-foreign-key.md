---
title: "外部キーの作成"
metaTitle: "外部キーの作成 | Hasura GraphQL チュートリアル"
metaDescription: "チュートリアルのこのパートでは Hasura コンソールを使用してテーブル列の外部キーを作成する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/5V7ghxVTQuY" />

`todos` テーブルでは `user_id` カラムの値は、理想的には `users` テーブルの `id` カラムに存在する必要があります。そうしないとデータに一貫性がなくなります。

Postgres ではこの条件を強制する外部キー制約を定義できます。

`todos` テーブルの `user_id` カラムを1つ定義しましょう。

コンソール -> Data -> todos -> Modify ページに行きます。

次のようになります:

![Todos 編集ページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

下にある `Foreign Keys` セクションまでスクロールし `Add` をクリックします。

![user_id 外部キー](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- 参照テーブルを `users` として選択します
- Fromカラムを `user_id` Toカラムを  `id` として選択します

todos テーブルの user_id カラムは users テーブルの id の値の1つでなければならないことを強制しています。

`Save` をクリックして外部キーを作成します。

すごい！ これで、データの整合性が保証されるようになります。
