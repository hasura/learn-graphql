---
title: "Mutation and update cache"
metaTitle: "Apollo client.mutate for GraphQL mutation update | Svelte Apollo GraphQL Tutorial"
metaDescription: "We will use the mutation from Svelte Apollo client as an example to modify existing data and update cache locally using readQuery and writeQuery and handle optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Now let's do the integration part. Open `src/components/Todo/TodoItem.svelte` and add the following code below the other imports:

```javascript
+ import { gql } from "@apollo/client/core";
```

Let's define the graphql mutation to update the completed status of the todo

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/Todo/TodoItem.svelte" text="src/components/Todo/TodoItem.svelte" />

```javascript
  import { gql } from "@apollo/client/core";

+  const TOGGLE_TODO = gql`
+    mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
+      update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
+        affected_rows
+      }
+    }
+  `;

  const toggleTodo = () => {};
```

### Apollo Mutation

We need to use `mutation` function from `apollo-svelte` to make the mutate function.

```javascript
  import { gql } from "@apollo/client/core";
+ import { mutation } from "svelte-apollo";

  const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `;

+  const toggleTodoMutation = mutation(TOGGLE_TODO);

```

We already have the onChange handler toggleTodo for the input. Let's update the function to make a use of `toggleTodoMutation` mutate function.

```javascript
  const toggleTodo = () => {
+    toggleTodoMutation({
+      variables: {id: todo.id, isCompleted: !todo.is_completed},
+      optimisticResponse: true,
+    });
  };
```

The above code will just make a mutation, updating the todo's is_completed property in the database.
To update the cache, we will be using the `update` function again to modify the cache. We need to fetch the current list of todos from the cache before modifying it. So let's import the query.

```javascript
+ import {GET_MY_TODOS} from './queries';
```

Now let's add the code for `update` function.

```javascript
  const toggleTodo = () => {
    toggleTodoMutation({
      variables: {id: todo.id, isCompleted: !todo.is_completed},
      optimisticResponse: true,
+      update: (cache) => {
+        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
+        const newTodos = existingTodos.todos.map(t => {
+          if (t.id === todo.id) {
+            return {...t, is_completed: !t.is_completed};
+          } else {
+            return t;
+          }
+        });
+        cache.writeQuery({
+          query: GET_MY_TODOS,
+          data: {todos: newTodos}
+        });
+      }
    });
  };

```

We are fetching the existing todos from the cache using `cache.readQuery` and updating the is_completed value for the todo that has been updated.

Finally we are writing the updated todo list to the cache using `cache.writeQuery`.
