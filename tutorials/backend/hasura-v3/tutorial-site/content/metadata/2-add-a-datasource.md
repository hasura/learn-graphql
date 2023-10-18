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

Open your empty `metadata.hml` file and start typing `HasuraHubDataConnector`. Hit Enter and the
[VS Code extension](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura) will automatically populate the
rest of the template for you:

```yaml
kind: HasuraHubDataConnector
name:
connectorId:
connectorConfiguration:
  version:
  connection_uris:
```

You can tab through and add values for each of the fields:

| Field                    | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `name`                   | The name of your data source. Put `default` for now.                                       |
| `connectorId`            | The ID of the connector you want to use. In this example, we'll use `hasura/postgres`.     |
| `connectorConfiguration` | The configuration for your connector, made up of `version` and `connection_uris`.          |
| `version`                | The version of your connector. Put `1` for now.                                            |
| `connection_uris`        | The array of connection strings for your databases. Add your database's connection string. |

A simple, completed `HasuraHubDataConnector` kind looks like this:

```yaml
kind: HasuraHubDataConnector
name: default
connectorId: hasura/postgres
connectorConfiguration:
  version: 1
  connection_uris:
    - <YOUR_CONNECTION_STRING>
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
hasura3 local daemon start
```

The daemon will block this window while it runs.

#### Create a Secure Connect tunnel

Open a new tab or window for your terminal and run the `create` command:

```bash
hasura3 cloud tunnel create <SOCKET>
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
hasura3 cloud secret set --project-id <PROJECT_ID_FROM_PREVIOUS_STEP> <KEY>=<VALUE>
```

And then reference the key in your `connection_uris` array:

```yaml
connection_uris:
  - stringValueFromSecret: <KEY>
```
