---
title: "Hasura CLI"
metaTitle: "Hasura CLI | Hasura GraphQL上級チュートリアル"
metaDescription: "プロジェクトをローカルで管理するために、Hasura CLIを使用します。空のフォルダで以下のコマンドを実行します"
---

## Hasura CLIのインストール {#install-hasura-cli}

プラットフォームに応じて、ドキュメントの手順に従って [ Hasura CLIをインストール ](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/) します。

プロジェクトをローカルで管理するために、Hasura CLIを使用します。空のフォルダで以下のコマンドを実行します。

```bash
hasura init
```

これにより、指定されたディレクトリ（デフォルトでは `hasura` ）の下に新しいプロジェクト構造がローカルで作成されます。ディレクトリ構造は以下の通りです。

```
├── config.yaml
├── metadata
│   ├── actions.graphql
│   ├── actions.yaml
│   ├── allow_list.yaml
│   ├── cron_triggers.yaml
│   ├── databases
│   │   └── databases.yaml
│   ├── query_collections.yaml
│   ├── remote_schemas.yaml
│   └── version.yaml
├── migrations
└── seeds
```

`migrations` と `seeds` のディレクトリは初期状態では空です。`metadata` のディレクトリには、アクション、リモートスキーマ、およびプロジェクトに接続されている様々なデータベースや、そのテーブルおよび関数など、GraphQL APIを構成する様々な要素を記述した一連のyamlファイルが格納されています。

docker-compose経由でHasuraをローカルで実行するため、以下のコマンドを実行します

```bash
hasura console
```

これにより、 `http://localhost:9695` のコンソールが起動し、 `http://localhost:8080` のサーバーコンソールと同じGUIが表示されます。
