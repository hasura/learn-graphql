---
title: "Data Modeling: Slack"
metaTitle: "Slack Data Modeling with Hasura | Hasura Auth Slack Tutorial"
metaDescription: "This tutorial covers how to do data modeling in Postgres and create tables using Hasura console for a Slack Clone"
---

In this part of the course, we will build the [data model](https://hasura.io/docs/latest/schema/common-patterns/data-modeling/index/) for a realtime slack clone. Our slack app will have the following basic features:

- Users can signup.
- Users can create workspaces.
- Workspaces can be managed by the owner of the workspace or the admin of the workspace.
- Users can be added to channels in the workspace they are part of.
- Users can send messages to channels in the workspace they are part of.
- Users can send messages to other users in the same workspace.
- Users can see which users are online in the workspace they are part of.

Broadly this means that we have few top level models in this app.

We will go over them in the subsequent steps.