---
title: "Fetch and Sync Public Todos - Live Notifications"
metaTitle: "Fetch public todos using Subscription | GraphQL Vue Apollo Tutorial"
metaDescription: "You will learn how to make use of GraphQL Subscriptions to get notified whenever a new todo comes in Vue app"
---

import GithubLink from "../../src/GithubLink.js";

**Let's write some code that will:**
- Fetch the last `N` number of public todos
- Listen for new public todos to be created, realtime
- Push new todos into a queue of received todos, which we can display by clicking a button
- Allow us to ask for the next `N` older todos

Open `src/components/TodoPublicList.vue` and add the following:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue3-apollo/app-final/src/components/TodoPublicList.vue" text="src/components/TodoPublicList.vue" />

```vue
<script setup lang="ts">
import TodoItem from "../components/TodoItem.vue"
- import { reactive } from "vue"
+ import { computed, reactive } from "vue"
+ import { useSubscription } from "@vue/apollo-composable"

const { type } = defineProps({ type: String })

+ const SUBSCRIPTION_TODOS_WITH_USER = gql`
+     subscription todos_with_user(
+         $where: todos_bool_exp!
+         $order_by: [todos_order_by!]
+         $limit: Int = 10
+         $offset: Int
+     ) {
+         todos(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
+             id
+             title
+             is_completed
+             created_at
+             is_public
+             user {
+                 id
+                 name
+             }
+         }
+     }
+ `

+ const { subscription } = useSubscription(
+     SUBSCRIPTION_TODOS_WITH_USER,
+     computed(() => ({
+         limit: state.limit,
+         where: {
+             is_public: { _eq: true },
+             ...(state.todos.length && { id: { _gte: state.todos[0].id } }),
+         },
+         order_by: {
+             created_at: "desc",
+         },
+     }))
+ )

+ // On the first subscription result, we set "todos"
+ // Afterwards, we push new todos into "receivedTodos" where they wait for the "loadMore" button click
+ subscription.value.subscribe(({ data }) => {
+     if (state.todos.length === 0) {
+         state.todos = data.todos
+     } else {
+         state.receivedTodos.push(data.todos[0])
+     }
+ })

 const state = reactive({
     limit: 5,
     type: "public",
+    todos: [],
-    todos: [
-         {
-             id: "1",
-             title: "This is public todo 1",
-             is_public: true,
-             user: {
-                 name: "someUser1",
-             },
-         },
-         {
-             id: "2",
-             title: "This is public todo 2",
-             is_completed: false,
-             is_public: true,
-             user: {
-                 name: "someUser2",
-             },
-         },
-         {
-             id: "3",
-             title: "This is public todo 3",
-             is_public: true,
-             user: {
-                 name: "someUser3",
-             },
-         },
-         {
-             id: "4",
-             title: "This is public todo 4",
-             is_public: true,
-             user: {
-                 name: "someUser4",
-             },
-         },
-     ],
 })

function loadMoreClicked() {
+    state.todos = [...state.receivedTodos, ...state.todos]
+    state.receivedTodos = []  
}

function loadOlderClicked() {
+      state.limit += 5
}
</script>
```

What does the Subscription do?
------------------------------

The subscription fetches `todos` with a simple condition; `is_public` must be true. It is also a `computed` subscription, this is because we want it to be reactive. We need the reactivity so that we can model the following logic:

- If `state.todos` is empty and hasn't been set, then run a subscription with the variables:
```js
{
  where: {
    is_public: { _eq: true },
  }
}
```

- After `state.todos` has a value set, instead modify and re-start the subscription to watch for ID's created that are greater than the most recent todo's ID. This powers the realtime todo-received notification:
```js
{
  where: {
    is_public: { _eq: true },
    id: { _gte: state.todos[0].id } 
  }
}
```

