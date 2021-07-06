<script>
  import TodoInput from "./TodoInput.svelte";
  import TodoPublicList from "./TodoPublicList.svelte";
</script>

<div class="todoWrapper">
  <div class="sectionHeader">Public feed (realtime)</div>
  <TodoInput />
  <TodoPublicList />
</div>
