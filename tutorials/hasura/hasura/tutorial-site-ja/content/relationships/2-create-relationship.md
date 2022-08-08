---
title: "リレーションシップを作成する"
metaTitle: "リレーションシップを作成する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、Hasuraコンソールを使って2つのテーブル間のリレーションシップを作成する方法を学びます。"
---

これで外部キー制約が作成されたため、Hasuraコンソールがそれに基づき自動的にリレーションシップを提案します。

`todos` テーブルにある `Relationships` タブに移動して、以下の提案されたリレーションシップを確認する必要があります。

![todosリレーションシップページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-page.png)

提案されたオブジェクトリレーションシップで `Add` をクリックします。

`user`（事前に入力済み）としてリレーションシップ名を入力して、`Save` をクリックします。

![ユーザーオブジェクトリレーションシップ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-user.png)

これでtodosとユーザーテーブル間でリレーションシップが確立されます。
