---
title: "Create relationship to user"
metaTitle: "Create Manual Relationship from View | Hasura GraphQL Tutorial"
metaDescription: "In this part, we learn how to create a manual relationship from the view to the table using the Hasura Console"
---

Now that the view has been created, we need a way to be able to fetch user information based on the `id` column of the view. Let's create a manual relationship from the view `online_users` to the table `users` using the `id column` of the view.

Head to Console -> Data -> online_users -> Relationships page and click the Configure button to add a new relationship manually.

Set the relationship type to be `Object Relationship`. Enter the relationship name as `user`.
Select `users` as the reference table, and choose `id` for both the From and To columns.

We are mapping the current view's `id` column to the `users` table's `id` column to create the relationship.

![create relationship from view](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

Let's explore the GraphQL APIs for the relationship created.

```graphql
query {
  online_users {
    id
    last_seen
    user {
      id
      name
    }
  }
}
```

Great! We are completely done with data modeling for the app.
