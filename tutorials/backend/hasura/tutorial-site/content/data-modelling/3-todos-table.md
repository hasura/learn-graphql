---
title: "Create table todos"
metaTitle: "Create table todos | Hasura GraphQL Tutorial"
metaDescription: "Let's create table todos with Hasura console by heading to Data tab and clicking on Create table"
---



Now let's move on to creating the other model `todos`

The `todos` table will have the following columns:

- `id` (type integer;auto-increment), 
- `title` (type text), 
- `is_completed` (type boolean and default false)
- `is_public` (type boolean and default false)
- `created_at` (type timestamp and default now())
- `user_id` (type text) 

The columns are mostly self-explanatory.

In the Hasura Console, head over to the `Data` tab section and click on `Create Table`. Enter the values for creating the table as mentioned above.

![Create table users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

Once you are done, click on `Add Table` button to create the table.
