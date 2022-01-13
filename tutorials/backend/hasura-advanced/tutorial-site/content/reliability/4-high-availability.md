---
title: "High Availability"
metaTitle: "High Availability | Hasura GraphQL Advanced Tutorial"
metaDescription: "The GraphQL API served by Hasura should be continously operational and any single points of failure should be eliminated for a reliable application infrastructure."
---

The GraphQL API served by Hasura should be continously operational and any single points of failure should be eliminated for a reliable application infrastructure. Fundamentally there are two aspects to the GraphQL API being consumed; availability of Postgres database and availability of Hasura.

## PostgreSQL HA {#postgresql-ha}

Postgres offers [various solutions](https://www.postgresql.org/docs/9.3/different-replication-solutions.html) for configuring a highly available system. Most managed Postgres providers have a HA system for Postgres, which when configured, will automatically failover to standby Postgres. With Heroku, here's how we can [set up a replication](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers) to ensure there is a Hot standby server to ensure automated failover.

There is no configuration required at the Hasura project level.

## Hasura HA {#hasura-ha}

Multiple instances of Hasura can be run with the open source graphql-engine. In Hasura Cloud, the process of automatically scaling and the infrastructure required to run this is taken care without any requirement of manual intervention.

Also with multiple instances of Hasura connected to the same database, the typical worries of event triggers duplicating events or subscriptions being reliable are taken care of.
