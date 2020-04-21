---
title: "Hasura のデプロイ"
metaTitle: "Hasura を Heroku にデプロイ | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、ワンクリックデプロイを使用してHerokuにHasura GraphQL Engineをデプロイし、Hasuraコンソールにアクセスする方法について説明します"
---

import YoutubeEmbed from "../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/yOVHEzUiH84" />

Hasura のデプロイを始めましょう。

## Heroku へのワンクリックデプロイ

Hasura を試す最速の方法は Heroku 経由です。

- 次のボタンをクリックして、無料の Postgres アドオンと GraphQL エンジンを Heroku にデプロイします。

    [![Heroku にデプロイ](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

    これにより、HerokuにHasura GraphQL エンジンがデプロイされます。 PostgreSQL データベースは Hasura とともに自動的にプロビジョニングされます。 Heroku にアカウントがない場合は、サインアップする必要があります。
    *注意*: サインアップは無料で、クレジットカードは必要ありません。

![Heroku にデプロイ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/deploy-on-heroku.png)

アプリ名を入力し、選択領域を選択して Deploy app ボタンをクリックします。

## Hasura コンソール

アプリがデプロイされると Heroku ダッシュボードに次のように表示されます。

![Heroku にある Hasura GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/app-deployed-heroku.png)

- Hasura コンソールを開く

    `View` ボタンをクリックしてアプリを開きます。

    または、いつでも `https://<app-name>.herokuapp.com` (*&lt;app-name>をアプリ名に置き換える*) にアクセスして、管理コンソールを開くことができます。

次のようになります:

![Hasura コンソール](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console-initial-load.png)

すごい！これで Hasura GraphQL エンジンがデプロイされ、管理コンソールの準備が整いました!
