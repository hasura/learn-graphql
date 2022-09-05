---
title: "移行ファイルの管理"
metaTitle: "移行ファイルの管理 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraには、データベーススキーマを管理するための移行システムが組み込まれています。バージョン管理されたインクリメンタルかつリバーシブルな更新を実行するデータベーススキーマ管理は、本番環境で動作するアプリにとって重要なコンポーネントです。"
---

バージョン管理されたインクリメンタルかつリバーシブルな更新を実行するデータベーススキーマ管理は、本番環境で動作するアプリにとって重要なコンポーネントです。Hasura には、データベーススキーマを管理するための移行システムが組み込まれています。

さらに重要なのは、CLI を介して移行ファイルを提供する場合、移行ファイルはコンソール UI によって自動生成される点です。この UI を使うことで、テーブル、カラム、ファンクション、ビューの作成などのスキーマの変更が容易になります。[Hasura がデータベース移行の UI を自動生成するアーキテクチャ](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/) の詳細についてはこちらで紹介します。

この UI は便利ですが、移行ファイルを生成する方法はこれだけではありません。`hasura` CLI では、移行ファイルを手動で作成できます。本チュートリアルでは、スキーマの初期化にこの手順を用いています。

[SQL ファイルをダウンロード](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql) して、以下のコマンドを実行します。

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

SQL ファイルのパスは適切なものに更新します。上記の SQL ファイルと共に移行ファイルが作成されます。Hasura プロジェクトの `migrations` ディレクトリに新しく作成された移行ファイルを確認します。

次に以下のコマンドを実行します。

```bash
hasura migrate apply --database-name default
```

ファイルの順番に従って、 `migrations` ディレクトリ内の移行ファイルが処理されます。

次に、 `http://localhost:9695/console/data` （Data タブ）に移動して、追跡されていないテーブルのリストを確認します。これらのテーブルは、移行の初期に使用した SQL ファイルの一部です。

移行をリセットしたい場合は、ブログ記事 [Resetting Hasura Migrations](https://hasura.io/blog/resetting-hasura-migrations/) に従ってください。

**注** ：Hasura の移行システムの使用は任意です。使い慣れたデータベース移行ツールを他にお持ちなら、引き続きそれを使用してデータベーススキーマを管理できます。CLI が提供するコンソールを使って、Hasura の移行をキャンセルします。Data -> Migrations タブに移動し、 `Allow Postgres schema changes via console` のトグルをオフに切り替えます。
