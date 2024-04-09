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

We'll use the `quickstart` command to create a new project. This will quickly walk us through all the necessary steps to
create our API:

```bash
ddn quickstart
```

## Choose a host

We'll be prompted to choose the data delivery network on which we want to host our project:

```bash
? Choose the DDN to create your project on  [Use arrows to move, type to filter]
> Hasura DDN
  Custom DDN
```

We'll choose `Hasura DDN` as we want Hasura to host this project for us.

## Choose a directory

Next, we'll be prompted to choose the directory to house this project; let's call it `my-first-supergraph`:

```bash
? Choose the DDN to create your project on Hasura DDN
? Enter the path where you want to create the Hasura project directory (./) my-first-supergraph
```

The CLI will then return information about our newly-created project and where the local files are stored:

```bash
INF Creating project: ddn create project --dir my-first-supergraph
INF Project <PROJECT_NAME> is created at /<CURRENT_PATH>/my-first-supergraph
```

## Connect a data source

The CLI will next ask us if we want to connect a data source. Type `y` and then choose `hasura/postgres` from the
provided options:

```bash
? We have the following data connectors available. Choose one as per your data source:  [Use arrows to move, type to filter]
> hasura/postgres:v0.4.1
  hasura/sendgrid:v0.5.0
  hasura/turso:v0.0.1
```

The CLI will add the PostgreSQL connector configuration to our project; we'll use the default name of `app_connector`,
so we can simply press `ENTER` to bring up the next prompt. Once the connector is added, the CLI will ask us for the
connection URI. If you have your own, you can provide it. Otherwise, we'll use the demo database's URI:

```
postgresql://read_only_user:readonlyuser@35.236.11.122:5432/v3-docs-sample-app
```

:::info Want to use a local DB?

You can create a [Secure Connect tunnel](/ci-cd/tunnels.mdx) to connect to a locally running PostgreSQL instance.

:::

The CLI will update the `.local.yaml` file in the project's directory with our connection string and let us know if our
connector has been set up successfully:

```bash
INF Setting env vars
INF env file .local.yaml updated
INF Data connector app_connector set up successfully
```

## Track tables and relationships

When we enter our connection string, the CLI will introspect our data source and ask us if we'd like to track all of our
tables and relationships; we'll select `y` as this will automatically write our metadata for us! 🎉

:::danger HEY!

NOT YET READY VIA CLI — IF YOU'RE FOLLOWING ALONG FOR TESTING, TRACK THINGS VIA THE VS CODE EXTENSION ONCE YOU RUN DDN
DEV

:::

```bash
TODO when above is complete
```

At this point, the CLI will ask us if we want to connect another data source. For now, we don't, so type `n` and hit
`ENTER`.

## Add the TypeScript Connector

We won't use this until later in the guide, but we can go ahead and add the NodeJS/TypeScript connector to incorporate
our own custom business logic into our API. When prompted, type `y` and hit `ENTER`. Then, let's name this connector
`app_functions`:

```bash
? Do you want add custom business logic using NodeJS/TypeScript functions? y
? What do you want to name your hasura/nodejs:v1.0.0 connector? (app_connector) app_functions
```

:::info Ensure Docker is running

We'll utilize a local development workflow to iteratively test our TypeScript connector and update our project's
configuration; this requires the Docker daemon running in the background. Before proceeding, ensure the daemon is up.

If you're on a Unix or Linux machine that requires `sudo` when running Docker, in the next step, prefix `ddn dev` with
`sudo ddn dev`.

:::

Finally, the CLI will configure our TypeScript connector and let us know we're ready to go!

```bash
INF Adding connector manifest: ddn add connector-manifest app_functions --type local --hub hasura/nodejs:v1.0.0 --subgraph app
INF Setting env vars
INF env file .local.yaml updated
INF Data connector app_functions set up successfully
INF Your DDN project is all set up
INF Run 'cd my-first-supergraph && ddn dev' to build your GraphQL API.
```

## Build your GraphQL API

If we run the provided command from the previous step's output, we'll see the CLI created our first build, including the
URL for our project's Console 🎉

```bash
INF Preparing project...
INF Preparing connector "app_connector" in subgraph "app"
INF Updating ConnectorManifest for connector "app_connector" in subgraph "app"
INF Building connector "app_connector" in subgraph "app"
INF Waiting for deployment with ID "d2c96069-8dc6-452f-9b12-84896535492b" to go through...
◑+---------------+------------------------------------------------------------------------------+
| File Id       | e50204eb-1198-42c0-80fe-af049d79d4ae                                         |
+---------------+------------------------------------------------------------------------------+
| Deployment Id | d2c96069-8dc6-452f-9b12-84896535492b                                         |
+---------------+------------------------------------------------------------------------------+
| Build Url     | <URL>                                                                        |
+---------------+------------------------------------------------------------------------------+
INF Connectors built and running successfully
INF Updating ConnectorLink for connector "app_connector" in subgraph app
INF Updating URL...
INF env file .local.yaml updated
INF Connector Link updated...
INF Doing a supergraph build...
◑+---------------+--------------------------------------------------------------------+
| Build ID      | 39aea467-07c4-4b13-8bbf-e475bb083267                               |
+---------------+--------------------------------------------------------------------+
| Build Version | cfe1ca9abf                                                         |
+---------------+--------------------------------------------------------------------+
| Build URL     | https://<PROJECT_NAME>-<ENV>-cfe1ca9abf.ddn.hasura.me/graphql      |
+---------------+--------------------------------------------------------------------+
| Project Id    | <PROJECT_ID>                                                       |
+---------------+--------------------------------------------------------------------+
# highlight-start
| Console Url   | https://console.hasura.com/project/<PROJECT_NAME>/graphql          |
# highlight-end
+---------------+--------------------------------------------------------------------+
| FQDN          | <PROJECT_NAME>.ddn.hasura.me                                       |
+---------------+--------------------------------------------------------------------+
| Environment   | dev                                                                |
+---------------+--------------------------------------------------------------------+
| Description   | Hasura Watch build at                                              |
|               | <TIMESTAMP>                                                        |
+---------------+--------------------------------------------------------------------+
```

## Run your first query

We're using the docs sample app's schema for this guide's visuals, but you can use the GraphiQL Explorer to create your
query or write it manually:

<!-- TODO: Add screenshot -->

<details>
<summary>Using our sample db? You can use this query!</summary>

```graphql
query OrdersQuery {
  orders {
    id
    status
    delivery_date
    user {
      id
      name
      email
    }
    product {
      id
      name
    }
  }
}
```

</details>
