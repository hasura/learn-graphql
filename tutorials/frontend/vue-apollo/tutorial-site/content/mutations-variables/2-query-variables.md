---
title: "Query Variables"
metaTitle: "Passing GraphQL Variables in Queries | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "An Example of passing variables in GraphQL context and usage of Vue Apollo GraphQL Mutation variables."
---

import GithubLink from "../../src/GithubLink.js";

What is a variable in GraphQL context?
-------------------------------------
GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables. In our case, we are defining the object to be inserted as a mutation.

So let's define the graphql mutation to be used with variables.

Open `src/components/TodoInput.vue` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/TodoInput.vue" text="src/components/TodoInput.vue" />

```vue
<script setup lang="ts">
import { ref } from "vue"
+ import { useMutation } from "@vue/apollo-composable"
+ import { INSERT_TODOS_ONE } from "../graphql-operations"

const { type } = defineProps({ type: String })
const newTodoTitle = ref("")
+ const insertTodoMutation = useMutation(INSERT_TODOS_ONE)

async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
    // Code to add todo here
}
</script>
```

What does this mutation do?
---------------------------
The mutation inserts into `todos` table with the `todo_insert_input` variable being passed.

Awesome! We have defined our first graphql mutation.
