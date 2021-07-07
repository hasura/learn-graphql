<script>
  import TaskItem from "./TaskItem.svelte";
  let olderTodosAvailable = true;
  let newTodosCount = 1;
  let todos = [
    {
      id: "1",
      title: "This is public todo 1",
      user: {
        name: "someUser1",
      },
    },
    {
      id: "2",
      title: "This is public todo 2",
      is_completed: false,
      is_public: true,
      user: {
        name: "someUser2",
      },
    },
    {
      id: "3",
      title: "This is public todo 3",
      user: {
        name: "someUser3",
      },
    },
    {
      id: "4",
      title: "This is public todo 4",
      user: {
        name: "someUser4",
      },
    },
  ];

  const loadNew = () => {};

  const loadOlder = () => {};
</script>

<div class="todoListWrapper">
  {#if newTodosCount > 0}
    <div class="loadMoreSection" on:click={loadNew}>
      New tasks have arrived! ({newTodosCount.toString()})
    </div>
  {/if}

  <ul>
    {#each todos as todo (todo.id)}
      <TaskItem {todo} />
    {/each}
  </ul>

  <div class="loadMoreSection" on:click={loadOlder}>
    {olderTodosAvailable ? "Load older tasks" : "No more public tasks!"}
  </div>
</div>
