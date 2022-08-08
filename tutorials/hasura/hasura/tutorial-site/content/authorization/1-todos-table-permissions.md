---
title: "Setup todos table permissions"
metaTitle: "Setup todos table permissions | Hasura GraphQL Tutorial"
metaDescription: "This tutorial covers how to set up permissions for todos table for insert, select, update and delete operations using Hasura console"
---

Head over to the Permissions tab under `todos` table to add relevant permissions.

## Insert permission {#insert-permission}

We will allow logged-in users creating a new todo entry to only specify the `is_public` and `title` columns.

- In the enter new role textbox, type in “user”
- Click on edit (pencil) icon for “insert” permissions. This would open up a section below, which lets you configure custom checks and allow columns.
- In the custom check, choose the following condition

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![Todos row permission insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

Now under "Column insert permissions", select the `title` and `is_public` columns.

![Todos insert column permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

Finally under "Column presets", select `user_id` from `from session variable` mapping to `X-HASURA-USER-ID`.

**Note:** Session variables are key-value pairs returned from the authentication service for each request. When a user makes a request, the session token maps to a `USER-ID`. This `USER-ID` can be used in permission to show that inserts into a table are only allowed if the `user_id` column has a value equal to that of `USER-ID`, the session variable.

Click on `Save Permissions`.

## Select permission {#select-permission}

We will allow users to view a todo entry if it is public or if they are logged-in users.

Now click on edit icon for "select" permissions. In the custom check, choose the following condition

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![Todos select permission row](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

Under "Column select permissions", select all the columns.

![Todos select column permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

Click on `Save Permissions`

## Update permission {#update-permission}

We will only allow the `is_completed` column to be updated by a user.

Now click on edit icon for "update" permissions. In the pre-update custom check, choose `With same custom checks as insert`.

And under "Column update permissions", select the `is_completed` column.

![Todos update permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

Click on `Save Permissions` once done.

## Delete permission {#delete-permission}

Only logged-in users are allowed to delete a todo entry.

Finally for delete permission, under custom check, choose `With same custom checks as insert, pre update`.

![Todos delete permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

Click on `Save Permissions` and you are done with access control for `todos` table.
