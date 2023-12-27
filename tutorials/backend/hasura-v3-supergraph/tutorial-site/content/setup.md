---
title: 'Prerequisites'
metaTitle: 'Prerequisites | Hasura v3 Supergraph Tutorial'
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
to instantly scaffold out your metadata using the Open Data Domain Specification (OpenDD Spec) format 🚀

You can download the extension from the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## Authenticate your CLI {#cli-auth}

To authenticate your CLI to our network, run the following command:

```bash
hasura3 login
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
