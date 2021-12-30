---
title: "水平扩展"
metaTitle: "水平扩展 | Hasura GraphQL 高级教程"
metaDescription: "Hasura Cloud 支持你自动扩展应用程序，而无需考虑实例、核心、存储、阈值等的数量。"
---

Hasura Cloud 支持你自动扩展应用程序，而无需考虑实例、核心、存储、阈值等的数量。你可以不断增加并行用户和 API 调用的数量，Hasura Cloud 将自动得出优化安排。但你可能会在数据库层面遇到瓶颈，在这种情况下你可能希望扩展数据库。

## 水平扩展 Postgres {#horizontal-scaling-of-postgres}

Hasura Cloud 可以在各个只读副本之间均衡加载查询和订阅，同时将所有变更和元数据 API 调用发送至主服务器。为了执行水平扩展，

- 创建 postgres 实例的只读副本
- 配置路由、连接池和负载均衡

在示例中，我们在创建 Hasura Cloud 项目时使用了 Heroku 来部署 Postgres。我们可以按照[文档](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases)中的以下步骤向 Heroku PostgreSQL 添加追随者数据库（只读）

只读副本可以轻松地添加至托管数据库提供商。

- [Amazon RDS Postgres 只读副本](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html)
- [Google Cloud SQL 只读副本](https://cloud.google.com/sql/docs/postgres/replication/create-replica)
- [Azure Postgres 只读副本](https://docs.microsoft.com/en-us/azure/postgresql/howto-read-replicas-portal)
- [DigitalOcean Postgres 只读副本](https://www.digitalocean.com/docs/databases/postgresql/how-to/add-read-only-nodes/)

### 添加只读副本 URL {#adding-read-replica-urls}

为 Postgres 实例配置只读副本后，将在数据库层上自动进行负载均衡。在 Hasura API 层面，负载均衡是通过在全球不同地区运行的多个 Hasura 应用程序实例无缝实现的。

通过只读副本配置 Postgres 后，可以在项目的 ENV Vars 选项卡中使用以下环境变量将副本 URL 添加至 Hasura：

```bash
HASURA_GRAPHQL_READ_REPLICA_URLS=postgres://user:password@replica-host:5432/db
```

对于 Heroku，可以在终端中运行以下命令来获取该 URL：

```bash
heroku pg:info
```

该操作将输出 `DATABASE_URL, HEROKU_POSTGRESQL_PURPLE_URL` 信息。具有 `HEROKU_POSTGRESQL_COLOR_URL` 格式的第二个 URL 提供只读副本信息。

请确保适当地替换数据库凭据。

Hasura Cloud 负责跨主服务器和只读副本自动实现查询、订阅和变更的路由。

多个 Hasura 实例可以针对同一个数据库运行。请注意，这是在 Hasura Cloud 中自动处理的。
