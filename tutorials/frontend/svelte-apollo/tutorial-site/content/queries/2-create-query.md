---
title: "Apollo Query"
metaTitle: "Svelte Apollo query | Svelte Apollo GraphQL Tutorial"
metaDescription: "We will use the query function from Svelte Apollo Client to make GraphQL queries"
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the svelte UI.

### Apollo Query

let's define the graphql query to be used:

Open `src/components/Todo/TodoPrivateList.svelte` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/Todo/TodoPrivateList.svelte" text="src/components/Todo/TodoPrivateList.svelte" />

```javascript
+ import { gql } from '@apollo/client';

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

+ const GET_MY_TODOS = gql`
+  query getMyTodos {
+    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
+      id
+      title
+      created_at
+      is_completed
+  }
+ }`;
```

We have now written the graphql query as a javascript constant using the `gql` parser function. This function is used to parse the plain string as a graphql query.

## What does this query do?

The query fetches `todos` with a simple condition; `is_public` must be false. We sort the todos descending by its `created_at` time according to the schema. We specify which fields we need for the todos node.

The query is now ready, let's integrate it with our svelte code.

```javascript
+ import { query } from "svelte-apollo";
```

`query` function is being imported from `svelte-apollo`

```javascript
import { gql } from "@apollo/client/core";
import { query } from "svelte-apollo";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`;

+ const todos = query(GET_MY_TODOS);
```

query fetches the data and returns a readable store of result values. In this case, we can access the query results using `$todos`.

Let's remove the mock `todos` data which was used to populate sample data and use the data fetched with graphql query.

```javascript

-   let todos= [
-      {
-        id: "1",
-        title: "This is private todo 1",
-        is_completed: true,
-        is_public: false
-      },
-      {
-        id: "2",
-        title: "This is private todo 2",
-        is_completed: false,
-        is_public: false
-      }
-    ]

function getFilteredTodos(todos, currentFilter) {
    if (currentFilter === "active") {
      return todos.filter((todo) => !todo.is_completed);
    } else if (currentFilter === "completed") {
      return todos.filter((todo) => todo.is_completed);
    }
    return todos;
  }

  $: filteredTodos = $todos.data
    ? getFilteredTodos($todos.data.todos, currentFilter)
    : [];
```

`filteredTodos` is svelte reactive declaration and it changes whenever $todos.data state changes and Svelte automatically updates the DOM.

```
<div>
    <div class="todoListWrapper">
      <ul>
        {#each filteredTodos as todo (todo.id)}
          <TodoItem {todo} />
        {/each}
      </ul>
    </div>
    <TodoFilters
      todos={$todos.data.todos}
      {currentFilter}
      {filterResults}
      {clearCompleted}
    />
  </div>
```

Woot! You have written your first GraphQL integration with Svelte. Easy isn't it?

## How does this work?

When you use the `query`, Apollo returns the data along with other properties. Most important ones are:

`loading`: A boolean that indicates whether the request is in flight. If loading is true, then the request hasn't finished. Typically this information can be used to display a loading spinner.

`error`: A runtime error with graphQLErrors and networkError properties. Contains information about what went wrong with your query.

`data`: An object containing the result of your GraphQL query. This will contain our actual data from the server. In our case, it will be the todo data.

You can read more about other properties that result object contains [here](https://www.apollographql.com/docs/react/data/queries/)

Using the `data` property, we are parsing the results from the server. In our query, `data` property has an array `todos` which can be mapped over to render each `TodoItem`.

If you noted, there has been some client side filtering to the todos that are displayed.
