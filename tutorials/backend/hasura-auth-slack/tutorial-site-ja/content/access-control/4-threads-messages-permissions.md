---
title: "スレッドとメッセージの権限"
metaTitle: "スレッドとメッセージの権限 | Hasura Auth Slackチュートリアル"
metaDescription: "ここでは、アプリのスレッドとメッセージの権限を作成する方法を学びます。"
---

すべての基本テーブル（`users`、`workspace`、`channel`）のルールが完了しました。slackの主な部分は、ユーザーがチャンネルや他のユーザーとのメッセージの送受信を行うためのものです。これがどのようにアクセス制御ルールに適用されるかを見ていきましょう。

`channel_thread` と `channel_thread_message` テーブルから始めましょう。

## 権限 {#select-permission} を選択します

任意のチャンネルに投稿されたメッセージにアクセスできるユーザーをリストダウンする必要があります。要件は以下のようになります。

- チャンネルメンバーであるすべてのユーザーが、すべてのチャンネルスレッドにアクセスできるようにする必要があります。

### 行レベル選択 {#row-level-select}

`channel_thread` 用の式は、以下の内容に大まかに翻訳されます。

```json
{
  "channel": {
    "channel_members": {
      "user_id": {
        "_eq": "X-Hasura-User-Id"
      }
    }
  }
}
```
この式は、`channel_thread_message` に対して若干異なります。これはネストのレベルが1つ多いためです。

```json
{
  "channel_thread": {
    "channel": {
      "channel_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  }
}
```

### 列レベル選択 {#column-level-select}

ユーザーがアクセスすると想定される行を除外した後、読み取りが許可されるフィールドを除外する必要があります。特定のタイプのユーザーのみに制限する必要がある機密データはないため、すべての列に選択する権限を与えます。

読み取りアクセスが完了しました。次に、ユーザーがチャンネルを作成、更新、または削除できる書き込みアクセスを紹介します。

## 権限を挿入する {#insert-permission}

ワークスペースに参加している認証済みユーザーは誰でも、ワークスペースのチャンネルにメッセージを投稿できます。`channel_thread` テーブルの上記と同じ式に変換します。

## 権限 {#update-permission} を更新する

ユーザーは `channel_thread` を更新できません。では、`channel_thread_message` テーブル内の既存のメッセージを更新できるのは誰でしょうか？

- 認証済みユーザーは、すべてのチャンネルに投稿された自分のメッセージを更新できます。

### 行レベル更新 {#row-level-update}

上記の条件は、以下の式になります。

```json
{
  "user_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### 列レベル更新 {#column-level-update}

ユーザーは、`channel_thread_message` テーブルの `message` 列のみ更新できます。

## 権限を削除する {#delete-permission}

メッセージを作成したユーザーは、自分のメッセージを削除できます。更新操作で定義した同じ式に変換します。

再び前述のステップのように、CASCADE削除を適用して、すべての依存データおよびぶら下がったデータを削除できます。

