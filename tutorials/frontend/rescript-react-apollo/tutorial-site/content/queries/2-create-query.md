---
title: "useQuery hook"
metaTitle: "Apollo useQuery React hook | ReScript React Apollo GraphQL Tutorial"
metaDescription: "We will use the Apollo Client useQuery React hook from @apollo/client to make GraphQL queries"
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the react UI.

Create a new file with name TodosQuery.res and add the following code to create a todos query ReScript module.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/Todo/TodosQuery.res" text="src/components/Todo/TodosQuery.res" />

```reason
let make = %graphql(`
  query {
    todos(
      where: { is_public: { _eq: false } }
      order_by: [{ created_at: desc }]
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`)
```

`%graphql` is a GraphQL primitive from graphql-ppx. In addition to creating a query that you can pass to the client, it will also generate the types of the data that we get back from the GraphQL server.

We created a separate module for this query to reuse it in multiple places.

We can intergate the GraphQL query in a React component as follows

```reason
@react.component
let make = () => {
  let todosResult = TodosQuery.use()

  switch todosResult {
  | {data: Some({todos})} => <TodoPrivateList todos={todos} />
  | _ => React.null
  }
}
```

## How does this work?

`TodosQuery.use()` uses `useQuery` React hook from Apollo and fetches the data automatically.
When you use the `useQuery` React hook, Apollo returns the data along with other properties. Most important ones are:

`loading`: A boolean that indicates whether the request is in flight. If loading is true, then the request hasn't finished. Typically this information can be used to display a loading spinner.

`error`: A runtime error with graphQLErrors and networkError properties. Contains information about what went wrong with your query.

`data`: An object containing the result of your GraphQL query. This will contain our actual data from the server. In our case, it will be the todo data.

You can read more about other properties that result object contains [here](https://www.apollographql.com/docs/react/data/queries/)

Using the `data` property, we are parsing the results from the server. In our query, `data` property has an array `todos` which can be mapped over to render each `TodoItem`. We can use ReScript's Pattern Matching feature to destructure todos from todosResult.
