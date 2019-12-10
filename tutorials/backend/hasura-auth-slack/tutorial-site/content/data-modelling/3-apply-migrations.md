---
title: "Apply Migrations"
metaTitle: "Apply Migrations | Hasura Auth Slack Tutorial"
metaDescription: "hasura migrate apply for creating tables and relationships"
---

Let's get started by creating the tables and relationships for the Slack app.

Download the hasura project with migrations from [here](https://learn.hasura.io/graphql/hasura-auth-slack/slack-backend.zip)

Configure the endpoint to point to the heroku app URL. Open the `config.yaml` file and set the endpoint value.

```yaml
endpoint: https://hasura-auth.herokuapp.com
```

Now let's apply the migrations.

```bash
hasura migrate apply
```

This will create the tables and relationships for the slack app.

Great! Now navigate to the heroku app to see the tables with relationships.