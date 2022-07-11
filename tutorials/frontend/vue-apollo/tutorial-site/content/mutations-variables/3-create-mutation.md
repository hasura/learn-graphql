---
title: "Run mutation, update cache"
metaTitle: "Vue Apollo Mutation using $apollo.mutate | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "We will use the Apollo client mutation method $apollo.mutate from vue-apollo as an example to insert new data and update cache locally using readQuery and writeQuery."
---

import GithubLink from "../../src/GithubLink.js";

Now let's do the integration part. Open `src/components/TodoInput.vue` and add the following code below to make the mutation.

```ts
+ import { gql } from "graphql-tag"

async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
-    // Code to add todo here
+    const title = todoTitle && todoTitle.trim()
+    const is_public = type === "public"
+
+    // insert new todo into db
+    const result = await insertTodoMutation.mutate(
+        {
+            object: {
+                title,
+                is_public,
+            },
+        },
+        {
+            optimisticResponse: {
+                insert_todos_one: {
+                    __typename: "todos",
+                    id: -1,
+                    title,
+                    is_public,
+                    is_completed: false,
+                    created_at: new Date().toISOString(),
+                    updated_at: new Date().toISOString(),
+                },
+            },
+        }
+    )
+    console.log("Result:", result)
}
```

## useMutation()

In the `addTodo` function defined above, we first define the values for title of the todo and the type of the todo (private or public?). Then in order to do a mutation, we make use of `useMutation()`.

The mutate function optionally takes `variables`, `optimisticResponse` and `update`; You are going to make use of the `update` function later. Right now we have written a `console.log()` to test if the mutation works as expected.

Note that we are passing the variables `todoTitle` and `isPublic` as required for the mutation to work.

The mutation has been integrated and the new todos will be inserted into the database. But the UI doesn't know that a new todo has been added. We need a way to tell Apollo Client to update the query for the list of todos.

## update cache

The `update` function comes in handy to update the cache for this mutation. It comes with utility functions such as `readQuery` and `writeQuery` that helps in reading from and writing to the cache.

Let's implement `update` for the above mutation.

We need to fetch the current list of todos from the cache. 

In the same file `TodoInput.vue`, make the following changes, to modify the `update` function to read and write to cache.

```ts
async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
    const title = todoTitle && todoTitle.trim()
    const is_public = type === "public"

    // insert new todo into db
    const result = await insertTodoMutation.mutate(
        {
            object: {
                title,
                is_public,
            },
        },
        {
            optimisticResponse: {
                insert_todos_one: {
                    __typename: "todos",
                    id: -1,
                    title,
                    is_public,
                    is_completed: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            },
+           update(cache, { data: { insert_todos_one } }) {
+               cache.modify({
+                   fields: {
+                       todos(existingTodos = []) {
+                           const newTodoRef = cache.writeFragment({
+                               data: insert_todos_one,
+                               fragment: gql`
+                                   fragment NewTodo on Todo {
+                                       id
+                                       title
+                                       is_public
+                                       is_completed
+                                       created_at
+                                       updated_at
+                                   }
+                               `,
+                           })
+                           return [newTodoRef, ...existingTodos]
+                       },
+                   },
+               })
+           },
        }
    )

    console.log("mutate result", result)
}
```

Let's dissect what's happening in this code snippet.

Our goals were simple:

- Make a mutation to insert the new todo in the database.
- Once the mutation is done, we need to update the cache so that the changes are reflected in the UI.

The `update` function is used to update the cache after a mutation occurs.

It receives the result of the mutation (`data`) and the current cache as arguments. You will then use these arguments to manage your cache so that the UI will be up to date.

We have already done the mutation to the graphql server using the mutate function. Our goal was to update the UI. This is where `cache.modify()` comes to the rescue. `cache.modify()` will allow you to change data in your local cache, but it is important to remember that they will not change any data on your server (exactly what we need).

  Any subscriber to the Apollo Client store will instantly see this update and render new UI accordingly.

We concatenate our new todo from our mutation with the list of existing todos and write the query back to the cache with `cache.modify()`

Now, the `TodoPrivateList` component using the Apollo object with the same query will get the updated todo list as it is automatically subscribed to the store.

Great! That was actually easy :)

Let's wrap this by adding a line of code to clear the input value once the mutation is successful.

```ts
async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
+    // Reset the input field
+    newTodoTitle.value = ""
```

