---
title: "基本的なデータモデル"
metaTitle: "Hasura を使った基本的なデータモデル | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、Postgresで基本的なデータモデリングを行い、Hasura コンソールを使用してテーブルを作成する方法を説明します。"
---

import YoutubeEmbed from "../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/XURdIpvfp4M" />

コースのこの部分では、リアルタイムの ToDo アプリのデータモデルを構築します。この todo アプリには以下の機能があります:

- ユーザーは自分のタスクを管理できる
- ユーザーは公開された ToDo を閲覧できる
- アプリを使用している現在のオンラインユーザーのリスト
- ユーザーがサインアップしたときにメールを送信する

これはおおまかに、このアプリには `users` と `todos` の2つのモデルがあり、それぞれに独自のプロパティセットが紐付いています。

以降のステップでそれらについて説明します。

最終的なモデルは次のようになります:

![Todo アプリスキーマ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

コンソールを使用するか直接 postgres でテーブルを作成すると、Hasura GraphQL エンジンは GraphQL スキーマオブジェクトタイプと対応するクエリ/ミューテーションフィールドをリゾルバーで自動的に作成します。
