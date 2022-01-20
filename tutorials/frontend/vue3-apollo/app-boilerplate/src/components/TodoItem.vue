<script setup lang="ts">
const { todos, type } = defineProps(["todos", "type"])
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
                    <label :htmlFor="todo.id" />
                </div>
            </div>
            <div class="labelContent">
                <p :style="todo.is_completed ? 'text-decoration: strikethrough' : ''">
                    {{ todo.title }}
                </p>
            </div>
            <button v-if="type === 'private'" class="closeBtn">x</button>
        </li>
    </ul>
</template>
