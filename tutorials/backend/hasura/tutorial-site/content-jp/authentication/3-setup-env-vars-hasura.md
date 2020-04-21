---
title: "Auth0 で Hasura に接続"
metaTitle: "Auth0 で Hasura に接続 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは Hasura を Auth0 アプリケーションに接続し HASURA_GRAPHQL_JWT_SECRET および HASURA_GRAPHQL_ADMIN_SECRET を使用してアプリを保護する方法を学びます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/86qWv1YU7jA" />

このチュートリアルでは、前のステップで作成した Auth0 アプリケーションに Hasura を接続する方法を学びます。

Auth0 公開鍵を使用するように Hasura を構成する必要があります。 次のリンクからJWT の構成を生成できます - [https://hasura.io/jwt-config](https://hasura.io/jwt-config)

![jwt-config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/generate-jwt-config.png)

生成された設定は、環境変数 `HASURA_GRAPHQL_JWT_SECRET` の値として使用できます。

Heroku に Hasura GraphQL エンジンをデプロイしたので Heroku ダッシュボードに移動して、管理シークレットと JWT シークレットを構成します。

Heroku アプリの「Settings」ページを開き `HASURA_GRAPHQL_JWT_SECRET` という名前の新しい Config Var を追加し、生成された JWT 設定をコピーして値ボックスに貼り付けます。

次に `HASURA_GRAPHQL_ADMIN_SECRET` という名前の新しい設定変数を作成し、秘密鍵を入力して GraphQL エンドポイントを保護します。(これがGraphQLサーバーへのパスワードだと思ってください)。

次のような設定になります:

![Heroku ENV Config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/heroku-env-vars.png)

すごい！これで Hasura GraphQL エンジンが Auth0 を使用して保護されました。
