---
title: "本番対応Auth"
metaTitle: "本番対応認証 | Hasura Auth Slackチュートリアル"
metaDescription: "ここでは、Hasura GraphQLで本番対応できるように、許可リストを設定する方法を学びます。"
---

Hasura GraphQL APIは、アプリの管理者と正規ユーザーの両方に多くのクエリを公開します。この権限は各ロールに対して明確に定義されます。しかし、これらに加えて、実行するクエリのリストを正確に指定できます。

許可リストは、GraphQL Engineがメタデータに保存する安全なクエリ（GraphQLクエリ、ミューテーション、またはサブスクリプション）のリストです。

`HASURA_GRAPHQL_ENABLE_ALLOWLIST` という環境変数によって許可リストを有効にできます。

![リストの環境設定を許可する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/enable-allowlist-env.png)

Slackアプリには、多くのクエリとミューテーションがあり、サーバーが実行できるのはこれらのみです。

例えば、slackアプリに必要なクエリの一部としては、以下が上げられます。

- ユーザーが参加しているワークスペースのリストの取得

```graphql
query {
  users {
    workspaces {
      id
      name
    }
  }
}
```

- ワークスペース内のチャンネルのリストの取得

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp) {
  channel(where: {workspace_id: $workspaceId}) {
    id
    name
    created_by
  }
}
```

これは変数を使用するため、同じクエリが変数に対して異なる値を持つことが許可されることに注意してください。

- チャンネルに投稿されたメッセージのリストの取得

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp, $offset: Int!) {
  channel(where: {workspace_id: $workspaceId}, limit: 20, offset: $offset) {
    id
    name
    channel_threads {
      channel_thread_messages {
        id
        message
      }
    }
  }
}
```
