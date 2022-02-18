---
title: "開発環境"
metaTitle: "開発環境 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraは、移行とメタデータを活用することで、ローカル開発、ステージング、本番環境など、様々な環境で使用できます。"
---

## ローカル開発 {#local-development}

docker-composeを使用してマシン上でローカルに実行されるHasuraインスタンスは、開発環境のセットアップによるものです。Hasura CLIは、マイグレーションとメタデータの自動管理のためのコンソールとして使用できます。

## ステージング環境 {#staging-environment}

ここでは、ステージング環境を作成して、ローカル環境セットアップ内のスキーマとメタデータを複製します。

ステージング環境にはHasuraクラウドを使用します。[Hasuraクラウド](https://hasura.io/cloud/) は、拡張性、可用性、安全性が高く、グローバルに展開し、完全な管理を実現するGraphQL APIサービスを提供します。

以下のボタンをクリックして、Hasuraクラウドで新しいプロジェクトを作成します。

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

登録してサインインすると以下のウェルカム画面が表示されて、新しいHasuraプロジェクトが自動的に作成されます。

![Hasuraクラウドのウェルカムページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

プロジェクトの初期化が完了したら、ポップアップ画面の `Launch Console` をクリックします。Hasuraクラウドのアカウントを既にお持ちの場合は、画面上部の `+ New Project` をクリックしてから `Launch Console` をクリックします。そうすれば手動で新しいプロジェクトを作成することができます。

## Hasura コンソール {#hasura-console}

続いてプロジェクトのHasura コンソールを開きます。以下のような画面が表示されます。

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

続いてHasuraをデータベースと接続します。この設定には、HerokuのPostgresデータベース層（無料）を使用できます。Consoleの `Data` タブに移動して、 `Connect Database` をクリックします。

データベースに接続するには2つの方法があります。

- 既存のデータベースへの接続
- 新しくHerokuデータベースを作成する（無料）

ここでは早く先に進めるため、Heroku Postgresを使用して新しいPostgresデータベースを一から作成します。`Create Heroku Database (Free)` タブをクリックすると、 `Create Database` ボタンを選択できるオプションが表示されます。Herokuアカウントの作成は無料です。

![Heroku データベースの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Heroku にログイン後、 `Create Database` をクリックすると、Hasuraクラウドは以下を実行します。

- Heroku上にアプリを作成する
- Postgresアドオンをインストールする
- Hasuraの設定に使用するデータベースのURLを取得する

![HasuraクラウドでのHerokuの設定](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Heroku Postgresへの接続と初期化には数秒かかります。Postgresへの接続が完了するとConsoleのData Managerページが表示され、先ほど接続したデータベースの一覧が表示されます。

続いてプロジェクトURLの `https://myproject.hasura.app` をコピーしますが、 `myproject` は、Hasuraのプロジェクト名に変更します。

ターミナルからHasuraのプロジェクトディレクトリに移動します。以下のコマンドを実行します。

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

クラウドプロジェクトのHasura Consoleを更新して、データベーススキーマに変更が反映されているか確認します。ここで行う処理の基本は、スキーマとメタデータを、新しいHasuraインスタンスと新しいPostgresデータベースに複製しています。

スキーマをローカルで変更し続けているので、上記の2つのコマンドを実行し続ければステージング環境に随時変更を適用できます。

**注** ：Hasuraクラウドでも開発用のプロジェクトの作成が可能です。開発環境とステージング環境を同期させる手順はすべて同じです。通常、webhookのURLハンドラーは、Hasuraクラウドがアクセス可能なパブリックエンドポイントに公開する必要があるため、 `localhost` のURLにはできません。`ngrok` のようなサービスを使用して、Actions/Remote Schemas/Eventsのために稼働しているローカルサーバーを、一般にアクセス可能なエンドポイントで公開することをお勧めします。

## 移行データの高圧縮（Squash） {#squashing-migrations}

データベースの変更が続くと、開発の反復処理でファイルが大量に作成され、移行ディレクトリ内のノイズが増えていきます。機能の修正が完了したら、修正に関連するすべての移行ファイルを高圧縮（Squash）して1つのファイルにまとめたい場合があります。squashは、Hasura CLIのsquashコマンドで実行します。以下のコマンドを実行します。

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

`--from` を適切な値に置き換えます。
