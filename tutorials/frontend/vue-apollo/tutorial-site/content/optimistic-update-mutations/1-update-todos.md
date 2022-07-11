---
title: "Update todos - mutation"
metaTitle: "Mutation to update todos | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "GraphQL Mutation to update existing personal todos. Try the mutation in GraphiQL, passing the Authorization token to mark a todo as completed"
---

In this part of the tutorial, you will learn how to mark an existing todo as completed by using GraphQL Mutations.

Let's define a graphql query to do a mutation into todos. In the file `src/graphql-operations/index.ts`, add the following:

```ts
export const UPDATE_TODO_BY_PK = gql`
    mutation update_todos_by_pk($pk_columns: todos_pk_columns_input!, $_set: todos_set_input!) {
        update_todos_by_pk(pk_columns: $pk_columns, _set: $_set) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`
```

You will also need to pass in the values for the variables.

[Try](https://hasura.io/learn/graphql/graphiql) this mutation in GraphiQL against the application database to see what the response looks like.

Let's now integrate this graphql mutation into our vue app.
