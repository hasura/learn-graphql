---
title: "Mutation and update cache"
metaTitle: "Vue Apollo client.mutate for GraphQL mutation update | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "We will use the Apollo Client's $apollo.mutate from vue-apollo as an example to modify existing data and update cache locally using readQuery and writeQuery and handle optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Now let's do the integration part. Open `src/components/TodoItem.vue` and add the following code below, to define a mutation that will update the `is_completed` status of a `todo`:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/TodoItem.vue" text="src/components/TodoItem.vue" />


```vue
<script setup lang="ts">
+ import { useMutation } from "@vue/apollo-composable"
+ import { UPDATE_TODO_BY_PK } from "../graphql-operations"

const { todos, type } = defineProps(["todos", "type"])

+ const updateTodo = useMutation(UPDATE_TODO_BY_PK)
</script>
```

We need to call `updateTodo.mutate()` to make the mutation. 

```vue
<template>
    <ul>
        <li v-for="todo in todos" v-bind:key="todo.id">
            <div v-if="todo.is_public" class="userInfoPublic">
                <p>@{{ todo.user.name }}</p>
            </div>
            <div class="view" v-if="type === 'private'">
                <div class="round">
                    <input type="checkbox" :id="todo.id" :checked="todo.is_completed" />
-                    <label :htmlFor="todo.id" />
+                    <label
+                        @click="
+                            updateTodo.mutate({
+                                pk_columns: { id: todo.id },
+                                _set: { is_completed: !todo.is_completed },
+                            })
+                        "
+                        :htmlFor="todo.id"
+                    />
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
```


