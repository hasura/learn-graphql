---
title: "Setup users table permissions"
metaTitle: "Setup users table permissions | Hasura GraphQL Tutorial"
metaDescription: "This tutorial covers how to set up permissions for users table for insert, select, update and delete operations using Hasura console"
---

We also need to allow select and update operations into `users` table.
On the left sidebar, click on the `users` table to navigate to the users table page and switch to the Permissions tab.

## Select permission {#select-permission}

Click on the Edit icon (pencil icon) to modify the select permission for role user. This would open up a section below which lets you configure its permissions.

Here the users should be able to access every other user's `id` and `name` data.

![users select permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

Click on `Save Permissions`

## Update permission {#update-permission}

The user who is logged in should be able to modify only their own record. So let’s set that permission now.

Now click on edit icon for "update" permissions. In the pre-update custom check, choose `With custom check` with following condition.

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

Under column update permissions, select `last_seen` column, as this will be updated from the frontend app.

![users update permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/new-users-pre-update-post-update-permissions.png)

Click on `Save Permissions` and you are done with access control rules for `users` table.



