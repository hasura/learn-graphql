---
title: "移行とメタデータ"
metaTitle: "移行とメタデータ  | Hasura GraphQL上級チュートリアル"
metaDescription: "このセクションでは、ローカル開発環境のセットアップにおけるデータベースの移行とHasuraのメタデータの管理方法を紹介し、データベーススキーマとメタデータの設定について学びます"
---

このセクションでは、ローカルdev環境のセットアップにおけるデータベースの移行とHasuraのメタデータの管理方法を紹介します。

HasuraでGraphQL APIを（再）作成するには2つのコンポーネントが必要です。

- データベーススキーマ
- メタデータ

データベーススキーマは、既存のデータベースのものでも、新しく作成したデータベースのものでも構いません。メタデータには、GraphQL APIおよび、パーミッション、イベント、アクション、リモートスキーマといったHasuraの様々なコンポーネントが記述されます。

Hasuraは、データベース全体のGraphQL APIを自動的に作成するわけではありません。GraphQLで公開するテーブル/ビュー/機能は指定する必要があり、この情報はメタデータの一部になります。

このデモでは、Slackクローンのデータベーススキーマを使用します。その前に、ローカル開発環境でHasuraを起動します。

## docker-composeによるHasuraの起動 {#running-hasura-via-docker-compose}

Hasuraをローカルで実行するための最も簡単なセットアップは、docker-composeセットアップを使用して、graphql-engineとpostgresの両方のdockerコンテナを実行することです。

ドキュメントを参照して、 [ docker-composeを使用したHasuraのローカルセットアップ ](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/#step-1-get-the-docker-compose-file) を実行します。

Hasuraのローカルセットアップが完了したら、 `http://localhost:8080` からコンソールにアクセスできるようになります。

![ Hasura Console OSS ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-console-oss-local.png)