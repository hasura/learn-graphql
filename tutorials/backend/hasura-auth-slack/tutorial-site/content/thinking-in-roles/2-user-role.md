---
title: "User role for the app"
metaTitle: "User role | Hasura Auth Slack Tutorial"
metaDescription: "Learn how to apply all the administrative and non-administrative actions with user role"
---

In this realtime slack app, we need to restrict all querying only for logged in users. We assume that data is not publicly accessible. Everything revolves around what users do on the app.
Also certain columns in tables need not be exposed to the user.

Let's see the different responsibilities that a user can have.

## Administrative {#adminstrative}

All administrative tasks require write access to the database. Some of the administrative tasks are

- Create and manage workspaces
- Create and manage channels
- Add members to workspace and channel

## Non Administrative {#non-administrative}

Non-administrative tasks require scoped read and write access to the database.

For example, in a Slack app you have Members. They can join a Slack workspace. They can use Slack to communicate and collaborate with other members.

- User can read and send messages to channels
- User can read and send messages to other users in the same workspace

We need to be able to apply these actions to a role. We will see how in the next section.