---
title: "認証モード"
metaTitle: "認証モード | Hasura Auth Slackチュートリアル"
metaDescription: "ここでは、適切な認証モードを選択する方法を学びます"
---

ここでは、認証のためのさまざまなモードについて紹介します。認証は、Hasura外で処理されます。独自のAuthサーバーを取り込んで、Hasuraと統合できます。大きく2つのオプションがあります。

- JWTモード
- ウェブフックモード

## JWTモード {#jwt-mode}

JWT承認モードを使用して、すべての受信した要求を承認するように、GraphQL Engineを設定することができます。認証サーバーは、要求に関するメタデータを承認して取得するため、GraphQL Engineによってデコードおよび検証された有効なJWTトークンを返してくれるはずです。

JWTを発行するAuthサーバーがある典型的なアーキテクチャは、以下のようになります。

![JWTモード](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/jwt-mode.png)

Authサーバーは、関連する `x-hasura-*` クレームを含むJWTトークンをアプリに発行すると、そのアプリはそのトークンをHasura GraphQL Engineに送信します。その後、Hasuraは、クレームを検証して要求が通るようにします。

## ウェブフックモード {#webhook-mode}

GraphQL Engineがウェブフックモードを使用するように設定することもできます。認証サーバーはウェブフックを公開します。ウェブフックは、Hasura GraphQL Engineサーバーが受信したすべての要求を認証するため、そして、アクセス制御ルールを評価する要求に関するメタデータを取得するために使用されます。

ウェブフック付きのアーキテクチャーは、以下のようになります。

![ウェブフックモード](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/webhook-mode.png)

### 未認証モード {#unauthenticated-mode}

ユーザーがログインしていなくても、データへのアクセスを許可したい場合があります。未承認モードは、すべてのユーザーに対して開かれているパブリックフィードに便利です。Slackアプリは、これをユースケースとすることはありませんが、どんなときに使用されるかを知っておくのは良いことです。
