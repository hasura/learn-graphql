---
title: "移行ファイルの管理"
metaTitle: "移行ファイルの管理 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraには、データベーススキーマを管理するための移行システムが組み込まれています。バージョン管理されたインクリメンタルかつリバーシブルな更新を実行するデータベーススキーマ管理は、本番環境で動作するアプリにとって重要なコンポーネントです。"
---

バージョン管理されたインクリメンタルかつリバーシブルな更新を実行するデータベーススキーマ管理は、本番環境で動作するアプリにとって重要なコンポーネントです。Hasuraには、データベーススキーマを管理するための移行システムが組み込まれています。

さらに重要なのは、CLIを介して移行ファイルを提供する場合、移行ファイルはコンソールUIによって自動生成される点です。このUIを使うことで、テーブル、カラム、ファンクション、ビューの作成などのスキーマの変更が容易になります。[Hasuraがデータベース移行のUIを自動生成するアーキテクチャ](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/) の詳細についてはこちらで紹介します。

このUIは便利ですが、移行ファイルを生成する方法はこれだけではありません。`hasura` CLIでは、移行ファイルを手動で作成できます。本チュートリアルでは、スキーマの初期化にこの手順を用いています。

[SQLファイルをダウンロード](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql) して、以下のコマンドを実行します。

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

SQLファイルのパスは適切なものに更新します。上記のSQLファイルと共に移行ファイルが作成されます。Hasuraプロジェクトの `migrations` ディレクトリに新しく作成された移行ファイルを確認します。

次に以下のコマンドを実行します。

```bash
hasura migrate apply --database-name default
```

ファイルの順番に従って、 `migrations` ディレクトリ内の移行ファイルが処理されます。

次に、 `http://localhost:9695/console/data` （Dataタブ）に移動して、追跡されていないテーブルのリストを確認します。これらのテーブルは、移行の初期に使用したSQLファイルの一部です。

移行をリセットしたい場合は、ブログ記事 [Resetting Hasura Migrations](https://hasura.io/blog/resetting-hasura-migrations/) に従ってください。

**注** ：Hasuraの移行システムの使用は任意です。使い慣れたデータベース移行ツールを他にお持ちなら、引き続きそれを使用してデータベーススキーマを管理できます。CLIが提供するコンソールを使って、Hasuraの移行をキャンセルします。Data -> Migrationsタブに移動し、 `Allow Postgres schema changes via console` のトグルをオフに切り替えます。
