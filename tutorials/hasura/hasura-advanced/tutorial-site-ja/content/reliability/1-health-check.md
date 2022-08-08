---
title: "ヘルスチェック"
metaTitle: "ヘルスチェック | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraは、GraphQL APIの状態を監視するヘルスチェックエンドポイントを提供します。これは、 ` /healthz ` の下にあるすべてのHasuraプロジェクト（OSS GraphQLエンジンを含む）のエンドポイントで機能します。"
---

Hasuraは、GraphQL APIの状態を監視するヘルスチェックエンドポイントを提供します。これは、 `/healthz` の下にあるすべてのHasuraプロジェクト（OSS GraphQLエンジンを含む）のエンドポイントで機能します。

`/healthz` にあるエンドポイントの `GET` 要求を出してステータスを取得します。

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz
```

advanced-hasuraをプロジェクト名に置き換えます。

ステータスは以下のいずれかになります。

- `200, OK` - 対応は不要です。すべてが期待通りに動作しています。
- `200, WARN, inconsistent objects in schema` - 一貫性のないオブジェクトが一部確認されました。メタデータの見直しが必要です。通常、間違ったオブジェクトを持つメタデータが適用された場合に出力されます。
- `500, ERROR` - APIが動作していないことを意味しており、ログを確認する必要があります。
