---
title: "Apply migrations"
metaTitle: "Apply migrations | Hasura Auth Tutorial"
metaDescription: "Lets create tables, relationships"
---

Let's get started by creating the tables, relationships and permissions.

Download the migrations from here

```bash
hasura migrate apply
```

Great! You have created the tables for the app.

Now let's create relationships for the app by applying metadata.

```bash
hasura metadata apply
```