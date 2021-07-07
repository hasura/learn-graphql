<script>
  export let todo;
  function toggleTodo() {}
  function removeTodo() {}
</script>

<li>
  <div class="view">
    <div class="round">
      <input
        checked={todo.is_completed}
        type="checkbox"
        id={todo.id}
        on:change={toggleTodo}
      />
      <label for={todo.id} />
    </div>
  </div>

  <div class={"labelContent" + (todo.is_completed ? " completed" : "")}>
    <div>{todo.title}</div>
  </div>

  <button class="closeBtn" on:click={removeTodo}> x </button>
</li>
