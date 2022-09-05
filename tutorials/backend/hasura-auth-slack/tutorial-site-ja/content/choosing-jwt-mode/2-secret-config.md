---
title: "JWTシークレットの設定"
metaTitle: "JWTシークレットの設定 | Hasura Auth Slackチュートリアル"
metaDescription: "ここでは、適切な認証モードを選択する方法を学びます"
---

ここでは、JWTシークレットを設定する方法を紹介します。

[ここ](https://github.com/hasura/learn-graphql/tree/master/services/backend/auth-server)での指示に従って、Authサーバーを設定します。

### GraphQL Engine {#authenticate-jwt} を使ってJWTを認証する

GraphQL EngineにはJWT認証が組み込まれています。環境変数 `HASURA_GRAPHQL_JWT_SECRET` を使用したJWT認証サーバーと同じシークレット/キーでエンジンを起動する必要があります。詳細については[ドキュメント](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#running-with-jwt)をご覧ください

また、`HASURA_GRAPHQL_ADMIN_SECRET` 環境変数を設定する必要があります。これを、管理者がプロジェクトを管理するためのパスワードのようなものと考えましょう。[詳細については](https://hasura.io/docs/latest/graphql/cloud/projects/env-vars/)、Hasuraクラウドプロジェクトで新しい環境変数を設定する方法をご覧ください。

上記のトークンを使用したCURLコマンドのサンプルは以下の通りです。

```bash
curl -X POST \
  https://ready-panda-91.hasura.app/v1/graphql \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QxMjMiLCJpYXQiOjE1NDAzNzY4MTUuODUzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZWRpdG9yIiwidXNlciIsIm1vZCJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9fQ.w9uj0FtesZOFUnwYT2KOWHr6IKWsDRuOC9G2GakBgMI' \
  -H 'Content-Type: application/json' \
  -d '{ "query": "{ users { id } }" }'
```

これで、コンソールに移動して、管理者シークレットなしでクエリを実行することで、テストすることができます。理想的にはエラーが発生するはずです。
