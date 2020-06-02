---
title: "Fetch todos - query"
metaTitle: "GraphQL Query to fetch todos | Next.js GraphQL Serverless Tutorial"
metaDescription: "GraphQL Query to fetch personal todos. Try the query in GraphiQL, passing the Authorization token to get authenticated results"
---

The first graphql query you will write will be to fetch personal todos. You will need to load the todo data from the database which belongs to the logged in user. Let's define a graphql query to fetch the required data.

```graphql
query getMyTodos {
  todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
    id
    title
    created_at
    is_completed
  }
}
```

Try this query in Hasura Console against the application database to see what the response looks like.

**Note**: You need to pass the `Authorization: Bearer <token>` header before querying to get the results. 

This query is the actual graphql query that we will be using in our Next.js app and hence test this out to make sure it works as expected.

Let's now integrate this graphql query into our app.