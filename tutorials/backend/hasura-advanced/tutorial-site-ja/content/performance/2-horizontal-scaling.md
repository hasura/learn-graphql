---
title: "水平スケーリング"
metaTitle: "水平スケーリング | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraクラウドはアプリケーションを自動でスケーリングするため、インスタンス数、コア数、メモリ数、しきい値などを考慮する必要はありません。"
---

Hasuraクラウドはアプリケーションを自動でスケーリングするため、インスタンス数、コア数、メモリ数、しきい値などを考慮する必要はありません。同時ユーザーやAPIコールの数を増やし続けても、Hasuraクラウドが自動で最適化を検討します。しかし、データベースレベルでボトルネックが発生する恐れはあるため、発生した場合はデータベースをスケールアップする必要があります。

## Postgresの水平スケーリング {#horizontal-scaling-of-postgres}

Hasuraクラウドは、すべてのミューテーションとメタデータのAPIコールをマスターに送信しながら、リードレプリカ全体のクエリとサブスクリプションの負荷を分散できます。水平スケーリングを実行するために、

- postgresインスタンスのリードレプリカを作成する
- ルーティング、コネクションプール、ロードバランスの設定を行う

ここでは例として、Hasuraクラウドのプロジェクトを作成しながら、Herokuを使ってPostgresをデプロイしました。[ ドキュメント ](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases) の手順に従って、以下に示すデータベース（読み取り専用）をHeroku PostgreSQLに追加します

リードレプリカは、管理用データベースプロバイダーに簡単に追加できます。

- [ Amazon RDS Postgresリードレプリカ ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html)
- [ GoogleクラウドSQLリードレプリカ ](https://cloud.google.com/sql/docs/postgres/replication/create-replica)
- [ Azure Postgresリードレプリカ ](https://docs.microsoft.com/en-us/azure/postgresql/howto-read-replicas-portal)
- [ DigitalOcean Postgresリードレプリカ ](https://www.digitalocean.com/docs/databases/postgresql/how-to/add-read-only-nodes/)

### リードレプリカURLの追加 {#adding-read-replica-urls}

Postgresインスタンスにリードレプリカを設定すれば、自動でデータベースレイヤーのロードバランスを取ります。Hasura APIレイヤーでは、世界中の様々な地域で実行されているHasuraアプリの複数インスタンスに対して、シームレスなロードバランスが実行されます。

Postgresにリードレプリカを設定した後、プロジェクトのENV Varsタブで以下の環境変数を設定して、レプリカのURLをHasuraに追加します。

```bash
HASURA_GRAPHQL_READ_REPLICA_URLS=postgres://user:password@replica-host:5432/db
```

HerokuでこのURLを取得するには、ターミナルで以下のコマンドを実行します。

```bash
heroku pg:info
```

これにより `DATABASE_URL, HEROKU_POSTGRESQL_PURPLE_URL` 情報が出力されます。2番目のフォーマットの `HEROKU_POSTGRESQL_COLOR_URL` がリードレプリカの情報です。

これにより、データベースの認証情報が適切に書き換えられていることを確認します。

Hasuraクラウドは、マスターとリードレプリカ間で、クエリ、サブスクリプション、ミューテーションを自動ルーティングします。

複数のHasuraインスタンスを同じデータベースに対して実行できます。なお、この処理はHasuraクラウドが自動で実行します。
