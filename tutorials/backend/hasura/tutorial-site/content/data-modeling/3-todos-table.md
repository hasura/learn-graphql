---
title: "Create todos table"
metaTitle: "Create todos table | Hasura GraphQL Tutorial"
metaDescription: "Let's create todos table with Hasura console by heading to Data tab and clicking on Create table"
---

Now let's move on to creating the other model: `todos`

The `todos` table will have the following columns:

- `id` (type Integer (auto-increment)),
- `title` (type Text),
- `is_completed` (type Boolean and default false)
- `is_public` (type Boolean and default false)
- `created_at` (type Timestamp and default now())
- `user_id` (type Text)

The columns are associated with properties of todo items.

Remember to set the id column to the primary key.

In the Hasura Console, head over to the `DATA` tab section and click on `Create Table`. Enter the values for creating the table as mentioned above.

![Create table users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

Once you are done, click on `Add Table` button to create the table.
