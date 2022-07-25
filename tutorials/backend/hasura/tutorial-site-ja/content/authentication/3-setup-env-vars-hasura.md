---
title: "HasuraをAuth0に接続する"
metaTitle: "HasuraをAuth0に接続する | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、HasuraをAuth0アプリケーションに接続し、Hasura_GRAPHQL_JWT_SECRETでアプリを保護する方法を学びます"
---

ここでは、前のステップで作成したAuth0アプリケーションにHasuraを接続する方法を学びます。

その前に管理者シークレットでエンドポイントを保護する必要があります。GraphQLエンドポイントが開き、誰でもデータのクエリと管理が可能です。Hasuraクラウドプロジェクトに管理者シークレットを追加する方法に関する[ドキュメントをご覧ください](https://hasura.io/docs/latest/graphql/cloud/projects/secure/#adding-an-admin-secret))。

管理者シークレットが追加されたら、HasuraがAuth0公開鍵を使用するように設定する必要があります。JWTの設定を生成する簡単な方法は、このリンク（[https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)）を使用することです。

![jwt-config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/generate-jwt-config.png)

生成された設定は、環境変数 `HASURA_GRAPHQL_JWT_SECRET` に対する値として使用できます。

Hasuraクラウドダッシュボードを開いて、Hasuraクラウドプロジェクトの「Env vars」ページに移動します。

![Hasura ENV設定](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

`+ New Env Var` をクリックして新しい環境変数を追加します。

`HASURA_GRAPHQL_JWT_SECRET` という新しい Config Varを追加して、生成されたJWT設定を値ボックスにコピーアンドペーストします。

以下のようになります。

![新しい環境クラウドを追加する](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-env-cloud.png)

`Add` をクリックすると、環境変数がプロジェクトに適用されます。

完璧です。これでHasuraインスタンスがAuth0を使って保護されます。
