---
title: 'Prerequisites'
metaTitle: 'Prerequisites | Hasura v3 Tutorial'
metaDescription: "We'll cover everything you need to know to get started with Hasura."
---

After getting this page sorted, you'll be off to the races. This set of one-time setup steps will get you ready to start
building your Hasura project.

## Install the Hasura CLI {#hasura-cli}

<!-- TODO: Update link below -->

We've redesigned the Hasura CLI from the ground up to make it easier to use and more powerful. Follow the
[install instructions from the docs](#) for your platform. **Please note, this is a new CLI and is not the same as the
previous version.**

## Install the VS Code extension {#vs-code-extensions}

We recommend using [VS Code](https://code.visualstudio.com/) and installing the Hasura VS Code extension. It allows you
to instantly scaffold out your metadata using the Open Data Domain Specification (OpenDD Spec) format 🚀

You can download the extension from the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## Create a PAT using your Hasura Cloud account {#hasura-cloud-account}

To authenticate your CLI to our network, you'll need to create a PAT (personal access token) using your Hasura Cloud
account. You can navigate to
[https://cloud.hasura.io/account-settings/access-tokens](https://cloud.hasura.io/account-settings/access-tokens) to
create a new PAT.

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

<!-- TODO: Additionally, add a note if they're wishing to use a local database, they'll need something like PostgreSQL running in Docker -->
