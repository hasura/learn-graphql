---
title: "Migrations and Metadata"
metaTitle: "Migrations and Metadata | Hasura GraphQL Advanced Tutorial"
metaDescription: "In this section, we will look at how to manage database migrations and Hasura metadata in a local dev environment setup and learn about database schema and metadata config"
---

This section will teach you how to manage [database migrations and Hasura metadata](https://hasura.io/docs/latest/migrations-metadata-seeds/index/) in a local dev environment setup.

Hasura needs two components to (re)create a GraphQL API.

- Database schema
- Metadata

The database schema can either be of an existing database or created from scratch. The metadata will describe the GraphQL API and the various components of Hasura, like permissions, events, actions, and remote schemas.

Hasura doesn't automatically create the GraphQL API for the entire database. We will need to specify which tables/views/functions need to be exposed via GraphQL, and this information will be part of the metadata.

We will use the slack clone database schema for this demo. But before that, let's run Hasura on the local dev environment.

## Running Hasura via docker-compose {#running-hasura-via-docker-compose}

The most straightforward setup to run Hasura locally is to use the docker-compose setup to run both graphql-engine and Postgres docker containers.

Head to the docs to [set up Hasura locally using docker-compose](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/#step-1-get-the-docker-compose-file).

Once you have set up Hasura locally, you should be able to access the console at `http://localhost:8080`.

![Hasura Console OSS](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-console-oss-local.png)
