---
title: "ユーザーへのリレーションシップを作成する"
metaTitle: "ビューから手動のリレーションシップを作成する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、Hasuraコンソールを使って、ビューからテーブルへの手動のリレーションシップを作成する方法を学びます。"
---

ビューが作成されたら、ビューの `id` 列に基づいて、ユーザー情報を取得できるようにする方法が必要です。ビューの `id column` を使って、ビュー `online_users` からテーブル `users` への手動のリレーションシップを作成しましょう。

コンソール -> データ -> online_users -> リレーションシップページに移動します。

リレーションシップのタイプを `Object Relationship` にすることにより、手動で新しいリレーションシップを追加します。リレーションシップ名を `user` として入力します。現在の列の設定を `id` として選択すると、リモートテーブルは `users` になり、リモート列は再度 `id` になります。

現在のビューのid列をユーザーテーブルのid列にマッピングして、リレーションシップを作ります。

![ビューからリレーションシップを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

作成されたリレーションシップ用のGraphQL APIを見てみましょう。

```graphql
query {
  online_users {
    id
    last_seen
    user {
      id
      name
    }
  }
}
```

完璧です。アプリのデータモデリングが完了しました。
