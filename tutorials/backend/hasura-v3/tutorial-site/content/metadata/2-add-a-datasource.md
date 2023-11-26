---
title: 'Add a data source'
metaTitle: 'Add a data source | Hasura v3 Tutorial'
metaDescription: "Let's add a data source to our project."
---

Hasura can connect to a variety of data sources. We understand that your data is likely spread across multiple sources
with various owners and in a number of different formats. We want to make it easy for you to access all of your data
from a single GraphQL API. We call this concept the [**data supergraph**](https://hasura.io/supergraph).

## Data Connectors {#data-connectors}

To connect to data sources, Hasura utilizes [**data connectors**](https://hasura.io/docs/3.0/connectors/introduction/).
A data connector is an HTTP service that exposes a set of APIs which Hasura uses to communicate with the data source.
The data connector is responsible for interpreting work to be done on behalf of the Hasura Engine, using the native
query language of the data source.

Data connectors are available for a number of data sources, including PostgreSQL, ClickHouse, Qdrant, and more. You can
learn more about them on the [Connector Hub](https://hasura.io/connectors).

In this guide, we'll be using the `hasura/postgres` data connector to connect to a PostgreSQL database.

## Create the HasuraHubDataConnector kind

Inside the `/subgraphs/default/dataconnectors` directory, create a new file called `app.hml`. This directory will
contain the configuration for your data source. We'll use this file to connect to a PostgreSQL database.

Then, start typing `HasuraHubDataConnector` on a new line. Hit `Enter` and the extension will automatically populate the
rest of the template for you:

```yaml
kind: HasuraHubDataConnector
version: v1
definition:
  name:
  connectorId:
  connectorConfiguration:
    - region:
      mode:
      configuration:
        version:
```

| Field                    | Description                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                   | The name of your data source. Put `default` for now.                                                                                                     |
| `connectorId`            | The ID of the connector you want to use. In this example, we'll use `hasura/postgres`.                                                                   |
| `connectorConfiguration` | List of regional configurations or your data connector. You can specify different configurations for different regions.                                  |
| `region`                 | Hit `Ctrl + Space` and choose the region that your database is closest to. If you're not sure, just use `gcp-us-east4`.                                  |
| `mode`                   | This can be `ReadOnly`, `ReadWrite` and `WriteOnly`. In this example, we'll use `ReadWrite`.                                                             |
| `configuration`          | The configuration for your data source. Contains `version`, `connectionUri`, and other fields.                                                           |
| `version`                | Version of the data source configuration. We'll use `1`.                                                                                                 |
| `connectionUri`          | Connection string for your Postgres database which can be a value or a [secret](/ci-cd/secrets.mdx). For this guide, enter your database URL as a value. |

After you add the `connectionUri` information in `HasuraHubDataConnector`, your metadata field should look something
like this:

```yaml
kind: HasuraHubDataConnector
version: v1
definition:
  name: default
  connectorId: hasura/postgres
  connectorConfiguration:
    - region: gcp-us-east4
      mode: ReadWrite
      configuration:
        version: 1
        connectionUri:
          uri:
            value: <postgres://user:pass@host:port/db>
```

### Hosted data sources {#hosted-data-sources}

If your database is hosted on a cloud provider, you can connect to it by copying your connection string which should
look like this:

```text
postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>
```

### Local data sources {#local-data-sources}

If you want to connect a local database for development, you can use the new Hasura CLI to create a local daemon and
securely connect to your database. We call this a **Secure Connect** tunnel. Tunnels are beneficial because they allow
you to connect your local database to your Hasura project on Hasura DDN without exposing it to the internet.

#### Start your database

Start your local database. For example, if you are using Docker, you can run the following command:

```bash
docker run -d --name <DATABASE_NAME> -e POSTGRES_PASSWORD=<YOUR_PASSWORD> -p 5432:5432 <DATABASE_IMAGE>
```

#### Start the daemon

Start the Hasura daemon with the `daemon start` command:

```bash
hasura3 daemon start
```

The daemon will block this window while it runs.

#### Create a Secure Connect tunnel

Open a new tab or window for your terminal and run the `create` command:

```bash
hasura3 tunnel create <SOCKET>
```

The `<SOCKET>` argument is the address of your local database. For example, if you are running a local PostgreSQL
database on the default port, you would use `localhost:5432`.

The CLI will return a URL that you can use to connect to your database. You should use this URL to form a connection
string for your database, like this:

```text
postgresql://<USERNAME>:<PASSWORD>@<URL_RETURNED_BY_THE_CLI>/<DATABASE_NAME>
```

## Secrets

Optionally, you can utilize **secrets** to store your connection strings. Secrets are a new concept in Hasura that allow
you to store sensitive information securely. You can quickly create them
[using the CLI](https://hasura.io/docs/3.0/ci-cd/secrets/) as key-value pairs:

```bash
hasura3 secret set --project-id <PROJECT_ID_FROM_PREVIOUS_STEP> <KEY>=<VALUE>
```

And then reference the key in your `connection_uris` array:

```yaml
connectionUri:
  uri:
    stringValueFromSecret: <KEY>
```

## Introspect your data source

With our data source connected, the VS Code extension can easily introspect it and generate metadata for us. This takes
the boilerplate tasks of creating types and relationships off your hands and lets you focus on the work that matters.
With just a couple of commands, we'll have our entire data layer defined and an API ready to go 🚀

In VS Code, with the `app.hml` file open, press `Command + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows) to open the
Command Palette. Type `hasura refresh data source` and choose the option that appears.

![Refreshing data source in VS Code](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/0.0.1_vs-code-refresh-data-source.png)

You should now see the name you provided in the previous step. Clicking this will introspect your data source and add
information to your metadata about the tables and views in your database 🎉

Next, we'll create `hml` files for each of our tables and add them to the `models` directory in the `default` subgraph.
