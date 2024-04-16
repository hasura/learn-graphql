---
title: "Connect a Data Source"
metaTitle: "Create Subgraphs | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Quickly and easily create and connect subgraphs to your supergraph."
---

## Connect a data source to the default subgraph {#connect-default}

As the CLI created our `app` subgraph when we initialized our project, we can connect a data source to it right away.
Our compose file exposes the ports for our databases on the host machine, so we can connect to them directly. The `ux`
team's data source is a PostgreSQL database which we can add to our `app` subgraph with the following command:

```bash
ddn add connector-manifest pg_db --subgraph app --hub-connector hasura/postgres --type cloud
```

This command will add a new data source to our `app` subgraph using the `hasura/postgres` connector.

We'll also need to add the connection string for this new source. We can do this through the use of environment
variables by referencing the connection strings we generated earlier using ngrok, and make our `base.env.yaml` file look
like this:

```yaml
supergraph: {}
subgraphs:
  app:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/user_experience"
```

Next, update your `/app/pg_db/connector/pg_db.build.hml` file to reference this new environment variable:

```yaml
# other configuration above
CONNECTION_URI:
  valueFromEnv: PG_DB_CONNECTION_URI
```

## Scaffold the UX metadata {#scaffold-ux}

By starting the CLI's dev mode, we'll automatically be able to track all tables as models and expose them in our API.
Run the following command:

```bash
ddn dev
```

This will create the types for each table in our database, add them to our metadata, and also create named files for
each model in our `/app/pg_db/models` directory.

As this has altered our metadata, the CLI will automatically detect changes and create a new build for our project. If
you check your terminal, you'll see output displaying information about the build. Head to the Console and you'll see
that we now have models for each table in our database.

We can even run a query like this across tables as Hasura was able to determine the relationships between them:

```graphql
query SimpleUsersQuery {
  app_users {
    id
    email
    userPreferences {
      userId
      preferences
    }
  }
}
```

You can also visit the `Explorer` tab to see a visual representation of our supergraph. Right now, it's not very
exciting as we only have one subgraph and it only has one data source. However, as we add more subgraphs and connect
them to our supergraph, this will become a very useful tool.

![Track everything](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/initial-visualization.png)
