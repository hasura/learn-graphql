---
title: "移行を適用する"
metaTitle: "移行を適用する | Hasura Auth Slackチュートリアル"
metaDescription: "hasura migrateは、テーブルと関連の作成に適用されます"
---

Slackアプリのテーブルとリレーションシップを作成してみましょう。

## 移行を含むhasuraプロジェクトをダウンロードします{#download}

1. [learn-graphql](https://github.com/hasura/learn-graphql) レポートをクローンします。ターミナルで以下のコマンドを実行します。

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/backend/hasura-auth-slack/slack-backend
```

2. `slack-backend` ディレクトリに移動します。

```bash
cd tutorials/backend/hasura-auth-slack/slack-backend
```

HasuraクラウドのアプリURLを指すエンドポイントを設定します。`config.yaml` ファイルを開いて、エンドポイント値を設定します。

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**注：**Hasuraプロジェクトによって、エンドポイントが異なります。

では、移行を適用しましょう。

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

これにより、slackアプリのテーブルとリレーションシップが作成されます。

完璧です。Hasuraコンソールに移動して、リレーションシップのあるテーブルを確認します。
