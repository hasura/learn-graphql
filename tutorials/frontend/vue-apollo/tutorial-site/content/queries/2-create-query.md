---
title: "Smart Query"
metaTitle: "Vue Apollo Querying | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "We will use the reactive useQuery method from vue/@apollo-composable. Each query object becomes reactive and will be executed automatically both when the component is mounted, and when the query variables change."
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the Vue UI.
With Apollo Client, you can send queries in 3 different ways.

1. Using the Composition API (Recommended)
2. Using the Classic ("Options") API
3. Using Apollo Components

The recommended method is to use the Apollo Composition API, where you will just pass your GraphQL query in the `useQuery/useMutation/useSubscription` functions and it will fetch the data automatically then present it in the component data. Each one of them will become a reactive object. These reactive queries will be executed automatically, both when the component is mounted, and if/when any variable objects change.

Great! Now let's define the graphql query to be used:

Open `src/graphql-operations/index.ts` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/graphql-operations/index.ts" text="src/graphql-operations/index.ts" />

```ts
import { gql } from "graphql-tag"

export const SELECT_TODOS = gql`
    query todos(
        $where: todos_bool_exp!
        $order_by: [todos_order_by!]
        $limit: Int = 10
        $offset: Int
    ) {
        todos(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`
```

We have now written the graphql query as a javascript constant using the `gql` parser function. This function is used to parse the plain string as a graphql query.

What does this query do? 
------------------------
The query fetches `todos` with a simple condition; `is_public` must be false. We sort the todos descending by its `created_at` time according to the schema. We specify which fields we need for the todos node.

The query is now ready, let's integrate it with our Vue component.

Open `src/components/TodoPrivateList.vue` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/TodoPrivateList.vue" text="src/components/TodoPrivateList.vue" />

```ts
<script>
import { computed, reactive } from "vue"
import TodoItem from "../components/TodoItem.vue"

+ import { useMutation, useQuery, useResult } from "@vue/apollo-composable"
+ import { DELETE_TODOS, SELECT_TODOS } from "../graphql-operations"
+ 
+ // Used in both query and mutation (refetch query variables)
+ const selectTodosVariables = {
+     where: {
+         is_public: { _eq: false },
+     },
+     order_by: {
+         created_at: "desc",
+     },
+ }
+ 
+ const privateTodosQuery = useQuery(SELECT_TODOS, selectTodosVariables)
+ const privateTodos = useResult(privateTodosQuery.result, [], (data) => data?.todos)

const state = reactive({
    type: "private",
    filterType: "all",
    filteredTodos: computed(() => {
-        return privateTodos.filter((todo) => {
+        return privateTodos.value.filter((todo) => {
            switch (state.filterType) {
                case "completed":
                    return todo.is_completed
                case "active":
                    return !todo.is_completed
                default:
                    return true
            }
        })
    }),
    activeTodos: computed(() => privateTodos.value.filter((todo) => !todo.is_completed)),
    remainingTodos: computed(() => state.activeTodos.length),
})
```

Remember that we included `ApolloProvider` in our Vue app. This allows us to use the apollo object definition.

Let's remove the mock `todos` data which was used to populate sample data.

```ts
- const privateTodos = [
-     {
-         id: "1",
-         title: "This is private todo 1",
-         is_completed: true,
-         is_public: false,
-     },
-     {
-         id: "2",
-         title: "This is private todo 2",
-         is_completed: false,
-         is_public: false,
-     },
- ]
```

Woot! You have written your first GraphQL integration with Vue. Easy isn't it?

How does this work?
-------------------
Each query declared in the apollo definition (that is, which doesn't start with a $ char) in a component results in the creation of a smart query object.

## Properties
You have access to the following properties:

`loading`: A boolean that indicates whether the request is in flight. If loading is true, then the request hasn't finished. Typically this information can be used to display a loading spinner.

You can read more about other properties that Apollo passes [here](https://github.com/Akryum/vue-apollo/blob/master/docs/api/smart-query.md)

## Hooks
You can write a hook in your apollo definition to handle errors.

`error`: A runtime error with graphQLErrors and networkError properties. Contains information about what went wrong with your query.

Remember that we had defined the apollo object with `todos` smart query. The server returns an array todos which can be mapped over to render each `TodoItem`.

If you noted, there has been some client side filtering to the todos that are displayed. You can see this in the methods, `filterResults` to filter todos based on whether they were active or completed.
