---
title: "Test out permissions"
metaTitle: "Test out permissions | Hasura GraphQL Tutorial"
metaDescription: "Explore permissions for the GraphQL API for the todos table and see how data access is restricted"
---

Let's go ahead and start testing the permissions through the GraphQL API for `todos` table.

## Query {#query}

Now let's go ahead and query the data by adding two request headers:

- `x-hasura-role`: `user`
- `x-hasura-user-id`: `1`

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

You should get a response looking something like this:

![Todo Query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-permission-testing.png)

Note that the response received is filtered for the user id `1`. If you change the value for `x-hasura-user-id` to `2`, the data would be returned only for the user id `2`. This confirms the permissions that we configured in the previous steps.

You can test the permission configuration similarly for the `users` table as well.
