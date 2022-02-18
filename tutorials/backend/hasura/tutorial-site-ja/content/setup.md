---
title: "Hasuraをデプロイする"
metaTitle: "HasuraクラウドにHasuraをデプロイする | Hasura GraphQLチュートリアル"
metaDescription: "このチュートリアルでは、ワンクリックデプロイを使ってHasuraクラウドにHasura GraphQL Engineをデプロイする方法を学び、Hasuraコンソールにアクセスする方法を学びます。"
---

Hasuraをデプロイしてみましょう。

## Hasuraクラウドでのワンクリックデプロイ {#one-click-deployment}

Hasuraを試す最も早い方法はHasuraクラウドを使うことです。[ Hasuraクラウド ](https://hasura.io/cloud/) は、拡張性、可用性、安全性が高く、グローバルに展開し、完全な管理を実現するGraphQL APIサービスを提供します。

以下のボタンをクリックして、Hasuraクラウドで新しいプロジェクトを作成します。

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**注**：サインアップは無料で、クレジットカードは必要ありません。

登録してサインインすると以下のウェルカム画面が表示されて、新しいHasuraプロジェクトが自動的に作成されます。

![ Hasuraクラウドのウェルカムページ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

プロジェクトの初期化が完了したら、ポップアップ画面の `Launch Console` をクリックします。Hasuraクラウドのアカウントを既にお持ちの場合は、画面上部の `+ New Project` アクションをクリックしてから `Launch Console` をクリックします。そうすれば手動で新しいプロジェクトを作成することができます。

## Hasuraコンソール {#hasura-console}

続いてプロジェクトのHasura Consoleを開きます。以下のような画面が表示されます。

![ Hasuraコンソール ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

続いてHasuraをデータベースと接続します。この設定には、Herokuの[Postgresデータベース](https://hasura.io/learn/database/postgresql/what-is-postgresql/) 層（無料）を使用できます。コンソールの `Data` タブに移動して、`Connect Database` をクリックします。

データベースに接続するには2つの方法があります。

- 既存のデータベースへの接続
- 新しくHerokuデータベースを作成する（無料）

ここでは早く先に進めるため、Heroku Postgresを使用して新しいPostgresデータベースを一から作成します。`Create Heroku Database (Free)` タブをクリックしてから、 `Create Database` をクリックします。Herokuアカウントの作成は無料です。

![Heroku データベースの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Heroku にログイン後、`Create Database` をクリックすると、Hasuraクラウドは以下を実行します。

- Heroku上にアプリを作成する
- [Postgresアドオンをインストールする](https://hasura.io/learn/database/postgresql/installation/installing-postgresql/)
- Hasuraの設定に使用するデータベースのURLを取得する

![ HasuraクラウドでのHerokuの設定 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Heroku Postgresへの接続と初期化には数秒かかります。Postgresへの接続が完了するとコンソールのData Managerページが表示され、先ほど接続したデータベースの一覧が表示されます。

また、Hasuraクラウドダッシュボードからプロジェクトを管理できます。

![Hasuraクラウドプロジェクトページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

完璧です。これでHasuraをデプロイして、データベースに接続して、管理コンソールを使えるようになりました！
