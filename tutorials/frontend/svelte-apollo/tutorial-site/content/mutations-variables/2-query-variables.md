---
title: "Query Variables"
metaTitle: "Passing GraphQL Variables in Queries | Svelte Apollo GraphQL Tutorial"
metaDescription: "An Example of passing variables in GraphQL context and usage of Apollo GraphQL Mutation variables in Svelte app."
---

import GithubLink from "../../src/GithubLink.js";

## What is a variable in GraphQL context?

GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables. In our case, we are defining the object to be inserted as a mutation.

So let's define the graphql mutation to be used.

Open `src/components/Todo/TodoInput.svelte` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/Todo/TodoInput.svelte" text="src/components/Todo/TodoInput.svelte" />

```javascript
<script>
+ import { gql } from "@apollo/client/core";

+ const ADD_TODO = gql `
+  mutation ($todo: String!, $isPublic: Boolean!) {
+    insert_todos(objects: {title: $todo, is_public: $isPublic}) {
+      affected_rows
+      returning {
+        id
+        title
+        created_at
+        is_completed
+      }
+    }
+  }
+ `;
</script>

<form class="formInput" on:submit|preventDefault={addTodo}>
  <input
    class="input"
    placeholder="What needs to be done?"
  />
  <i class="inputMarker fa fa-angle-right" />
</form>
```

## What does this mutation do?

The mutation inserts into `todos` table with the $objects variable being passed as one todo type.

Awesome! We have defined our first graphql mutation.
