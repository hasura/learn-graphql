---
title: "Permissions for Workspaces"
metaTitle: "Permissions for Workspaces | Hasura Auth Slack Tutorial"
metaDescription: "In this part, we will learn how to create permissions for workspaces of the app"
---

## Select permission {#select-permission}

Which workspace data is allowed to be read by a logged in user of Slack?

- Anybody who is a member of a workspace should be able to read data about their workspace.

This is a typical boolean expression where you say the one who is trying to access a record in the workspace table must either be the owner `owner_id = X-Hasura-User-Id` or they must be part of the same workspace `workspace_members.user_id = X-Hasura-User-Id`

### Row level select {#row-level-select}

The expanded valid boolean expression of the above statement looks like this:

```
{
  "_or": [
    {
      "owner_id": {
        "_eq": "X-Hasura-User-Id"
      }
    },
    {
      "workspace_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  ]
}
```

### Column level select {#column-level-select}

After filtering out the rows that a user is supposed to access, we need to filter out which fields they are allowed to read. Since there is no sensitive data that needs to be restricted to only a certain type of user, we give permission to select for all columns.

We are done with read access. Let's move on to write access which lets a user to either create, update or delete.

## Insert permission {#insert-permission}

Are the users of the app allowed to directly insert into `workspace` table?
Yes, any authenticated user is allowed to create a workspace on their own. It translates into the following expression:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Column Presets {#column-presets}

You can set static values or session variables as default values for the column while doing an insert.

In the workspace table, the owner_id should be automatically set to the session variable `X-Hasura-User-Id` and the user shouldn't be allowed to set this value. We use Column Presets in this case to achieve this.

![Slack workspace user insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-workspace-user-insert.png)

## Update permission {#update-permission}

Who is allowed to update the existing data in `workspace` table? 

Only an authenticated user of the app and the owner of the workspace should be allowed to update the data in the workspace.

### Row level update {#row-level-update}

The above condition translates to the following expression:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Update the row only if the `owner_id` of the column matches the id value of the authenticated user (`X-Hasura-User-Id`)

### Column level update {#column-level-update}

We need to fix up on what columns the user is allowed to update directly from the app. A simple checklist would be to NOT allow the user to update the `id`, `owner_id`, and `created_at` values. The remaining columns can be allowed.

## Delete permission {#delete-permission}

The owner of the workspace should be the only user who should be able to delete the workspace. This again translates into the following expression:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Do note that, in case the workspace is deleted all the dependent records in all other tables should also be removed. Hence this can be done as a single operation by the admin role at the server side instead of allowing direct delete of the workspace from the client. The other option is to use ON DELETE triggers to perform a cascade delete which will remove all the dependent rows across the database.
