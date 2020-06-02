---
title: "Permissions for Channels"
metaTitle: "Permissions for Channels | Hasura Auth Slack Tutorial"
metaDescription: "In this part, we will learn how to create permissions for channels of the app"
---

## Select permission

We need to see what channel data is accessible to users. The criteria looks simple:

- Anybody who is a member of a channel should be able to read data about that channel.

This is a typical boolean expression where you say the one who is trying to access a record in the channel table must be part of the channel `channel_members.user_id = X-Hasura-User-Id`

### Row level select

The expanded valid boolean expression of the above statement looks like this:

```
{
  "channel_members": {
    "user_id": {
      "_eq": "X-Hasura-User-Id"
    }
  }
}
```

### Column level select

After filtering out the rows that a user is supposed to acccess, we need to filter out which fields they are allowed to read. Since there is no sensitive data that needs to be restricted to only a certain type of user, we give permission to select for all columns.

We are done with read access. Let's move on to write access which lets a user to either create, update or delete a channel.

## Insert permission

Are the users of the app allowed to directly insert into `channel` table?
Yes, any authenticated user who is an owner or an admin is allowed to create a channel on their own. But they can create channels only in workspaces they are part of. It translates into the following expression:

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

We use the `_and` boolean expression to say both conditions need to be satisfied. The user_type table is an enum with values `owner`, `admin` and `member`. Both owners and admins of the workspace can create a channel and hence the above expression.

### Column Presets

In the channel table, the `created_by` should be automatically set to the session variable `X-Hasura-User-Id` and the user shouldn't be allowed to set this value. We use Column Presets in this case to achieve this.

## Update permission

Who is allowed to update the existing data in `channel` table?

Only an authenticated user of the app and the owner or admin of the workspace should be allowed to update the data in the workspace.

### Row level update

The above condition translates to the following expression (same as above)

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

### Column level update

We need to fix up on what columns the user is allowed to update directly from the app. Only a channel's public status and name can be allowed to change. (`is_public` and `name`).

## Delete permission

The owner of the workspace and the admins should be the only user(s) who should be able to delete the channel. This again translates into the above boolean expression (same as insert and update).

Do note that, in case the channel is deleted all the dependent records in all other tables should also be removed. Hence this can be done as a single operation by the admin role at the server side instead of allowing direct delete of the channel from the client. The other option is to use ON DELETE triggers to perform a cascade delete which will remove all the dependent rows across the database.
