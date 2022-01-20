<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { DELETE_TODOS_BY_PK, UPDATE_TODO_BY_PK } from "../graphql-operations"

const { todos, type } = defineProps(["todos", "type"])

const updateTodo = useMutation(UPDATE_TODO_BY_PK)

// Optimistic updates for delete mutations require two parts:
//
// 1. An "optimisticResponse" object that defines the changes to be made to the store
// 2. An "update" function that updates the store with the changes
//
// The "update" function will be called twice
// Once with the "optimisticResponse" object, and once with the "real" response
//
const deleteTodoByPk = useMutation(DELETE_TODOS_BY_PK, {
    optimisticResponse: (variables) => {
        return {
            delete_todos_by_pk: {
                id: variables.id,
                is_completed: true,
            },
        }
    },
    update: (cache, { data }) => {
        cache.modify({
            fields: {
                todos: (existingTodos, { readField }) => {
                    return existingTodos.filter(
                        (todoRef) => data.delete_todos_by_pk.id !== readField("id", todoRef)
                    )
                },
            },
        })
    },
    // refetchQueries: [
    //     {
    //         query: SELECT_TODOS,
    //         variables: {
    //             where: {
    //                 is_public: { _eq: false },
    //             },
    //             order_by: {
    //                 created_at: "desc",
    //             },
    //         },
    //     },
    // ],
})
</script>

<template>
    <ul>
        <li v-for="todo in todos" v-bind:key="todo.id">
            <div v-if="todo.is_public" class="userInfoPublic">
                <p>@{{ todo.user.name }}</p>
            </div>
            <div class="view" v-if="type === 'private'">
                <div class="round">
                    <input type="checkbox" :id="todo.id" :checked="todo.is_completed" />
                    <label
                        @click="
                            updateTodo.mutate({
                                pk_columns: { id: todo.id },
                                _set: { is_completed: !todo.is_completed },
                            })
                        "
                        :htmlFor="todo.id"
                    />
                </div>
            </div>
            <div class="labelContent">
                <p :style="todo.is_completed ? 'text-decoration: strikethrough' : ''">
                    {{ todo.title }}
                </p>
            </div>
            <button
                v-if="type === 'private'"
                @click="deleteTodoByPk.mutate({ id: todo.id })"
                class="closeBtn"
            >
                x
            </button>
        </li>
    </ul>
</template>
