---
title: "Create Foreign Key"
metaTitle: "Create Foreign Key | Hasura GraphQL Tutorial"
metaDescription: "This part of the tutorial covers how to create Foreign key for a table column using Hasura console"
---

In the `todos` table, the value of `user_id` column must be ideally present in the `id` column of `users` table. Otherwise, it would result in inconsistent data.

[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) allows you to define foreign key constraint to enforce this condition.

Let's define one for the `user_id` column in `todos` table.

Head over to Console -> DATA -> todos -> Modify page.

It should look something like this:

![Todos Modify Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

Scroll down to `Foreign Keys` section at the bottom and click on `Add`.

![user_id foreign key](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- Select the Reference table as `users`
- Choose the From column as `user_id` and To column as `id`

We are enforcing that the `user_id` column of `todos` table must be one of the values of `id` in `users` table.

Click on `Save` to create the foreign key.

Great! Now you have ensured data consistency.
