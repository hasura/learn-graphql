<script setup lang="ts">
import { ref } from "vue"

const { type } = defineProps({ type: String })
const newTodoTitle = ref("")

async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
    // Code to add todo here
}
</script>

<template>
    <div class="formInput">
        <input
            class="input"
            placeholder="What needs to be done?"
            v-model="newTodoTitle"
            @keyup.enter="addTodo({ todoTitle: newTodoTitle, type })"
        />
        <i class="downArrow fa fa-angle-down" />
    </div>
</template>
