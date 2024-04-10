---
title: "Create subgraph"
metaTitle: "Create a subgraph | Hasura v3 Tutorial"
metaDescription: "In this section, we'll cover how to create a subgraph."
---

## Stop dev mode

Before we add the subgraph, we'll first need to stop `dev` mode in the CLI. In the terminal tab in which this is
running, press `CTRL+C`.

## Add the new subgraph

Using the same tab, while we're still in the project directory, we'll add a second subgraph using the following command:

```bash
ddn create subgraph chinook
```

The CLI should respond that the subgraph was successfully created and that you need to add this new subgraph to a
SupergraphManifest to start using it in your DDN project. We can make our `base.supergraph.hml` look like this:

```yaml
kind: SupergraphManifest
version: v1
definition:
  name: base
  envfile: base.env.yaml
  subgraphs:
    - app
    - chinook
```

## Connect a new data source

Since this is a PostgreSQL database, we can add a connector manifest using the following CLI command:

```bash
ddn add connector-manifest chinook_connector --subgraph chinook --hub-connector hasura/postgres --type cloud
```

Modify the `base.env.yaml` file in the root of your project by adding the `CHINOOK_CONNECTOR_CONNECTION_URI` environment
variable with the connection string under the `chinook` subgraph:

```yaml
supergraph: {}
subgraphs:
  app:
    APP_CONNECTOR_CONNECTION_URI: "postgresql://read_only_user:readonlyuser@35.236.11.122:5432/v3-docs-sample-app"
  app:
    CHINOOK_CONNECTOR_CONNECTION_URI: "postgresql://read_only_user:readonlyuser@35.236.11.122:5432/Chinook"
```

Then, in our `chinook/chinook_connector/connector/chinook_connector.build.hml`, we can add the new subgraph and
connection string:

```yaml
CONNECTION_URI:
  valueFromEnv: CHINOOK_CONNECTOR_CONNECTION_URI
```

We can then run dev mode to generate a new build, introspect our Chinook data source, and watch for changes:

```bash
ddn dev
```
