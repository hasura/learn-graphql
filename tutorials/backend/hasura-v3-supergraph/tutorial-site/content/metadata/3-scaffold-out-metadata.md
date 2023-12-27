---
title: 'Scaffold metadata'
metaTitle: 'Scaffold metadata | Hasura v3 Tutorial'
metaDescription: "Let's add some metadata to our project."
---

From here, you can immediately track tables, views, relationships, and quickly scaffold out your metadata by using the
Hasura VS Code extension.

Models are a new way to represent your data in Hasura.

Models in the [OpenDD Spec](https://hasura.io/docs/3.0/data-domain-modeling/overview/) refer to a collection of objects
(such as rows in a relational database, or documents in a NoSQL database) of a given OpenDD Spec
[type](https://hasura.io/docs/3.0/data-domain-modeling/types/). Models are backed by a data source and can support CRUD
operations. You can learn more about models [here](https://hasura.io/docs/3.0/data-domain-modeling/models/).

## Scaffold metadata {#scaffold-metadata}

With `hasura3 watch` running in the background and your `pg_db.hml` file open, you can use the VS Code extension to
scaffold out your metadata.

Open the command palette by pressing `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS) and start typing
`Hasura track all collections` and hit `Enter`. Then, hit `Enter` again to confirm that you want to track all
collections from the `pg_db` data source.

![Complete API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/0.0.2_track-all.png)

Viola! You've just scaffolded out your metadata. You can see that the CLI has generated named `hml` files for each of
your tables and views and added them to the `models` directory in the `default` subgraph. Additionally, your types have
been created in the `pg_db` directory.
