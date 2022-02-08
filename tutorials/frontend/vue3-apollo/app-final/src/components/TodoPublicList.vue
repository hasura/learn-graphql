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

const { onResult } = useSubscription(
    SUBSCRIPTION_TODOS_WITH_USER,
    computed(() => ({
        limit: state.limit,
        where: {
            is_public: { _eq: true },
        },
        order_by: {
            created_at: "desc",
        },
    }))
)

let previousLimit = state.limit
let initialTodosSet = false

onResult(({ data }) => {
    // If this is the first subscription result and we've not loaded initial todos
    // Then we should just set the initial state.todos value and stop
    if (!initialTodosSet) {
        state.todos = data.todos
        initialTodosSet = true
    } else {
        // Else, if the change is because of a change in the "limit" value (due to the "load more" button being clicked)
        // Then we should add the new todos to the existing todos and clear the "receivedTodos" array
        if (state.limit != previousLimit) {
            state.todos = [...data.todos, ...state.receivedTodos]
            state.receivedTodos = []
            previousLimit = state.limit
        } else {
            // Else, if the change is because of a new todo being created
            state.receivedTodos.push(data.todos[0])
        }
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
