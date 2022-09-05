---
title: "イベントトリガーを作成する"
metaTitle: "イベントトリガーを追加する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、コンソールを使用してHasura GraphQL Engineにイベントトリガーを追加する方法を紹介します。"
---

イベントトリガーは、Hasuraコンソールを使用して作成できます。

Hasuraコンソールを開いてイベントタブに移動し、トリガー作成ボタンをクリックし、以下のインターフェースを開いてイベントトリガーを作成します。

## イベントトリガーを追加する {#add-event-trigger}

イベントトリガーに名前を付けて（send_emailなど）、テーブル `users` を選択し、操作 `insert` を選択します。

`Create` をクリックします。

![イベントトリガーを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-event-trigger.png)

## 試してみましょう {#try-it-out}

これをテストするには、新しい行をユーザーテーブルに挿入する必要があります。

コンソール -> データ -> ユーザー -> 行を挿入に移動し、新しい行を挿入します。

次に、イベントタブに移動し、`send_email` イベントをクリックして、処理されたイベントを参照します。

![イベントトリガーをテストする](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/test-event-trigger.png)

これで、新しい行が `users` テーブルに挿入されるたびに、このイベントが呼び出されます。
