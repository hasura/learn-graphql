---
title: "Auth0トークンで試す"
metaTitle: "Auth0 JWTトークンで試す | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、Auth0からトークンを取得して、承認ヘッダーを使用してGraphQLクエリを作成することで、HasuraでAuth0セットアップを試す方法について学びます。"
---

Hasuraは、Auth0で使用するように設定されています。ここで、Auth0からアクセストークンを取得し、承認ヘッダーを使用してGraphQLクエリを作成することで、この設定を試し、権限が適用されているかどうか確認してみましょう。

テスト用JWTトークンを取得するため、Auth0で拡張機能を設定します。

1. [認証APIデバッガ拡張機能](https://auth0.com/docs/extensions/authentication-api-debugger-extension)をインストールします。これにより、アクセストークンの設定と生成が可能になります。

この拡張機能をインストールする手順は以下の通りです。

[Auth0ダッシュボード](https://manage.auth0.com/#)の[拡張](https://manage.auth0.com/#/extensions)ページに移動します。

![Auth0拡張デバッガ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-extensions-debugger.png)

Auth0認証APIデバッガボックスをクリックします。拡張機能をインストールのウィンドウが開きます。インストールをクリックします。

2. 拡張機能を承認します

拡張機能がインストールされたら、`Installed Extensions` タブでクリックできます。URLは、`https://<auth0-domain>.<region>.webtask.run/auth0-authentication-api-debugger` と同様になります。

Auth0 UIでサインインを使用してログインするように促されます。必ず、Auth0アカウントを最初に作成した際に使用した資格情報でログインしてください。この手順では、基本的に拡張機能の使用を承認して、アプリのクライアント詳細を読み取れるアクセス権を許可します。

![Auth0アプリを承認する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authorize-auth0-app.png)

アプリを承認したら、デバッガページが表示されます。

3. Auth0アプリケーションを設定する

APIデバッガページで、チュートリアルで前に作成したアプリの名前を選択します。

![Auth0 APIデバッガ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-api-debugger.png)

今度は、そこに記載されたコールバックURLをコピーします。Auth0アプリケーションページに移動して、アプリの設定に移動し、「許可されたコールバックURL」にURLを追加します。

4. オーディエンスを設定する

設定の横にあるOAuth2 / OIDCタブに切り替えて、下にスクロールして、オーディエンス値を設定します。

![Auth0オーディエンス](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/configure-audience.png)

オーディエンス値を `https://hasura.io/learn` として入力して、その隣の `Use Audience` オプションを切り替えます。
覚えている場合、前の手順の1つで上記のオーディエンス値を持つAPIを作成しました。

5. Auth0認証APIデバッガの拡張機能設定に戻ります。ユーザーフローの下でOAuth2 / OIDCログインボタンをクリックします。これにより、ユーザーとしてログインするよう促されます。任意のアカウントでこのUIにサインアップして、正常にログインすると、JSON応答が表示された認証デバッガページに戻ります。

![認証デバッガアクセストークン](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-debugger-access-token.png)

ハッシュフラグメントセクションで、オブジェクト内の `access_token` キーを参照できます。

5. JWTを試す

デバッガは、キー `https://hasura.io/jwt/claims` の下でHasuraのために設定されたJWTクレームを含むデコードされたペイロードを与えてくれます。これで、このオブジェクト内で、ロール情報が `x-hasura-role` キーで使用可能になり、user-id情報が `x-hasura-user-id` キーで使用可能になります。

これから、認証された要求を作成するためにこのaccess_tokenを使用できます。HasuraコンソールGraphiQLタブで、このような要求を行うためのヘッダー `Authorization: Bearer <access_token>` を追加できます。
