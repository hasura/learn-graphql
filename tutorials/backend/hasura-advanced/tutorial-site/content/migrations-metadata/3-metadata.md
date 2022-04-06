---
title: "Managing Metadata"
metaTitle: "Managing Metadata | Hasura GraphQL Advanced Tutorial"
metaDescription: "In addition to managing migration files, Hasura has metadata that needs to be maintained and version controlled too."
---

In addition to managing migration files, Hasura has metadata that needs to be maintained and version controlled too. Migration files are created primarily for actions performed towards updating the `database schema`. On the other hand, metadata files are updated whenever an action is performed on the console, like tracking tables/views/functions, creating relationships, configuring permissions, creating event triggers and remote schemas, etc. can be exported as a JSON/yaml metadata file which can be version controlled.

The metadata file can be later imported to another Hasura instance to get the same configuration (provided the database schema exists). You can also manually edit the metadata file to add more objects to it and then use it to update the instance.

In the Data tab of the console, click on `Track All` to track all tables and then their relationships too.

Metadata can be exported with the following command:

```bash
hasura metadata export
```

This will export the metadata as yaml and update the right files in the `metadata` directory.

```bash
├── actions.graphql
├── actions.yaml
├── allow_list.yaml
├── cron_triggers.yaml
├── databases
│   ├── databases.yaml
│   └── default
│       └── tables
│           ├── public_channel.yaml
│           ├── public_channel_member.yaml
│           ├── public_channel_thread.yaml
│           ├── public_channel_thread_message.yaml
│           ├── public_online_users.yaml
│           ├── public_user_message.yaml
│           ├── public_users.yaml
│           ├── public_workspace.yaml
│           ├── public_workspace_member.yaml
│           ├── public_workspace_user_type.yaml
│           └── tables.yaml
├── query_collections.yaml
├── remote_schemas
│   └── remote_schemas.yaml
├── rest_endpoints.yaml
└── version.yaml
```

- `actions.graphql` - This file contains the GraphQL types defined for the Actions. Note that types can shared between Actions and this would be the single source of truth.
- `actions.yaml` - It contains the action definition like the query/mutation and the handler config.
- `allow_list.yaml` - It contains the configuration for Allow Lists to restrict the queries made to the server.
- `cron_triggers.yaml` - It contains metadata about the Scheduled Triggers created.
- `databases` - This is a directory that contains all the connected databases for this project.
    - `functions` - This contains the Postgres functions to be tracked.
    - `tables` - All postgres tables and views that need to be exposed over GraphQL along with their permission information.
- `inherited_roles.yaml` - This contains the definition for all inherited roles.
- `query_collections.yaml` - Queries can be grouped inside a collection. This file contains such groups.
- `remote_schemas.yaml` - Metadata about all the Remote Schemas added including information about the GraphQL endpoint and optional headers.
- `rest_endpoints.yaml` - Metadata of all the RESTified endpoints that are created for a given GraphQL query.
- `version.yaml` - Version of the metadata being used. Currently it is version 3.

In our slack schema, we have the `tables` directory populated with all the postgres tables and the role based permissions for the same. As we keep changing the schema and modify metadata related to it, these files would be updated automatically.

## Import/Export Metadata from Console {#import-export-metadata}

Hasura Console Settings page has the option to quickly import/export metadata in `.json` format.
