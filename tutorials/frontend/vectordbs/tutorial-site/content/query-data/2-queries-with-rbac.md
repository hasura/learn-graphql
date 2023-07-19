---
title: "Queries with access control"
metaTitle: "Query data | Fullstack VectorDB Tutorial"
metaDescription: "A fullstack VectorDB tutorial using Next.js, React, TypeScript, and Hasura"
---

Hasura has a robust [permissions system](https://hasura.io/docs/latest/auth/authorization/index/) that allows for
granular authorization. We'll use this system to define permissions on the data we just imported. As our application is
meant to be a helpful tool for HR managers, it would make sense for a user to only see information relevant to them.

We can do this easily by defining `SELECT` permission on our `hiring_manager` relationship. Head to the `Data` tab and
click on the `Resumes` table of the `Resumes` database. Then, click the `Permissions` tab, create a role named `manager`
and choose `SELECT` as shown in the screenshot below. You can copy and paste this rule into the first line of the
editor, or configure it using the dropdown GUI, which is available after clicking the `With custom check` radio button.

```
{"application_relationship":{"hiring_manager":{"_eq":"x-hasura-manager-id"}}}
```

![Access control](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/access_control_image.png)

Then, expand the `Column select permissions` and toggle all. Then, click `Save Permissions`.

Adding this rule does the magic! If we head back to the `API` tab of the Console and run a query with the
`x-hasura-manager-id` and `x-hasura-role` headers added, we'll now only see the applications belonging to the manager's
`id` in `x-hasura-manager-id` 🎉

![RBAC query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vectordb/RBAC_query_image.png)
