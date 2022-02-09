---
title: "Remove todos - mutation"
metaTitle: "Mutation to delete todos | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "GraphQL Mutation to delete existing personal todos. Try the mutation in GraphiQL, passing the Authorization token to delete a todo"
---

In this part of the tutorial, you will learn how to remove existing todos by using GraphQL Mutations.

Let's define a graphql query to do a mutation into todos. In the file `src/graphql-operations/index.ts`, add the following:

```ts
export const DELETE_TODOS_BY_PK = gql`
    mutation delete_todos_by_pk($id: Int!) {
        delete_todos_by_pk(id: $id) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`
```

[Try](https://hasura.io/learn/graphql/graphiql) this mutation in GraphiQL against the application database to see what the response looks like. You will also need to pass in the values for the variables.

Let's now integrate this graphql mutation into our vue app.