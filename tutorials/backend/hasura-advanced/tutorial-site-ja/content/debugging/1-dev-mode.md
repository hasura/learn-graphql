---
title: "開発モード"
metaTitle: "開発モード | Hasura GraphQL上級者向けチュートリアル"
metaDescription: "カスタムコードが記述されたローカル開発では、Hasura Actionsのようなカスタムコードハンドラーによるwebhookコールの詳細を確認したい場合があります。"
---

カスタムコードが記述されたローカル開発では、Hasura Actionsのようなカスタムコードハンドラーによるwebhookコールの詳細を確認したい場合があります。

## 開発モード {#enable-dev-mode} の有効化

Hasuraクラウドのダッシュボードのプロジェクト設定から新しい環境変数を追加します。

新しい環境変数は、 `HASURA_GRAPHQL_DEV_MODE` で、ブーリアン値はtrueとします。

![ 開発モードの有効化 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

このモードが有効になると、レスポンスの `errors` オブジェクトに `extensions` キーが追加されます。この `internal` キーには、生成されたSQLステートメントやPostgresからの例外情報などのエラー情報が含まれます。

この開発モードは、開発/ステージング環境でのみ有効化し、 `admin` 権限のみで有効にすることを強くお勧めします。この拡張機能を管理者権限のみで有効にするには、`true`  の値を持つ  `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS`ブーリアンという新しい環境変数を追加します。
