---
title: "イベントトリガーの作成"
metaTitle: "イベントトリガーの追加 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、コンソールを使用して Hasura GraphQL Engine にイベントトリガーを追加する方法について説明します"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/BKOwSlEdLUY" />

Hasura コンソールを使用して、イベントトリガーを作成できます。

Hasura コンソールを開き Events タブに移動して Create trigger ボタンをクリックし、以下のインターフェイスを開いてイベントトリガーを作成します:

## イベントトリガーを追加

イベントトリガーの名前 (send_emailなど) を指定し `users` テーブルを選択して `insert` 操作を選択します。

`Create` をクリックします。

![イベントトリガーの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-event-trigger.png)

## やってみる

これをテストするには users テーブルに新しい行を挿入する必要があります。

コンソール -> Data -> users -> Insert Row に進み、新しい行を挿入します。

Events タブに移動し `send_email` イベントをクリックして、処理されたイベントを参照します。

![イベントトリガーのテスト](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/test-event-trigger.png)

これで新しい行が `users` テーブルに挿入されるたびに、このイベントが呼び出されます。
