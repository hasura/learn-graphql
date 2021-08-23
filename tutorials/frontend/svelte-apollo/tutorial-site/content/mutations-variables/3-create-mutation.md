---
title: "Apollo Mutation"
metaTitle: "Apollo Mutation | Svelte Apollo GraphQL Tutorial"
metaDescription: "We will use the mutation from Svelte Apollo in Svelte app as an example to insert new data and update cache locally using readQuery and writeQuery."
---

### Apollo Mutation

Now let's do the integration part. Open `src/components/Todo/TodoInput.svelte` and add the following code below the other imports:

```javascript
import { mutation } from "svelte-apollo";
```

Import the `mutation` function from `svelte-apollo` and pass the mutation query we wrote earlier

```javascript
const addTodoMutation = mutation(ADD_TODO);
```

When `mutation` is called with mutation query it return a mutate function. Read more about the mutate function [here](https://www.apollographql.com/docs/react/data/mutations/).

The mutate function optionally takes variables, optimisticResponse, refetchQueries, and update; You are going to make use of the `update` function later.

Let's define a state variable to store the value user types into the input field.

```javascript
+ let todoInput = "";

```

Let's bind the input value to `todoInput` to update state when user types into input field.

```javascript
  <form class="formInput" on:submit|preventDefault={addTodo}>
    <input
      class="input"
      placeholder="What needs to be done?"
+     bind:value={todoInput}
    />
    <i class="inputMarker fa fa-angle-right" />
  </form>
```

Now let's handle the form submit to invoke the mutation.

```
+ <form class="formInput" on:submit|preventDefault={addTodo}>
    <input
      class="input"
      placeholder="What needs to be done?"
      bind:value={todoInput}
    />
    <i class="inputMarker fa fa-angle-right" />
  </form>
```

We are passing `addTodo` function to our form submit handler.

```javascript
+  async function addTodo() {
+    try {
+      await addTodoMutation({
+        variables: { todo: todoInput, isPublic },
+      });
+      todoInput = "";
+    } catch (error) {
+      // TODO
+    }
+  }
```

`addTodoMutation` mutate function created earlier is called with variables in the `addTodo` submit handler

The mutation has been integrated and the new todos will be inserted into the database. But the UI doesn't know that a new todo has been added. We need a way to tell Apollo Client to update the query for the list of todos.

### Apollo Mutation Update

The `update` function comes in handy to update the cache for this mutation. It comes with utility functions such as `readQuery` and `writeQuery` that helps in reading from and writing to the cache.

```javascript
  async function addTodo() {
    try {
      await addTodoMutation({
        variables: { todo: todoInput, isPublic },
+        update: updateCache,
      });
      todoInput = "";
    } catch (error) {
      // TODO
    }
  }
```

Let's implement `updateCache` for the above mutation.

We need to fetch the current list of todos from the cache. So let's import the query that we used in the previous steps.

```javascript
import { GET_MY_TODOS } from "./queries";
```

Let's define the updateCache function to read and write to cache.

```javascript
+  const updateCache = (cache, { data }) => {
+    // If this is for the public feed, do nothing
+    if (isPublic) {
+      return null;
+    }
+
+    // Fetch the todos from the cache
+    const existingTodos = cache.readQuery({
+      query: GET_MY_TODOS,
+    });
+
+    // Add the new todo to the cache
+    const newTodo = data.insert_todos.returning[0];
+    cache.writeQuery({
+      query: GET_MY_TODOS,
+      data: { todos: [newTodo, ...existingTodos.todos] },
+    });
+  };
```

Let's dissect what's happening in this code snippet.

Our goals were simple:

- Make a mutation to insert the new todo in the database.
- Once the mutation is done, we need to update the cache to update the UI.

The update function is used to update the cache after a mutation occurs.
It receives the result of the mutation (data) and the current cache (store) as arguments. You will then use these arguments to manage your cache so that the UI will be up to date.

### readQuery and writeQuery

## cache.readQuery

Unlike `client.query`, readQuery will never make a request to your GraphQL server. It will always read from the cache. So we make a read request to the cache to get the current list of todos.

## cache.writeQuery

We have already done the mutation to the graphql server using the mutate function. Our goal was to update the UI. This is where writeQuery comes to the rescue. writeQuery will allow you to change data in your local cache, but it is important to remember that they will not change any data on your server (exactly what we need).

Any subscriber to the Apollo Client store will instantly see this update and render new UI accordingly.

We concatenate our new todo from our mutation with the list of existing todos and write the query back to the cache with cache.writeQuery

Now, the TodoPrivateList component using the `query` will get the updated todo list as it is automatically subscribed to the store.

Great! That was actually easy :)
