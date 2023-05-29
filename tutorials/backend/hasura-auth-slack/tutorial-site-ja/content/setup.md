---
title: "Hasuraをデプロイする"
metaTitle: "HasuraクラウドにHasuraをデプロイする | Hasura Auth Slackチュートリアル"
metaDescription:
  "このチュートリアルでは、ワンクリックデプロイを使ってHasura GraphQL
  Engineをデプロイする方法を学び、Hasuraコンソールにアクセスする方法を学びます。"
---

Hasura をデプロイしてみましょう。

## Hasura クラウドでのワンクリックデプロイ {#one-click}

Hasura を試す最も早い方法は Hasura クラウドを使うことです。[ Hasura クラウド ](https://hasura.io/cloud/) は、拡張性、可
用性、安全性が高く、グローバルに展開し、完全な管理を実現する GraphQL API サービスを提供します。

以下のボタンをクリックして、Hasura クラウドで新しいプロジェクトを作成します。

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**注**：サインアップは無料で、クレジットカードは必要ありません。

登録してサインインすると以下のウェルカム画面が表示されて、新しい Hasura プロジェクトが自動的に作成されます。

![ Hasuraクラウドのウェルカムページ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

プロジェクトの初期化が完了したら、ポップアップ画面の `Launch Console` をクリックします。Hasura クラウドのアカウントを既
にお持ちの場合は、画面上部の `+ New Project` をクリックしてから `Launch Console` をクリックします。そうすれば手動で新し
いプロジェクトを作成することができます。

## Hasura コンソール {#hasura-console}

続いて Hasura Console でプロジェクトを開きます。以下のような画面が表示されます。

![ Hasuraコンソール ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

続いて Hasura をデータベースと接続します。この設定には、Heroku
の[Postgres データベース](https://hasura.io/learn/database/postgresql/what-is-postgresql/)層（無料）を使用できます。コン
ソールの `Data` タブに移動して、`Connect Database` をクリックします。

データベースに接続するには 2 つの方法があります。

- 既存のデータベースへの接続
- 新しく Heroku データベースを作成する（無料）

ここでは早く先に進めるため、Heroku Postgres を使用して新しい Postgres データベースを一から作成します
。`Create Heroku Database (Free)` タブをクリックすると、 `Create Database` ボタンを選択するオプションが表示されます
。Heroku アカウントの作成は無料です。

![Heroku データベースの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Heroku にログイン後、`Create Database` をクリックすると、Hasura クラウドは以下を実行します。

- Heroku 上にアプリを作成する
- [Postgres アドオンをインストールする](https://hasura.io/learn/database/postgresql/installation/installing-postgresql/)
- Hasura の設定に使用するデータベースの URL を取得する

![ HasuraクラウドでのHerokuの設定 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Heroku Postgres への接続と初期化には数秒かかります。Postgres への接続が完了するとコンソールの Data Manager ページが表示
され、先ほど接続したデータベースの一覧が表示されます。

また、Hasura クラウドダッシュボードからプロジェクトを管理できます。

![Hasuraクラウドプロジェクトページ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

完璧です。これで Hasura をデプロイして、データベースに接続して、管理コンソールを使えるようになりました！
