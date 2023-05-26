---
title: "開発環境"
metaTitle: "開発環境 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraは、移行とメタデータを活用することで、ローカル開発、ステージング、本番環境など、様々な環境で使用できます。"
---

## ローカル開発 {#local-development}

docker-compose を使用してマシン上でローカルに実行される Hasura インスタンスは、開発環境のセットアップによるものです
。Hasura CLI は、マイグレーションとメタデータの自動管理のためのコンソールとして使用できます。

## ステージング環境 {#staging-environment}

ここでは、ステージング環境を作成して、ローカル環境セットアップ内のスキーマとメタデータを複製します。

ステージング環境には Hasura クラウドを使用します。[Hasura クラウド](https://hasura.io/cloud/) は、拡張性、可用性、安全性
が高く、グローバルに展開し、完全な管理を実現する GraphQL API サービスを提供します。

以下のボタンをクリックして、Hasura クラウドで新しいプロジェクトを作成します。

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

登録してサインインすると以下のウェルカム画面が表示されて、新しい Hasura プロジェクトが自動的に作成されます。

![Hasuraクラウドのウェルカムページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

プロジェクトの初期化が完了したら、ポップアップ画面の `Launch Console` をクリックします。Hasura クラウドのアカウントを既
にお持ちの場合は、画面上部の `+ New Project` をクリックしてから `Launch Console` をクリックします。そうすれば手動で新し
いプロジェクトを作成することができます。

## Hasura コンソール {#hasura-console}

続いてプロジェクトの Hasura コンソールを開きます。以下のような画面が表示されます。

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

続いて Hasura をデータベースと接続します。この設定には、Heroku の Postgres データベース層（無料）を使用できます。Console
の `Data` タブに移動して、 `Connect Database` をクリックします。

データベースに接続するには 2 つの方法があります。

- 既存のデータベースへの接続
- 新しく Heroku データベースを作成する（無料）

ここでは早く先に進めるため、Heroku Postgres を使用して新しい Postgres データベースを一から作成します
。`Create Heroku Database (Free)` タブをクリックすると、 `Create Database` ボタンを選択できるオプションが表示されます
。Heroku アカウントの作成は無料です。

![Heroku データベースの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Heroku にログイン後、 `Create Database` をクリックすると、Hasura クラウドは以下を実行します。

- Heroku 上にアプリを作成する
- Postgres アドオンをインストールする
- Hasura の設定に使用するデータベースの URL を取得する

![HasuraクラウドでのHerokuの設定](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Heroku Postgres への接続と初期化には数秒かかります。Postgres への接続が完了すると Console の Data Manager ページが表示さ
れ、先ほど接続したデータベースの一覧が表示されます。

続いてプロジェクト URL の `https://myproject.hasura.app` をコピーしますが、 `myproject` は、Hasura のプロジェクト名に変
更します。

ターミナルから Hasura のプロジェクトディレクトリに移動します。以下のコマンドを実行します。

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

クラウドプロジェクトの Hasura Console を更新して、データベーススキーマに変更が反映されているか確認します。ここで行う処理
の基本は、スキーマとメタデータを、新しい Hasura インスタンスと新しい Postgres データベースに複製しています。

スキーマをローカルで変更し続けているので、上記の 2 つのコマンドを実行し続ければステージング環境に随時変更を適用できます
。

**注** ：Hasura クラウドでも開発用のプロジェクトの作成が可能です。開発環境とステージング環境を同期させる手順はすべて同じ
です。通常、webhook の URL ハンドラーは、Hasura クラウドがアクセス可能なパブリックエンドポイントに公開する必要があるため
、 `localhost` の URL にはできません。`ngrok` のようなサービスを使用して、Actions/Remote Schemas/Events のために稼働して
いるローカルサーバーを、一般にアクセス可能なエンドポイントで公開することをお勧めします。

## 移行データの高圧縮（Squash） {#squashing-migrations}

データベースの変更が続くと、開発の反復処理でファイルが大量に作成され、移行ディレクトリ内のノイズが増えていきます。機能の
修正が完了したら、修正に関連するすべての移行ファイルを高圧縮（Squash）して 1 つのファイルにまとめたい場合があります
。squash は、Hasura CLI の squash コマンドで実行します。以下のコマンドを実行します。

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

`--from` を適切な値に置き換えます。
