<script setup lang="ts">
import { computed, reactive } from "vue"
import TodoItem from "../components/TodoItem.vue"

import { useMutation, useQuery, useResult } from "@vue/apollo-composable"
import { DELETE_TODOS, SELECT_TODOS } from "../graphql-operations"

// Used in both query and mutation (refetch query variables)
const selectTodosVariables = {
    where: {
        is_public: { _eq: false },
    },
    order_by: {
        created_at: "desc",
    },
}

const privateTodosQuery = useQuery(SELECT_TODOS, selectTodosVariables)
const privateTodos = useResult(privateTodosQuery.result, [], (data) => data?.todos)

const deleteCompletedTodosMutation = useMutation(DELETE_TODOS, {
    variables: {
        where: {
            is_completed: { _eq: true },
            is_public: { _eq: false },
        },
    },
    refetchQueries: [
        {
            query: SELECT_TODOS,
            variables: selectTodosVariables,
        },
    ],
})

const state = reactive({
    type: "private",
    filterType: "all",
    filteredTodos: computed(() => {
        return privateTodos.value.filter((todo) => {
            switch (state.filterType) {
                case "completed":
                    return todo.is_completed
                case "active":
                    return !todo.is_completed
                default:
                    return true
            }
        })
    }),
    activeTodos: computed(() => privateTodos.value.filter((todo) => !todo.is_completed)),
    remainingTodos: computed(() => state.activeTodos.length),
})

function filterResults(type: string) {
    switch (type) {
        case "active":
            state.filterType = "active"
            break
        case "completed":
            state.filterType = "completed"
            break
        default:
            state.filterType = "all"
            break
    }
}

async function clearCompleted() {
    const isOk = window.confirm("Are you sure?")
    if (!isOk) return

    const result = await deleteCompletedTodosMutation.mutate()
    console.log("clear completed result", result)

    if (deleteCompletedTodosMutation.error.value) {
        console.error(deleteCompletedTodosMutation.error.value)
    }
}
</script>

<template>
    <div>
        <div v-if="privateTodosQuery.loading?.value">Loading...</div>
        <div v-if="privateTodosQuery.error?.value">
            Error: {{ privateTodosQuery.error?.value?.message }}
        </div>
        <div class="todoListwrapper">
            <TodoItem :todos="state.filteredTodos" :type="state.type" />
        </div>
        <div class="footerList">
            <span>{{ state.remainingTodos }} items </span>
            <ul>
                <li
                    v-for="filterType in ['all', 'active', 'completed']"
                    @click="filterResults(filterType)"
                >
                    <a
                        style="text-transform: capitalize"
                        class="removePaddLeft"
                        :class="filterType == state.filterType && 'selected'"
                    >
                        {{ filterType }}
                    </a>
                </li>
            </ul>
            <button v-if="state.type === 'private'" class="clearComp" @click="clearCompleted">
                Clear Completed
            </button>
        </div>
    </div>
</template>
