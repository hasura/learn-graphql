---
title: "Access Control"
metaTitle: "Authorization with Hasura | Hasura Auth Slack Tutorial"
metaDescription: "This part of the tutorial covers how to do Authorization in Hasura GraphQL Engine by defining role based access control rules for the models."
---

In this part of the tutorial, we are going to define role based access control rules for each of the models that we created. [Access control rules help](https://hasura.io/docs/latest/auth/authorization/permission-rules/) in restricting querying on a table based on certain conditions.

Access control rules can be applied on

- Row level
- Column level

## Row Level {#row-level}

With row level access control, users can access tables without having access to all rows on that table. This is particularly useful to protect sensitive personal data which is part of the table. This way, you can allow all users to access a table, but only a specific number of rows in that table.

![Row Level Access Control](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/row-level-access-control.png)

## Column Level {#column-level}

Column level access control lets you restrict access to certain columns in the table. This is useful to hide data which are not relevant, sensitive or used for internal purposes. A typical representation of data looks like:

![Column Level Access Control](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/column-level-access-control.png)

As you can imagine, combining both these rules gives a flexible and powerful way to control data access to different stakeholders involved.

## Types of operations {#types-of-operations}

Access control rules can be applied to all the CRUD operations (Create, Read, Update and Delete). Some operations can be completely restricted to not allow the user perform the operation.

In the previous section we learnt that the slack app requires a role called `user`. We will create permissions for this role in the next part.