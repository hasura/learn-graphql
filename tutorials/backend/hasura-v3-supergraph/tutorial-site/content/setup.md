---
title: "Prerequisites"
metaTitle: "Prerequisites | Hasura v3 Supergraph Tutorial"
metaDescription: "We'll cover everything you need to know to get started with building your supergraph."
---

After getting this page sorted, you'll be ready to develop your first supergraph. This set of one-time setup steps will
get you ready to start building.

## Install the Hasura CLI {#hasura-cli}

We've redesigned the Hasura CLI from the ground up to make it easier to use and more powerful. Follow the
[install instructions from the docs](https://hasura.io/docs/3.0/cli/installation/) for your platform. **Please note,
this is a new CLI and is not the same as the previous version.**

## Install the VS Code extension {#vs-code-extensions}

We recommend using [VS Code](https://code.visualstudio.com/) and installing the Hasura VS Code extension. It allows you
to instantly scaffold out your metadata and track all tables + relationships present in your data source 🚀

You can download the extension from the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## Authenticate your CLI {#cli-auth}

To authenticate your CLI to our network, run the following command:

```bash
ddn login
```

This will open a browser window where you can log in with your Hasura account. Once you've logged in, you can close the
browser window and return to your terminal.

## Clone the sample repository {#sample-data}

Finally, you'll need the sample data we'll be using for this tutorial. We have a series of PostgreSQL databases that
will act as the data sources for our supergraph. You can clone the repository with the following command:

```bash
git clone https://github.com/hasura/supergraph-learn-course-assets.git
```

This repository contains a docker-compose file that will spin up the databases we'll be using. To start the databases,
run the following command from the root of the repository:

```bash
docker-compose up -d
```

This will build your containers, populate your databases, and run them in the background. You can verify that the
databases are running by running the following command:

```bash
docker ps
```

You should see the following output:

```bash
CONTAINER ID   IMAGE             COMMAND                  CREATED         STATUS         PORTS                    NAMES
f99183fa1a20   postgres:latest   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:5432->5432/tcp   supergraph-course-db_product_management-1
560c830b4885   postgres:latest   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:5434->5432/tcp   supergraph-course-db_payment_processing-1
8c30b8382907   postgres:latest   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:5433->5432/tcp   supergraph-course-db_user_experience-1
02902d925779   postgres:latest   "docker-entrypoint.s…"   3 seconds ago   Up 2 seconds   0.0.0.0:5435->5432/tcp   supergraph-course-db_fulfillment_services-1
```

## Create tunnels for your endpoints

If you're running these databases locally, you can use a tool like [ngrok](https://ngrok.com/) to create a tunnel for
each database and expose it to the internet. This value can then be used to create a connection string for each database
and used by Hasura to introspect the data source and generate your GraphQL schema. Alternatively, you could apply the
`up.sql` for each of these (like
[this example](https://github.com/hasura/supergraph-learn-course-assets/blob/main/db/user_experience/up.sql)) and serve
these via a cloud-hosted PostgreSQL provider.

If you're using ngrok, follow these steps for **each** database:

### Step 1: Create a config file

Create an ngrok config file serving a tunnel for each port (`5432` thru `5435`)

This will create a set of tunnels with this format:

```plaintext
tcp://0.tcp.<REGION>.ngrok.io:<PORT>
```

We'll only need the hosts and port numbers from the tunnels in the next step.

### Step 2: Create connection strings

For now, create a set of connection strings and store them in a text file for safe keeping. There should be four that
follow this format:

```plaintext
postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/<POSTGRES_DB>
```

The `POSTGRES_DB` value can be read from
[this `docker-compose.yaml`](https://github.com/hasura/supergraph-learn-course-assets/blob/main/docker-compose.yaml).

## Create a new Hasura project {#new-project}

From the root of this repository, run the following command to create a new Hasura project:

```bash
ddn create project --dir ./supergraph-learn-course
cd supergraph-learn-course
```

This will create all the configuration files and scaffold out your metadata. It will also create an `app` subgraph that
we'll learn about in our first lesson.
