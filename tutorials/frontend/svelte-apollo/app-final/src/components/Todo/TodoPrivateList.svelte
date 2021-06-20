<script>
  import { gql } from "@apollo/client";
  import { query, subscribe, mutation } from "svelte-apollo";
  import TodoFilters from "./TodoFilters.svelte";
  import TodoItem from "./TodoItem.svelte";
  import {GET_MY_TODOS} from "./queries"
  let currentFilter = "all";

  const todos = query(GET_MY_TODOS);

  function filterResults(filter) {
    currentFilter = filter;
  }
  function clearCompleted() {}

  // function getVisibleTodos(todos, currentFilter) {
  //   if (currentFilter === "active") {
  //     return todos.filter((todo) => !todo.is_completed);
  //   } else if (currentFilter === "completed") {
  //     return todos.filter((todo) => todo.is_completed);
  //   }
  //   return todos;
  // }

  // $: visibleTodos = getVisibleTodos(todos, currentFilter);
</script>

{#if $todos.loading}
  <div>Loading...</div>
{:else if $todos.data}
  <div>
    <div class="todoListWrapper">
      <ul>
        {#each $todos.data.todos as todo (todo.id)}
          <TodoItem {todo} />
        {/each}
      </ul>
    </div>
    <!-- <TodoFilters {todos} {currentFilter} {filterResults} {clearCompleted} /> -->
  </div>
{/if}
