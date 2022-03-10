---
title: "Try out Relationship Queries"
metaTitle: "Try out Relationship Queries | Hasura GraphQL Tutorial"
metaDescription: "Explore GraphQL APIs for the table todos with queries and nested data using Hasura GraphQL Engine"
---

Let's explore the GraphQL APIs for the relationship created. Head back to the  the `API` tab and run the following query in the GraphiQL interface:

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

You can see the response in the following format:

![relationship query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

As you can see, in the same response, you are getting the results for the user's information nested within each todo item. The response exactly matches the structure of your query, even though the data is being retrieved from two different tables. This is an example of a one-to-one query/object relationship.
