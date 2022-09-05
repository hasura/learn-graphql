---
title: "認証と承認"
metaTitle: "認証と承認 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraによる認証は、JWT、ウェブフック、未認証のパブリックアクセスを使って実装できます。Hasuraによる承認は、ロールベースの権限を使って実装できます。"
---

Hasuraによる認証は、以下の方法で実装できます。

- [ JWT ](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/)
- [ Webhooks ](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook/)
- [ 未認証のパブリックアクセス ](https://hasura.io/docs/latest/graphql/core/auth/authentication/unauthenticated-access/)

上記のすべてのケースにおいて、最初に `admin secret` を設定することが重要です。

Hasuraによる承認は、以下の方法で実装できます。

- ロールベースの権限を、それぞれのロール、スキーマ、テーブル、操作タイプごとに実装
- 挿入、選択、更新、削除にロールアクセスルール（レコードとフィールド）を設定

[ 認証 ](https://hasura.io/learn/graphql/hasura/authentication/) と [ 承認 ](https://hasura.io/learn/graphql/hasura/authorization/) については、Hasura基本チュートリアルで説明しています。そちらをご覧ください。

このチュートリアルで使用したslackモデルについては、 [ Slack承認チュートリアル ](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/) でロールベースの権限を設定する方法を初めから説明しています。
