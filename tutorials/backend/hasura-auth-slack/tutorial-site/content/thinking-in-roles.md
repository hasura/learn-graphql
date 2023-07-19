---
title: "Thinking in Roles"
metaTitle: "Thinking in Roles | Hasura Auth Slack Tutorial"
metaDescription: "Role based access control in Hasura lets the server control what data is accessed by each user on the client. This can enforce granular restrictions on data access."
---

In this part of the tutorial, we will look at how to model roles for the app.

[Role based access control](https://hasura.io/docs/latest/auth/authorization/index/) lets the server control what data is accessed by each user on the client. This can enforce granular restrictions on data access.

Let's think about the different set of roles applicable to users of Slack.

We can broadly classify roles as:
- `Hierarchical and Flat` or 
- `Administrative and Non-Administrative`

Every member in Slack has a role and each one has a different level of permissions. For example, every workspace in Slack has an owner who created it. The owner, along with a few admins would be able to completely manage the workspace where as the members of the workspace just get to participate.

On top of all these there's an admin role who can do everything in the backend from creating workspaces, users and deleting records.

Let's dissect each data model to see who can do what.
