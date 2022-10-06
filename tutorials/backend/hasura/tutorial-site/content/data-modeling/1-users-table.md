---
title: "Create users table"
metaTitle: "Create users table | Hasura GraphQL Tutorial"
metaDescription: "Let's create users table with Hasura console by heading to Data tab and clicking on Create table"
---

Let's get started by creating the `users` table.

The `users` table will have the following columns:

- `id` (type Text and Unique),
- `name` (type Text),
- `created_at` (type Timestamp and default now())
- `last_seen` (type Timestamp and nullable)

The columns are associated with properties of users. The `last_seen` column is used to store the latest timestamp of when the user was online.

In the Hasura Console, head over to the `DATA` tab section and click on the database (from the left side navigation) that we connected earlier. The database name would be `default` and the schema name would be `public`. Once you land on the `public` schema, click on `Create Table`. Enter the values for creating the table as mentioned above. For the table property of `Primary Key`, use `id`.

![Create table users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

Once you are done, click on `Add Table` button to create the table.

Great! You have created the first table required for the app.
