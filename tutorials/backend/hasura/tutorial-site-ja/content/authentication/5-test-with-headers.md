---
title: "Auth0 トークンのテスト"
metaTitle: "Auth0 トークンのテスト | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは Auth0 からトークンを取得し Authorization ヘッダーを使用して GraphQL クエリを実行することにより Hasura で Auth0 設定をテストする方法を学びます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/05-FWc14qi8" />

Hasura は Auth0 で使用するように構成されています。 次に Auth0 からトークンを取得し Authorization ヘッダーを使用して GraphQL クエリを実行して、この設定をテストし、権限が適用されているかどうかを確認します。

JWTトークンを取得するには、

1. このURLを使用して Auth0 にログインします - https://auth0-domain.auth0.com/login?client=client_id&protocol=oauth2&response_type=token%20id_token&redirect_uri=callback_uri&scope=openid%20profile

- auth0-domain を前の手順で作成したドメインに置き換えます。
- client_id を Auth0 アプリケーションの client_id に置き換えます。
- テストのために callback_uri を `http://localhost:3000/callback` に置き換えます。

**注意**: ログインで OIDC 準拠のクライアントに関するエラーが発生した場合は、Advanced Settings -> OAuth でOIDC準拠の設定 (https://auth0.com/docs/api-auth/tutorials/adoption/oidc-conformant) を無効にしてみてください。

**注意**: Auth0アプリの設定の Allowed Callback URLs で http://localhost:3000/callbackが 追加されていることを確認してください。

2. ログインに成功すると https://localhost:3000/callback#xxxxxxxx&id_token=yyyyyyy にリダイレクトされます。 localhost:3000 で実行されているUIがない場合、このページは404になる可能性があります。

3. このURLから id_token 値を抽出します。 これが JWT です。

![jwt-token-auth0-url](https://graphql-engine-cdn.hasura.io/img/id_token-jwt-url.png)

4. このJWTを [jwt.io](https://jwt.io) デバッガーでテストします。
