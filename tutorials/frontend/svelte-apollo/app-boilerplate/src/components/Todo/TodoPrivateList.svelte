<script>
  import TodoFilters from "./TodoFilters.svelte";
  import TodoItem from "./TodoItem.svelte";
  let currentFilter = "all";
  let todos = [
    {
      id: "1",
      title: "This is private todo 1",
      is_completed: true,
      is_public: false,
    },
    {
      id: "2",
      title: "This is private todo 2",
      is_completed: false,
      is_public: false,
    },
  ];

  function filterResults(filter) {
    currentFilter = filter;
  }
  function clearCompleted() {}

  function getFilteredTodos(todos, currentFilter) {
    if (currentFilter === "active") {
      return todos.filter((todo) => !todo.is_completed);
    } else if (currentFilter === "completed") {
      return todos.filter((todo) => todo.is_completed);
    }
    return todos;
  }

  $: filteredTodos = getFilteredTodos(todos, currentFilter);
</script>

<div>
  <div class="todoListWrapper">
    <ul>
      {#each filteredTodos as todo (todo.id)}
        <TodoItem {todo} />
      {/each}
    </ul>
  </div>
  <TodoFilters {todos} {currentFilter} {filterResults} {clearCompleted} />
</div>
