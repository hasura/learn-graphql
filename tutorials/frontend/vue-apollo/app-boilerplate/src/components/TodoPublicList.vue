<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue"
import { reactive } from "vue"

const { type } = defineProps({ type: String })

const state = reactive({
    limit: 5,
    type: "public",
    todos: [
        {
            id: "1",
            title: "This is public todo 1",
            is_public: true,
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
            is_public: true,
            user: {
                name: "someUser3",
            },
        },
        {
            id: "4",
            title: "This is public todo 4",
            is_public: true,
            user: {
                name: "someUser4",
            },
        },
    ],
    receivedTodos: [],
})

function loadMoreClicked() {}

function loadOlderClicked() {}
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
