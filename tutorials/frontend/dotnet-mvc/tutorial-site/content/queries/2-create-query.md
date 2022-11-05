---
title: "useQuery hook"
metaTitle: "Strawberry Shake Query | ASP.NET MVC GraphQL Tutorial"
metaDescription: "We will use the Apollo Client useQuery React hook from @apollo/client to make GraphQL queries"
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the ASP.net MVC application.

## Create a GraphQL Query
We will now take our GraphQL query and create `GetTodos.graphql` in our application. We will use the Strawberry Shake GraphQL client to create the query class.

1. Create a new File `GetTodos.graphql` in the application. Add the following to the file:

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

2. Compile your project
  
  ```bash
  dotnet build
  ```

This will generate a folder `TodoClient/Generated` with the client code.