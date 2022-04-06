---
title: "Auth0アプリを作成する"
metaTitle: "Auth0アプリを作成する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、シングルページウェブアプリケーションにダッシュボードを使って、Auth0アプリを作成する方法を学びます。"
---

1. [Auth0ダッシュボード](https://manage.auth0.com/)に移動する
2. サインアップする / アカウントにログインする
3. 新しいテナントを作成します。
4. 左側の `Applications` メニューオプションをクリックして、`+ Create Application` ボタンをクリックします。
5. アプリケーションを作成ウィンドウで、アプリケーションに名前を付けて、`Single Page Web Applications` を選択します。（フロントエンドアプリがreact/vueなどで構築されたSPAになると想定しています）

![Auth0アプリを作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

## Auth0 API {#create-auth0-api} を作成する

`accessToken` を有効なJWTにできるように、Auth0にAPIを作成する必要があります。左側のサイドバーの `APIs` セクションをクリックして、 `+ Create API` ボタンをクリックします。

![Auth0 API を作成する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

表示されたポップアップで、APIと識別子の名前を入力します。技術的に任意の値を与えることができます。

名前が `hasura` で、識別子が `https://hasura.io/learn` であるとします。

![Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

署名アルゴリズムをそのままにすることができます。（RS256）

完了したら、作成をクリックします。
