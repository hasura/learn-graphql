---
title: "Tables for Slack Clone"
metaTitle: "Tables | Hasura Auth Slack Tutorial"
metaDescription: "Data modeling for Slack Clone"
---

Let's get started by looking at the data model.

## Users {#users}

The primary functionality of the app revolves around users and their messages. 

So we have the following tables.

- `users` and `user_message`

## Workspace {#workspace}

Slack app has workspaces where users can join. It is managed by the owner and the admins of the workspace. The following tables takes care of this requirement.

- `workspace`, `workspace_member` and `workspace_user_type`

## Channel {#channel}

Each workspace can have channels scoped to a specific topic of discussion having subset of members from the workspace. Members of the channel can post messages to the channel that everyone can see.

- `channel`, `channel_member`, `channel_thread` and `channel_thread_message`

The final model roughly looks like the following with basic relational columns:

![Slack Data Model](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-datamodel.png)

Note that it doesn't have the detailed column list, but it should give an idea of the relationships between different entities.
