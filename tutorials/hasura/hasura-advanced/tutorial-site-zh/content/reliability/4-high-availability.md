---
title: "高可用性"
metaTitle: "高可用性 | Hasura GraphQL 高级教程"
metaDescription: "由 Hasura 提供服务的 GraphQL API 应持续运行，并消除任何单点故障，以获得可靠的应用基础设施。"
---

由 Hasura 提供服务的 GraphQL API 应持续运行，并消除任何单点故障，以获得可靠的应用基础设施。从根本上讲，GraphQL API 有两个方面得到使用：Postgres 数据库的可用性和 Hasura 的可用性。

## PostgreSQL HA{#postgresql-ha}

Postgres 为配置高可用性系统提供了[各种解决方案](https://www.postgresql.org/docs/9.3/different-replication-solutions.html)。大多数代管式 Postgres 供应商都为 Postgres 提供一个 HA 系统，配置好后，会在发生故障时自动切换到备用 Postgres。使用 Heroku，这是我们如何[设置副本](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers)，以确保有一台热备用服务器在发生故障时确保自动切换。

这不需要在 Hasura 项目层面进行配置。

## Hasura HA{#hasura-ha}

开源 graphql 引擎可以运行
多个 Hasura 实例。在 Hasura Cloud 中，自动扩展过程及其运行所需的基础设施无需手动干预。

另外，由于 Hasura 的多个实例连接到同一个数据库，事件触发器不会造成重复事件，也不会有订阅可靠性问题。
