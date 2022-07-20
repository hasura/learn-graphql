---
title: "Create todos - mutation"
metaTitle: "Mutation to create todos | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "GraphQL Mutation to create new personal todos. Try the mutation in GraphiQL, passing the Authorization token to get authenticated results."
---

In this part of the tutorial, you will learn how to create new todos by using GraphQL Mutations.

Let's define a graphql mutation to perform insert into todos. In the file `src/graphql-operations/index.ts`, add the following:


```ts
export const INSERT_TODOS_ONE = gql`
    mutation insert_todos_one($object: todos_insert_input!) {
        insert_todos_one(object: $object) {
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

