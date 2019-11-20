---
title: "Apply migrations"
metaTitle: "Apply migrations | Hasura Auth Tutorial"
metaDescription: "Lets create tables, relationships"
---

Let's get started by creating the tables and relationships for the Slack app.

Download the hasura project with migrations from [here]()

Configure the endpoint to point to the heroku app URL. Open the `config.yaml` file and set the endpoint value.

```yaml
endpoint: https://hasura-auth.herokuapp.com
```

Now let's apply the migrations.

```bash
hasura migrate apply
```

This will create the tables for the app.

Now let's create relationships for the app by applying metadata.

```bash
hasura metadata apply
```

Great! Now navigate to the heroku app to see the tables with relationships.