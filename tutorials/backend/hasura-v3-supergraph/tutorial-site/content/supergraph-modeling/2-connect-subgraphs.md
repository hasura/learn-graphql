---
title: 'Connect a Data Source'
metaTitle: 'Create Subgraphs | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Quickly and easily create and connect subgraphs to your supergraph.'
---

## Connect a data source to the default subgraph {#connect-default}

As the CLI created our `default` subgraph when we initialized our project, we can connect a data source to it right
away. Our compose file exposes the ports for our databases on the host machine, so we can connect to them directly. The
`ux` team's data source is a PostgreSQL database which we can add to our `default` subgraph with the following command:

```bash
hasura3 metadata add-hub-connector pg_db --dir . --subgraph default --id hasura/postgres --url "postgres://user:password@localhost:5433/user_experience"
```

This command will add a new data source to our `default` subgraph using the `hasura/postgres` connector. The connector
is configured to connect to the database at `localhost:5433` using the username `user` and password `password`. When we
run this command, the CLI will scaffold out the metadata for our data source and create a `.env` file with the
connection string so we can confidently commit this to version control.

**As we're running watch mode, the CLI will automatically create a tunnel from our local database to our Hasura project
hosted on DDN.** If this database were hosted elsewhere, there would be no need to create a tunnel.

The CLI will automatically detect changes and create a new build on our `default` environment. If you check your
terminal, you'll see output displaying information about the build. This will include a link to the project's Console.
You can open this link in your browser to view the Console and explore the API. However, we've only connected a data
source...we don't yet have any models to explore.

<!-- TODO: Add screenshot -->

## Scaffold the UX metadata {#scaffold-ux}

We can now use LSP to create models for each table in our database. While we can do these one-by-one, we can also
generate them all at once using a simple command by typing `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) and typing
`Hasura: track all`. This will create the types for each table in our database, add them to our metadata, and also
create named files for each model in our `/subgraphs/default/models` directory.

<!-- TODO: Add screenshot -->

As this has altered our metadata, the CLI will automatically detect changes and create a new build on our `default`
environment. If you check your terminal, you'll see output displaying information about the build. Head to the Console
and you'll see that we now have models for each table in our database.

<!-- TODO: Add screenshot -->

We can even run a query like this across tables as Hasura was able to determine the relationships between them:

```graphql
query SimpleUsersQuery {
  users {
    id
    email
    user_preferences {
      user_id
      preferences
    }
  }
}
```

You can also visit the `Explorer` tab to see a visual representation of our supergraph. Right now, it's not very
exciting as we only have one subgraph and it only has one data source. However, as we add more subgraphs and connect
them to our supergraph, this will become a very useful tool.

<!-- TODO: Add screenshot -->
