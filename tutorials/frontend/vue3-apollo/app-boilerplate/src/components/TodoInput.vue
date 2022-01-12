<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { ref } from "vue"
import { INSERT_TODOS_ONE, SELECT_TODOS } from "../graphql-operations"

const { type } = defineProps({ type: String })
const newTodoTitle = ref("")
const insertTodoMutation = useMutation(INSERT_TODOS_ONE)

async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
    // Reset the input field
    newTodoTitle.value = ""

    // insert new todo into db
    const title = todoTitle && todoTitle.trim()
    const result = await insertTodoMutation.mutate(
        {
            object: {
                title,
                is_public: type === "public",
            },
        },
        {
            refetchQueries: [
                {
                    query: SELECT_TODOS,
                    variables: {
                        where: {
                            is_public: { _eq: false },
                        },
                        order_by: {
                            created_at: "desc",
                        },
                    },
                },
            ],
        }
    )

    console.log("mutate result", result)
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
