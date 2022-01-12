<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue"
import { computed, reactive } from "vue"
import { useQuery, useResult, useSubscription } from "@vue/apollo-composable"
import { NOTIFY_NEW_PUBLIC_TODOS, SELECT_TODOS_WITH_USER } from "../graphql-operations"

const { type } = defineProps({ type: String })

const state = reactive({
    limit: 5,
    newTodosCount: 0,
    type: "public",
    latestVisibleId: null,
    latestSubscriptionId: null,
})

const publicTodosQueryVariables = computed(() => ({
    limit: state.limit,
    where: {
        is_public: { _eq: true },
        ...(state.latestVisibleId && { id: { _lte: state.latestVisibleId } }),
    },
    order_by: {
        created_at: "desc",
    },
}))

const publicTodosQuery = useQuery(SELECT_TODOS_WITH_USER, publicTodosQueryVariables)
const publicTodos = useResult(publicTodosQuery.result, [], (data) => data?.todos)
publicTodosQuery.onResult(({ data }) => {
    if (data?.todos?.length > 0) {
        state.latestVisibleId = data.todos[0].id
    }
})

const newPublicTodosSubscription = useSubscription(NOTIFY_NEW_PUBLIC_TODOS, {
    lastId: state.latestSubscriptionId,
})
newPublicTodosSubscription.onResult(({ data }) => {
    if (!data?.todos?.length) return
    if (data.todos[0].id === state.latestVisibleId) return

    state.newTodosCount += data.todos.length
    state.latestSubscriptionId = data.todos[0].id
})

function loadMoreClicked() {
    state.latestVisibleId = state.latestSubscriptionId
    state.newTodosCount = 0
}

function loadOlderClicked() {
    state.limit += 5
}
</script>

<template>
    <div>
        <div class="todoListwrapper">
            <div class="loadMoreSection" v-if="state.newTodosCount" @click="loadMoreClicked">
                <p>New tasks have arrived! ({{ state.newTodosCount }})</p>
            </div>
            <TodoItem :todos="publicTodos" :type="type" />
            <div class="loadMoreSection" @click="loadOlderClicked">
                <p>Load older tasks</p>
            </div>
        </div>
    </div>
</template>
