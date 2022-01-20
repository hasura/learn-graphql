<script setup lang="ts">
import { reactive, computed } from "vue"
import TodoItem from "../components/TodoItem.vue"

const privateTodos = [
    {
        id: "1",
        title: "This is private todo 1",
        is_completed: true,
        is_public: false,
    },
    {
        id: "2",
        title: "This is private todo 2",
        is_completed: false,
        is_public: false,
    },
]

const state = reactive({
    type: "private",
    filterType: "all",
    filteredTodos: computed(() => {
        return privateTodos.filter((todo) => {
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
    activeTodos: computed(() => privateTodos.filter((todo) => !todo.is_completed)),
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
}
</script>

<template>
    <div>
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
