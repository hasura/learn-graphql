<template>
  <div class="todoWrapper">
    <TodoInput type="private" />
    <TodoPrivateList type="private" />
  </div>
</template>

<script>
import TodoInput from "../components/TodoInput.vue";
import TodoPrivateList from "../components/TodoPrivateList.vue";
export default {
  components: {
    TodoInput, TodoPrivateList
  }
}
</script>
