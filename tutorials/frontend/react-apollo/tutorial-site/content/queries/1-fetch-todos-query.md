---
title: "Fetch todos - query"
metaTitle: "Query to fetch todo | GraphQL React Apollo Components Tutorial"
metaDescription: "GraphQL Query to fetch personal todos. Try the query in GraphiQL, passing the Authorization token to get authenticated results"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/e66SASjCncY" />

The first GraphQL query that we create will fetch personal todos. We will load the data from the database which belongs to the logged in user. Let's define a GraphQL query to fetch the required data.

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

[Try](https://hasura.io/learn/graphql/graphiql) this query in GraphiQL against the application database to see what the response looks like.

**Note**: You need to pass the `Authorization: Bearer <token>` header before querying to get the results. The token is auto-filled in the UI after logging in via Auth0.

This is the actual GraphQL query that we will be using in our react app so test it out to and make sure it works as expected.

Let's now integrate this GraphQL query into our react app.
