---
title: "Fetch public todos - subscription"
metaTitle: "Fetch public todos using Subscription | Svelte Apollo GraphQL Tutorial"
metaDescription: "You will learn how to make use of GraphQL Subscriptions to get notified whenever a new todo comes in Svelte App"
---

import GithubLink from "../../src/GithubLink.js";

Now let's define the subscription query to get notified about new public todos

Open `src/components/Todo/TodoPublicListSubscription.svelte` and add the following code.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/Todo/TodoPublicListSubscription.svelte" text="src/components/Todo/TodoPublicListSubscription.svelte" />

```javascript
<script>
  import { gql } from "@apollo/client/core";
  import { subscribe } from "svelte-apollo";

  const NOTIFY_NEW_PUBLIC_TODOS = gql`
    subscription notifyNewPublicTodos {
      todos(
        where: { is_public: { _eq: true } }
        limit: 1
        order_by: { created_at: desc }
      ) {
        id
        created_at
      }
    }
  `;

  const todos = subscribe(NOTIFY_NEW_PUBLIC_TODOS);
</script>

```

## What does the Subscription do?

The query fetches `todos` with a simple condition; `is_public` must be true. We also limit the number of todos to 1, since we would just like to get notified whenever a new todo comes in.
We sort the todos by its latest created_at time according to the schema. We specify which fields we need for the todos node.

We already have the TodoPublicList component which renders the list of public todos. So let's pass latestTodo as a prop to that component.

```javascript
{#if $todos.loading}
  <div>Loading ...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
  <TodoPublicList
    latestTodo={$todos.data.todos.length ? $todos.data.todos[0] : null}
  />
{/if}
```
