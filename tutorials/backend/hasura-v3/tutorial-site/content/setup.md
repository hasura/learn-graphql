---
title: "Prerequisites"
metaTitle: "Prerequisites | Hasura v3 Tutorial"
metaDescription: "We'll cover everything you need to know to get started with Hasura."
---

After getting this page sorted, you'll be off to the races. This set of one-time setup steps will get you ready to start
building your Hasura project.

## Install the Hasura CLI {#hasura-cli}

We've redesigned the Hasura CLI from the ground up to make it easier to use and more powerful. Follow the
[install instructions from the docs](https://hasura.io/docs/3.0/cli/installation/) for your platform. **Please note,
this is a new CLI and is not the same as the previous version.**

## Install the VS Code extension {#vs-code-extensions}

We recommend using [VS Code](https://code.visualstudio.com/) and installing the Hasura VS Code extension. It allows you
to instantly scaffold out your metadata 🚀

You can download the extension from the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## Authenticate your CLI {#cli-auth}

To authenticate your CLI to our network, run the following command:

```bash
ddn login
```

This will open a browser window where you can log in with your Hasura account. Once you've logged in, you can close the
browser window and return to your terminal.

## Download the Sample data {#sample-data}

Finally, you'll need the sample data we'll be using for this tutorial. We're using a PostgreSQL database for this
tutorial, and you can use the initial `up.sql` file to create the tables:

```bash
curl https://raw.githubusercontent.com/hasura/docs-sample-app/main/migrations/default/1669033533483_init/up.sql -o up.sql
```

And then you can use the `tables_seed.sql` file to populate the tables with some sample data:

```bash
curl https://raw.githubusercontent.com/hasura/docs-sample-app/main/seeds/default/tables_seed.sql -o tables_seed.sql
```

With Hasura, you can use either a hosted database or a local database.

If you're using a hosted database, use the files above to create the tables and seed data according to your provider's
instructions. If you're running a local PostgreSQL database ([such as with Docker](https://hub.docker.com/_/postgres)),
create the tables and seeds and then start the database.

## The Open Data Domain (OpenDD) Specification

Hasura allows you to define your entire data model using a declarative set of metadata files. This metadata is written
in HML (a Hasura-specific flavor of YAML) and is used to create tables, relationships, permissions, and more. This
metadata can be version controlled and modified iteratively, allowing you to easily collaborate with your team - and
across others - to keep track of changes to your data layer.

We designed the
[Open Data Domain specification (OpenDD spec)](https://hasura.io/docs/3.0/data-domain-modeling/introduction/) to be a
simple, authoritative, source-agnostic way to define your entire data layer. The OpenDD spec allows you to create a
supergraph of all your data sources, including databases, REST APIs, GraphQL APIs, and more. Within a metadata file
written according to this specification, you can also quickly and easily define relationships between your data sources,
create permissions, and more.

## Our data model

In this tutorial, we'll be building the data layer for an e-commerce application. We'll use the following data model, as
found in the `up.sql` from the [prerequisites](/setup) page:

| Table name    | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| users         | Stores information about users, including their name and email address.                                                           |
| categories    | Stores information about categories of products, including their name.                                                            |
| manufacturers | Stores information about manufacturers of products, including their name.                                                         |
| products      | Stores information about products, including their name and price.                                                                |
| reviews       | Stores information about reviews of products, including the user who wrote the review and the product that was reviewed.          |
| orders        | Stores information about orders, including the user who placed the order and the product that was ordered.                        |
| carts         | Stores information about carts, including the user who owns the cart.                                                             |
| cart_items    | Stores information about items in a user's cart, including the user who owns the cart and the product that was added to the cart. |
| notifications | Stores information about notifications, including the user who owns the notification.                                             |
| coupons       | Stores information about coupons, including the coupon code and the discount amount.                                              |

**Be sure to apply the `up.sql` and then the `table_seeds.sql` files from the [prerequisites](/setup) page before
continuing.**

If you're unsure how to apply these files, you can use the following commands with
[psql](https://www.postgresql.org/download/):

```bash
psql -h localhost -p <PORT> -U <USERNAME> -d <DATABASE_NAME> -a -f up.sql
psql -h localhost -p <PORT> -U <USERNAME> -d <DATABASE_NAME> -a -f table_seed.sql
```
