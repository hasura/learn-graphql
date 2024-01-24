---
title: "High Availability"
metaTitle: "High Availability | Hasura GraphQL Advanced Tutorial"
metaDescription: "The GraphQL API served by Hasura should be continuously operational, so we should remove any single point of failure for reliable application infrastructure."
---

The GraphQL API served by Hasura should be continuously operational, so we should remove any single point of failure for reliable application infrastructure. Fundamentally there are two aspects to the GraphQL API being consumed - the availability of the Postgres database and the availability of Hasura.

## PostgreSQL HA {#postgresql-ha}

Postgres offers [various solutions](https://www.postgresql.org/docs/9.3/different-replication-solutions.html) for configuring a highly available system. Most managed Postgres providers have a HA system that will automatically failover to standby Postgres. With Heroku, here's how we can [set up a replication](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers) to ensure there is a Hot standby server to provide automated failover.

There is no configuration required at the Hasura project level.

## Hasura HA {#hasura-ha}

You can run multiple instances of Hasura with the open-source graphql-engine. In Hasura Cloud, the process of automatically scaling and the infrastructure required is taken care of without requiring manual intervention.
