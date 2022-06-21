---
title: "Permissions for Users"
metaTitle: "Permissions for Users | Hasura Auth Slack Tutorial"
metaDescription: "In this part, we will learn how to create permissions for users of the app"
---

Slack app revolves around users. We start off by setting permission rules for the users of the app for the CRUD operations.

## Select permission {#select-permission}

What user data is allowed to be read by a logged in user of Slack?

All logged in users can read user data of those who belong to the same workspace as the logged in user.

The requirement translates into something like:

- You can read your own user data.
- You can read user data of others who are part of the same workspace that you are a member of.

This is a typical boolean expression where you say the one who is trying to access a record in the users table must either belong to them `id = X-Hasura-User-Id` or they must be part of the same workspace `workspace_members.user_id = X-Hasura-User-Id`

### Row level select {#row-level-select}

The expanded valid boolean expression of the above statement looks like this:

```
{
  "_or": [
    {
      "id": {
        "_eq": "X-Hasura-User-Id"
      }
    },
    {
      "workspace_members": {
        "workspace": {
          "workspace_members": {
            "user_id": {
              "_eq": "X-Hasura-User-Id"
            }
          }
        }
      }
    }
  ]
}
```

### Column level select {#column-level-select}

After filtering out the rows that a user is supposed to access, we need to filter out which fields they are allowed to read. Apart from the `password` field, every column in the `users` table is accessible by any authenticated user, since there is no sensitive data that needs to be restricted to only the user.

![Users Column permissions](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-users-select-columns.png)

We are done with read access. Let's move on to write access which lets a user to either create, update or delete.

## Insert permission {#insert-permission}

Are the users of the app allowed to directly insert into `users` table?
No. A user signs up on the app which goes through the auth server which deals with user registration, validation, triggering welcome email and so on. Hence the auth server with access to admin role will insert the record into the `users` table post validation and generating the right token. We can skip defining permissions for the user role's insert operation.

## Update permission {#update-permission}

Who is allowed to update the existing data in `users` table?

As an authenticated user of the app, i should be able to update ONLY my own personal data.

### Row level update {#row-level-update}

The above condition translates to the following expression:

```json
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Update the row only if the `id` of the column matches the id value of the authenticated user (`X-Hasura-User-Id`)

### Column level update {#column-level-update}

We need to fix up on what columns the user is allowed to update directly from the app. A simple checklist would be to not allow the user to update their own `id`, `email`, and `created_at`. We are also going to restrict them to directly modify the `password` column since that is delegated to the auth server which does the necessary validation before the update.

## Delete permission {#delete-permission}

We do not want to allow the user to delete their own user record directly from the app and hence we can skip defining rules for this operation. This is assumed to be done by Auth servers which handles user management post validations for deleting user accounts.

## Potential for other roles {#potential-for-other-roles}

All of the above rules were applied for the user role. But let's say there are fields which are private to the user and not meant to be read by other users. For example, in our current model, `phone_number` field is assumed to be public. In case the requirement for it is to be private to the user, then we need to create a new role, let's call it `me` and define rules for select permission without the `phone_number` column.

The row level select rule will translate into something like this:

```
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

And the column level permission remains the same for the role `me` but the role `user` will not have access to `phone_number` column.
