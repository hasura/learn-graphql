<script>
  import { gql } from "@apollo/client/core";
  import { subscribe } from "svelte-apollo";
  import TodoPublicList from "./TodoPublicList.svelte";

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

{#if $todos.loading}
  <div>Loading ...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
  <TodoPublicList
    latestTodo={$todos.data.todos.length ? $todos.data.todos[0] : null}
  />
{/if}
