<script>
  export let todos;
  export let currentFilter;
  export let filterResults;
  export let clearCompleted;

  const filterResultsHandler = (filter) => {
    return () => {
      filterResults(filter);
    };
  };

  $: activeTodos = todos.filter((todo) => todo.is_completed !== true);

  $: itemCount =
    currentFilter === "active"
      ? activeTodos.length
      : currentFilter === "completed"
      ? todos.length - activeTodos.length
      : todos.length;
</script>

<div class="footerList">
  <span>
    {" "}
    {itemCount}
    {itemCount !== 1 ? "items" : "item"}
  </span>

  <ul>
    <li on:click={filterResultsHandler("all")}>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class={currentFilter === "all" ? "selected" : ""}>All</a>
    </li>

    <li on:click={filterResultsHandler("active")}>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class={currentFilter === "active" ? "selected" : ""}>Active</a>
    </li>

    <li on:click={filterResultsHandler("completed")}>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class={currentFilter === "completed" ? "selected" : ""}> Completed </a>
    </li>
  </ul>

  <button onClick={clearCompleted} class="clearComp"> Clear completed </button>
</div>
