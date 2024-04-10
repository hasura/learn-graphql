---
title: "Create a new project"
metaTitle: "Create a new project | Hasura v3 Tutorial"
metaDescription: "Let's create a new project by defining our metadata."
---

By default, all projects are hosted on the Hasura Data Delivery Network (DDN). You can create your project using the
Hasura CLI and then explore it using the Hasura Console.

## Authenticate your CLI

If you didn't do so before, to authenticate your CLI, run the following command:

```bash
ddn login
```

This will open up a browser window and initiate an OAuth2 login flow. If the browser window doesn't open automatically,
use the link shown in the terminal output to launch the flow.

## Create a new project

We'll use the `create project` command to create a new project:

```bash
ddn create project --dir ./my-first-supergraph
```

The CLI will respond with information about your new project, including the console URL:

```bash
+-------------+-----------------------------------------------------+
| Name        | <NAME>                                              |
+-------------+-----------------------------------------------------+
| ID          | <ID>                                                |
+-------------+-----------------------------------------------------+
| Console URL | https://console.hasura.io/project/<NAME>            |
+-------------+-----------------------------------------------------+
```

Additionally, it will log some information about the project that was created locally.

## Add a connector manifest

A **connector manifest** is the file which contains the details of the connector's configuration. This tells Hasura DDN
what capabilities the connector has and how to build that connector for your data source.

Let's move into the project directory:

```bash
cd my-first-supergraph
```

Then, create a connector manifest by passing a name — in this case `app_connector` — to the `add connector-manifest`
command:

```bash
ddn add connector-manifest app_connector --subgraph app --hub-connector hasura/postgres --type cloud
```

The CLI will respond with information about our successfully-added connector and alert us to our next steps:

```bash
INF connector "hasura/postgres:<VERSION>" with name "app_connector" added successfully to Subgraph "app"
INF Please add your Postgres Connection URI as the value for CONNECTION_URI env var in app/app_connector/connector/app_connector.build.hml file
```

With connection strings, you have two options for adding them to your metadata. You can either add them as environment
variables in your `*.env.yaml` files — which is the preferred secure method — or as raw connection strings in a
connector's build manifest. Make your choice below and add your connection string:

Our sample database is located in `us-west-1`. As such, there may be some performance issues as the data traverses the
network from where it's hosted to your nearest Hasura region.

Open your project in VS Code and open the `base.env.yaml` file in the root of your project. Then, add the
`APP_CONNECTOR_CONNECTION_URI` environment variable with the connection string under the `app` subgraph:

```yaml
supergraph: {}
subgraphs:
  app:
    APP_CONNECTOR_CONNECTION_URI: "postgresql://read_only_user:readonlyuser@35.236.11.122:5432/v3-docs-sample-app"
```

Next, update your `/app/app_connector/connector/app_connector.build.hml` file to reference this new environment
variable:

```yaml
# other configuration above
CONNECTION_URI:
  valueFromEnv: APP_CONNECTOR_CONNECTION_URI
```

Notice, when we use an environment variable, we must change the key to `valueFromEnv` instead of `value`. This tells
Hasura DDN to look for the value in the environment variable we've defined instead of using the value directly.

## Build your GraphQL API

We can use `dev` mode to watch our project and create new builds as changes are made to our metadata:

```bash
ddn dev
```

We'll see the CLI creates our first build, displays the URL for our project's Console, and continues to watch for
changes 🎉

```bash
INF Models and commands added to the project successfully
INF Doing a supergraph build...
INF Building SupergraphManifest "base"...
◑+---------------+----------------------------------------------------------------------------------------------------+
| Build Version | 3405408c06                                                                                         |
+---------------+----------------------------------------------------------------------------------------------------+
| Description   | Dev build - Tue, 02 Apr 2024                                                                       |
|               | 13:36:57 CDT                                                                                       |
+---------------+----------------------------------------------------------------------------------------------------+
| API URL       | https://<PROJECT_NAME>-default-3405408c06.ddn.hasura.app/graphql                                   |
+---------------+----------------------------------------------------------------------------------------------------+
| Console URL   | https://console.hasura.io/project/<PROJECT_NAME>/environment/default/build/3405408c06/graphql      |
+---------------+----------------------------------------------------------------------------------------------------+
| Project Name  | <PROJECT_NAME>                                                                                     |
+---------------+----------------------------------------------------------------------------------------------------+
INF Starting ConnectorManifest watcher for connector "app_connector" in subgraphName "app"
INF Starting ConnectorLink watcher for connector "app_connector" in subgraphName "app"
```

## What's a build?

A [**build**](https://hasura.io/docs/3.0/project-configuration/builds) in Hasura DDN is an immutable state of your
GraphQL API that represents a milestone in your development cycle.

Each [**project**](https://hasura.io/docs/3.0/project-configuration/projects) can have multiple builds, but only one can
be applied to a the project's endpoint. All builds on a project have a unique URL on Hasura DDN to access their GraphQL
API which can be shared with other users.

Builds allow you and your team to quickly iterate and experiment with your project's metadata and allow for easier
rollbacks on production and greater collaboration during development.

Under the hood, `ddn dev` is using two CLI commands:

- `update connector-manifest`
- `update connector-link`

These commands update a connector's
[`BuildContext`](https://hasura.io/docs/3.0/supergraph-modeling/build-manifests#connector-manifests) and the schema of
its
[`DataConnectorLink`](https://hasura.io/docs/3.0/supergraph-modeling/data-connectors#dataconnectorlink-dataconnectorlink)
respectively. Running these two allows you to track tables from your data source and can be run independently of
`ddn dev` in situations such as when your underlying database's schema changes.

## Run your first query

You can use the GraphiQL Explorer in your project's Console to create your own query or write it manually:

```graphql
query OrdersQuery {
  app_orders {
    id
    status
    deliveryDate
    users {
      id
      name
      email
    }
    products {
      id
      name
    }
  }
}
```

![Execute a query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/beta/0.0.1_console-execute-query-on-build.png)

**Now would be a good time to git init**

If you wish to use Git for version control and want to create a starting point to which you can rewind, run the
following at this point in a new tab of your terminal:

```bash
git init .
git add .
git commit -m "init supergraph"
```

## What just happened?

### Project configuration

When you ran the `create project` command, the CLI created a new project for you on Hasura DDN. It also scaffolded out
all the necessary configuration and metadata in your project's directory:

```text
├── app
├── base.supergraph.hml
├── hasura.yaml
└── supergraph
```

You can learn more about project structure by visiting our
[CI/CD section](https://hasura.io/docs/3.0/project-configuration/config/).

### Connector deployment

You created, configured, and deployed a PostgreSQL connector to Hasura DDN! Hasura can host these for you or you can
deploy them on your own infrastructure.

### Models tracked

When you ran `ddn dev`, the CLI tracked all the tables in the PostgreSQL database as models.
[**Models**](https://hasura.io/docs/3.0/supergraph-modeling/models/), defined in metadata, tell our GraphQL API how to
expose collections from our data sources.

### Relationships

Additionally, Hasura instantly added all foreign-key
[**relationships**](https://hasura.io/docs/3.0/supergraph-modeling/relationships/) from our data source to our API. This
unlocks the potential for rich, deeply-nested queries that reach across different models in our API.

Next, let's see how easy it is to add authorization to your API!
