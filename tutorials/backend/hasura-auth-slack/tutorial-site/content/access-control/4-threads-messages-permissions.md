---
title: "Permissions for Threads and Messages"
metaTitle: "Permissions for Threads and Messages | Hasura Auth Slack Tutorial"
metaDescription: "In this part, we will learn how to create permissions for threads and messages of the app"
---

We are done with rules for all the base tables (`users`, `workspace` and `channel`). The primary part of slack is for users to send and receive messages on the channel or to other users. Let's see how that is applicable in the access control rules.

Let's start with the `channel_thread` and `channel_thread_message` tables.

## Select permission {#select-permission}

We need to list down who can access a message posted on any channel. The requirement looks like:

- Any body who is a channel member should be able to access all channel threads.

### Row level select {#row-level-select}

The expression for `channel_thread` roughly translates to the following:

```json
{
  "channel": {
    "channel_members": {
      "user_id": {
        "_eq": "X-Hasura-User-Id"
      }
    }
  }
}
```
The expression differs slighlty for `channel_thread_message` since it has one more level of nesting.

```json
{
  "channel_thread": {
    "channel": {
      "channel_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  }
}
```

### Column level select {#column-level-select}

After filtering out the rows that a user is supposed to access, we need to filter out which fields they are allowed to read. Since there is no sensitive data that needs to be restricted to only a certain type of user, we give permission to select for ALL columns.

We are done with read access. Let's move on to write access which lets a user to either create, update or delete a channel.

## Insert permission {#insert-permission}

Any authenticated user who is a part of a workspace can post messages on the channels of the workspace. It translates into the same expression as above for `channel_thread` table.

## Update permission {#update-permission}

Users are not allowed to update a `channel_thread`.
So then who is allowed to update the existing messages in `channel_thread_message` table?

- Any authenticated user can update their own message posted on any channel.

### Row level update {#row-level-update}

The above condition translates to the following expression:

```json
{
  "user_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Column level update {#column-level-update}

The user can only update the `message` column in `channel_thread_message` table.

## Delete permission {#delete-permission}

The user who created the message can delete their own message. It translates to the same expression that we defined for the update operation.

Again as in the previous steps, CASCADE delete can be applied to remove all the dependent and dangling data.

