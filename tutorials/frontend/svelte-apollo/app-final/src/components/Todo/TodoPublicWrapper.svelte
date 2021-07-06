<script>
  import TodoInput from "./TodoInput.svelte";
  import TodoPublicListSubscription from "./TodoPublicListSubscription.svelte";
</script>

<div class="todoWrapper">
  <div class="sectionHeader">Public feed (realtime)</div>
  <TodoInput isPublic={true} />
  <TodoPublicListSubscription />
</div>
