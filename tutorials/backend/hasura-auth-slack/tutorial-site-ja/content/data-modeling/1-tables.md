---
title: "slackクローン用テーブル"
metaTitle: "テーブル | Hasura Auth Slackチュートリアル"
metaDescription: "slackクローン用データモデリング"
---

まずはデータモデルを見てみましょう。

## ユーザー {#users}

アプリの主な機能は、ユーザーとメッセージを中心に展開します。

そのため、以下のテーブルがあります。

- `users` と `user_message`

## ワークスペース {#workspace}

Slackアプリには、ユーザーが参加できるワークスペースがあります。これは、ワークスペースの所有者と管理者によって管理されます。以下のテーブルは、この要件を処理します。

- `workspace`、`workspace_member`、`workspace_user_type`

## チャンネル {#channel}

各ワークスペースは、ワークスペースからメンバーのサブセットを招いて、特定のディスカッションのトピックを対象にしたチャンネルを設定できます。チャンネルのメンバーは、誰もが見ることができるチャンネルにメッセージを投稿できます。

- `channel`、`channel_member`、`channel_thread`、`channel_thread_message`

最期のモデルには、基本的な関連列があり、おおむね以下のようになります。

![Slackデータモデル](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-datamodel.png)

詳細な列リストはありませんが、エンティティ間のリレーションシップの把握に役立ちます。
