---
title: "Apply Migrations"
metaTitle: "Apply Migrations | Hasura Auth Slack Tutorial"
metaDescription: "hasura migrate apply for creating tables and relationships"
---

Let's get started by creating the tables and relationships for the Slack app.

## Download the hasura project with migrations {#download}

1. Clone the [learn-graphql](https://github.com/hasura/learn-graphql) repo. Execute the following commands in your terminal:

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/backend/hasura-auth-slack/slack-backend
```

2. Navigate to the `slack-backend` directory.

```bash
cd tutorials/backend/hasura-auth-slack/slack-backend
```

Configure the endpoint to point to the Hasura Cloud app URL. Open the `config.yaml` file and set the endpoint value.

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**Note:** Your endpoint will be different based on your Hasura project.

Now let's apply the [migrations](https://hasura.io/docs/latest/migrations-metadata-seeds/manage-migrations/).

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --database-name default --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

**Note**: When you apply metadata, you might initially get the warning saying, `Metadata is inconsistent`. This comes up because the tables are actually not yet created and will not be a problem once you do the `migrate apply` step.

This will create the tables and relationships for the slack app.

Great! Now navigate to the Hasura Console to see the tables with relationships.
