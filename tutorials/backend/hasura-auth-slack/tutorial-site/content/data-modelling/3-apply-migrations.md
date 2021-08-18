---
title: "Apply Migrations"
metaTitle: "Apply Migrations | Hasura Auth Slack Tutorial"
metaDescription: "hasura migrate apply for creating tables and relationships"
---

Let's get started by creating the tables and relationships for the Slack app.

Download the hasura project with migrations from [here](https://hasura.io/learn/graphql/hasura-auth-slack/slack-backend.zip)

Configure the endpoint to point to the Hasura Cloud app URL. Open the `config.yaml` file and set the endpoint value.

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**Note:** Your endpoint will be different based on your Hasura project.

Now let's apply the migrations.

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

This will create the tables and relationships for the slack app.

Great! Now navigate to the Hasura Console to see the tables with relationships.
