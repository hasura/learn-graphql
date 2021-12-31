---
title: "データモデリング"
metaTitle: "Hasuraによるデータモデリング | Hasura GraphQLチュートリアル"
metaDescription: "このチュートリアルでは、Postgresでデータモデリングを行う方法と、Hasuraコンソールを使ってテーブルを作成する方法を学びます。"
---

コースのこのパートでは、リアルタイムtodoアプリのデータモデルを構築します。todoアプリには以下の機能があります。

- ユーザーはパーソナルtodosを維持できます
- ユーザーはパブリックtodosを表示できます
- アプリを使用している現在オンラインのユーザーのリスト
- ユーザーがサインアップしたときにメールを送信します

広い意味で、このアプリには2つの主なモデルがあります。それは、`users` と `todos` の 2 つで、それぞれに独自のプロパティがあります。

以降のステップで見ていきます。

最後のモデルを以下に示します。

![スキーマtodoアプリ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

[コンソールを使用して、またはpostgresで直接、テーブルを作成](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/)する際、Hasura GraphQL EngineがGraphQLスキーマオブジェクトタイプと、それに対応するクエリ/ミューテーションフィールドをリゾルバーで自動的に作成します。
