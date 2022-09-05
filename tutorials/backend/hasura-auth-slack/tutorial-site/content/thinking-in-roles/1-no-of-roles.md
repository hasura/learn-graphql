---
title: "Defining Roles"
metaTitle: "Defining Roles | Hasura Auth Slack Tutorial"
metaDescription: "Learn how to choose between single vs multiple roles"
---

In this section, we will look at how to generally approach modeling roles for permissions with Hasura.

Traditionally you will consider multiple roles based on responsibilities assigned to user.

In the slack app model, a quick analysis will give you possibilities for multiple roles. There are `users` of the app, `workspace owners` who control and manage the workspace, `workspace admins` who have a subset of permissions to manage the workspace, `channel admins` and so on. But the important thing to note is, they are all `users` of the app with just extra permissions to read / write some data. This leaves us to define just a single role called `user` which can accommodate the above permission layer. We will see how in the sections later.

You will most likely need only one role with Hasura for users of your app. But there are cases where you genuinely need multiple roles to control data access.

## The case for multiple roles {#multiple-roles}

So when are multiple roles used for defining permissions? Let's take a look at the some of the use cases.

#### Logged in vs Publicly accessible data {#logged-in-publicly}

When some part of the data in the app is publicly visible but some are available only for logged in users, then multiple roles is the way forward. In the slack app, everything is assumed to be available only for logged in users.

#### Different access to columns {#different-access}

In cases where the columns which can be accessed differ based on who is logged in, then multiple roles are used. For example, in the slack app model, the workspace owner can see some columns which are sensitive and restricted read access to other users, then naturally we need to define multiple roles.

#### Backend support / admin teams {#backend-support}

If your app has admin/customer support/analytics teams which needs read access across tables without restrictions, then they will have their own individual roles.

You can get away with a single role if you don't have the above constraints.



 