<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue"
import { computed, reactive } from "vue"
import { useSubscription } from "@vue/apollo-composable"
import { SUBSCRIPTION_TODOS_WITH_USER } from "../graphql-operations"

const { type } = defineProps({ type: String })

const state = reactive({
    limit: 5,
    type: "public",
    todos: [],
    receivedTodos: [],
})

const { subscription } = useSubscription(
    SUBSCRIPTION_TODOS_WITH_USER,
    computed(() => ({
        limit: state.limit,
        where: {
            is_public: { _eq: true },
            ...(state.todos.length && { id: { _gte: state.todos[0].id } }),
        },
        order_by: {
            created_at: "desc",
        },
    }))
)

// On the first subscription result, we set "todos"
// Afterwards, we push new todos into "receivedTodos" where they wait for the "loadMore" button click
subscription.value.subscribe(({ data }) => {
    if (state.todos.length === 0) {
        state.todos = data.todos
    } else {
        state.receivedTodos.push(data.todos[0])
    }
})

function loadMoreClicked() {
    state.todos = [...state.receivedTodos, ...state.todos]
    state.receivedTodos = []
}

function loadOlderClicked() {
    state.limit += 5
}
</script>

<template>
    <div>
        <div class="todoListwrapper">
            <div class="loadMoreSection" v-if="state.receivedTodos.length" @click="loadMoreClicked">
                <p>New tasks have arrived! ({{ state.receivedTodos.length }})</p>
            </div>
            <TodoItem :todos="state.todos" :type="type" />
            <div class="loadMoreSection" @click="loadOlderClicked">
                <p>Load older tasks</p>
            </div>
        </div>
    </div>
</template>
