---
title: "Hasura CLI"
metaTitle: "Hasura CLI | Hasura GraphQL Advanced Tutorial"
metaDescription: "We will make use of Hasura CLI to manage the project locally. Start with an empty folder and execute the following command"
---

## Install Hasura CLI

Depending on the platform, [install Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html) by following the steps in docs.

We will make use of Hasura CLI to manage the project locally. Start with an empty folder and execute the following command:

```bash
hasura init
```

This will create a new project structure locally under the given directory (`hasura` by default). This is how the directory structure looks:

```
├── config.yaml
├── metadata
│   ├── actions.graphql
│   ├── actions.yaml
│   ├── allow_list.yaml
│   ├── cron_triggers.yaml
│   ├── databases
│   │   └── databases.yaml
│   ├── query_collections.yaml
│   ├── remote_schemas.yaml
│   └── version.yaml
├── migrations
└── seeds
```

The `migrations` and `seeds` directories are initally empty. The `metadata` directory contains a bunch of yaml files each describing different parts of the GraphQL API, like the actions, remote schemas and the different databases that are connected to this project along with their tables and functions etc.

Since you have Hasura running locally via docker-compose, run the following command

```bash
hasura console
```

This should open up the console on `http://localhost:9695` and is the same GUI as the one you see on the server console at `http://localhost:8080`
