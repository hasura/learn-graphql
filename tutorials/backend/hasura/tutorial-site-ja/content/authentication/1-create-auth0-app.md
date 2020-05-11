---
title: "Auth0 アプリの作成"
metaTitle: "Auth0 アプリの作成 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、シングルページWebアプリケーションのダッシュボードを使用してAuth0アプリを作成する方法を学びます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/BXJk0wao42U" />

1. [Auth0 ダッシュボード](https://manage.auth0.com/) に行きます。
2. サインアップかアカウントへのログイン
3. 新しいテナントを作成します。
4. 左側の `Applications` メニューオプションをクリックし `Create Application` ボタンをクリックします。
5. Create Application ウィンドウで、アプリケーションの名前を設定し `Single Page Web Applications` を選択します。（フロントエンドアプリがreactやvueなどに基づいて構築されたSPAであると想定）

![Create Auth0 App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

6. アプリケーションの設定で、適切な(例: http://localhost:3000/callback) Allowed Callback URLs(許可されたコールバックURL)とAllowed Web Origins(許可されたWebオリジン)を追加します。 アプリが機能するように、ドメイン固有のURLを追加することもできます。(例: https://myapp.com/callback)。

これが後でデプロイするフロントエンドアプリのURLになりますが、とりあえずは無視しても大丈夫です。後で戻って必要なURLを追加できます。
