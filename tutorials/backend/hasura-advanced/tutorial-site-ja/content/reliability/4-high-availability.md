---
title: "高可用性"
metaTitle: "高可用性 | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasuraが提供するGraphQL APIは、信頼性の高いアプリケーションインフラとして、継続的な運用が求められており、単一障害点を排除する必要があります。"
---

Hasuraが提供するGraphQL APIは、信頼性の高いアプリケーションインフラとして、継続的な運用が求められており、単一障害点を排除する必要があります。基本的にGraphQL APIでは、PostgresデータベースとHasuraの2つの可用性の側面を利用しています。

## PostgreSQL HA {#postgresql-ha}

Postgresは、高可用性システムを構成するための [ 様々なソリューション ](https://www.postgresql.org/docs/9.3/different-replication-solutions.html) を提供しています。管理用Postgresプロバイダーのほとんどは、Postgres用のHAシステムを有しており、これを構成することでスタンバイPostgresに自動的にフェイルオーバーします。Herokuを使って、 [ レプリケーションを設定 ](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers) してホットスタンバイサーバーを確保し、自動フェイルオーバーを実現する方法を紹介します。

ここでは、Hasuraプロジェクトレベルでの設定は必要ありません。

## Hasura HA {#hasura-ha}

Hasuraの複数のインスタンスは、オープンソースのgraphql-engineで実行できます。Hasuraクラウドなら、自動スケーリングのプロセスと、これを実行するために必要なインフラを人の手を必要とせずに用意できます。

また、Hasuraの複数のインスタンスは同じデータベースに接続されているため、イベントトリガーによるイベントの重複や、サブスクリプションの信頼性といった典型的な懸念にも対応できます。
