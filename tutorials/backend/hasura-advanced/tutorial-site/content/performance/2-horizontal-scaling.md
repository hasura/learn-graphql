---
title: "Horizontal Scaling"
metaTitle: "Horizontal Scaling | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura Cloud lets you scale your applications automatically without having to think about the number of instances, cores, memory, thresholds etc."
---

Hasura Cloud lets you scale your applications automatically without having to think about the number of instances, cores, memory, thresholds etc. You can keep increasing your number of concurrent users and the number of API calls and Hasura Cloud will figure out the optimizations automagically. But you could have a bottleneck at the database level which is when you might want to scale the database.

## Horizontal Scaling of Postgres {#horizontal-scaling-of-postgres}

Hasura Cloud can load balance queries and subscriptions across read replicas while sending all mutations and metadata API calls to the master. To perform horizontal scaling,

- Create read-replicas of your postgres instances
- Configure routing, connection pooling, and load balancing

In our example, we used Heroku to deploy Postgres while creating the Hasura Cloud project. We can add a follower database (read-only) to Heroku PostgreSQL through the following steps in [docs](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases)

Read replicas can be added to managed database providers easily.

- [Amazon RDS Postgres Read Replica](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html)
- [Google Cloud SQL Read Replica](https://cloud.google.com/sql/docs/postgres/replication/create-replica)
- [Azure Postgres Read Replica](https://docs.microsoft.com/en-us/azure/postgresql/howto-read-replicas-portal)
- [DigitalOcean Postgres Read Replica](https://www.digitalocean.com/docs/databases/postgresql/how-to/add-read-only-nodes/)

### Adding read replica urls {#adding-read-replica-urls}

Once you configure read replicas for your Postgres instance, the load balancing at the database layer is automatically taken care. At the Hasura API layer, load balancing is done seamlessly with multiple instances of your Hasura app running in different regions across the globe.

After configuring Postgres with the read replica, the replica URLs can be added to Hasura using the following environment variable in your project ENV Vars tab:

```bash
HASURA_GRAPHQL_READ_REPLICA_URLS=postgres://user:password@replica-host:5432/db
```

For Heroku, this URL can be obtained by running the following command in the terminal:

```bash
heroku pg:info
```

This would output `DATABASE_URL, HEROKU_POSTGRESQL_PURPLE_URL` info. The second one with the format of `HEROKU_POSTGRESQL_COLOR_URL` gives the read replica info.

Make sure to replace the database credentials appropriately.

Hasura Cloud takes care of automatic routing for queries, subscriptions and mutations across master and read-replicas.

Multiple instances of Hasura can be run against the same database. Do note that this is taken care in Hasura Cloud automatically.
