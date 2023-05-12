<script>
  import { gql } from "@apollo/client/core";
  import { query, mutation } from "svelte-apollo";
  import TodoFilters from "./TodoFilters.svelte";
  import TodoItem from "./TodoItem.svelte";
  import { GET_MY_TODOS } from "./queries";
  let currentFilter = "all";

  const todos = query(GET_MY_TODOS);

  function filterResults(filter) {
    currentFilter = filter;
  }

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

  const CLEAR_COMPLETED = gql`
    mutation clearCompleted {
      delete_todos(
        where: { is_completed: { _eq: true }, is_public: { _eq: false } }
      ) {
        affected_rows
      }
    }
  `;

  const clearCompletedTodos = mutation(CLEAR_COMPLETED);

  const clearCompleted = () => {
    clearCompletedTodos({
      optimisticResponse: true,
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
        const newTodos = existingTodos.todos.filter((t) => !t.is_completed);
        cache.writeQuery({ query: GET_MY_TODOS, data: { todos: newTodos } });
      },
    });
  };
</script>

{#if $todos.loading}
  <div>Loading...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
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
{/if}
