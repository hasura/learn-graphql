---
title: "Connect Postgres to Hasura"
metaTitle: "Connect Hasura | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Connecting an application database is very simple with Hasura. Hasura
[supports connectors to most popular databases](https://hasura.io/docs/latest/databases/overview). Head to the `Data`
tab and click on `Connect Database`.

Select Postgres from the list of connectors and click `Connect Existing Database`.

We'll give our database the name of `HRTool` and provide the path as an environment variable using
`HASURA_GRAPHQL_METADATA_DATABASE_URL`. In our `docker-compose.yaml` file, we have already set this environment variable
to the connection string of the Postgres container we're running.

<!-- TODO: Screenshot connect_postgres_db.png -->

Finish by clicking `Connect Database`.
