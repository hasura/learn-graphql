---
title: "Managing Metadata"
metaTitle: "Managing Metadata | Hasura GraphQL Advanced Tutorial"
metaDescription: "In addition to managing migration files, Hasura has metadata that needs to be maintained and version controlled too."
---

In addition to managing migration files, Hasura has [metadata](https://hasura.io/docs/latest/migrations-metadata-seeds/manage-metadata/) you need to maintain and version control. Migration files are created primarily for actions performed towards updating the `database schema`. On the other hand, metadata files are updated whenever you perform an action on the console, such as:
tracking tables/views/functions, creating relationships, configuring permissions, creating event triggers and remote schemas.
You can then export it as a JSON/YAML metadata file and version control it.

You can port the metadata file to another Hasura instance to get the same configuration (provided the database schema exists). You can also manually edit the metadata file to add more objects to it and then use it to update the instance.

In the Data tab of the console, click on `Track All` to track all tables and their relationships.

The following command allows you to export the metadata:

```bash
hasura metadata export
```

The above command exports the metadata as YAML and updates the correct files in the `metadata` directory.

```bash
├── actions.graphql
├── actions.yaml
├── allow_list.yaml
├── cron_triggers.yaml
├── databases
│   ├── databases.yaml
│   └── default
│       └── tables
│           ├── public_channel.yaml
│           ├── public_channel_member.yaml
│           ├── public_channel_thread.yaml
│           ├── public_channel_thread_message.yaml
│           ├── public_online_users.yaml
│           ├── public_user_message.yaml
│           ├── public_users.yaml
│           ├── public_workspace.yaml
│           ├── public_workspace_member.yaml
│           ├── public_workspace_user_type.yaml
│           └── tables.yaml
├── query_collections.yaml
├── remote_schemas
│   └── remote_schemas.yaml
├── rest_endpoints.yaml
└── version.yaml
```

- `actions.graphql` - This file contains the GraphQL types defined for the Actions. Note that Actions can share types, but this file is the single source of truth.
- `actions.yaml` - It contains the action definition like the query/mutation and the handler config.
- `allow_list.yaml` - It contains the configuration for Allow Lists to restrict the queries made to the server.
- `cron_triggers.yaml` - It contains metadata about the Scheduled Triggers created.
- `databases` - This is a directory that contains all the connected databases for this project.
    - `functions` - This contains the Postgres functions to be tracked.
    - `tables` - All Postgres tables and views exposed over GraphQL along with their permission information.
- `inherited_roles.yaml` - This contains the definition for all inherited roles.
- `query_collections.yaml` - Queries can be grouped inside a collection. This file contains such groups.
- `remote_schemas.yaml` - Metadata about all the Remote Schemas, including information about the GraphQL endpoint and optional headers.
- `rest_endpoints.yaml` - Metadata of all the RESTified endpoints created for a given GraphQL query.
- `version.yaml` - Metadata version. The current version is 3.

Our slack schema has the `tables` directory populated with all the Postgres tables and the role-based permissions. As we keep changing the schema and modifying related metadata, these files will be updated automatically.

## Import/Export Metadata from Console {#import-export-metadata}

In the Hasura Console Settings page, you can quickly import/export metadata in `.json` format.
