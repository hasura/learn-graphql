---
title: "Fetch and Sync Public Todos - Live Notifications"
metaTitle: "Fetch public todos using Subscription | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "You will learn how to make use of GraphQL Subscriptions to get notified whenever a new todo comes in Vue app"
---

import GithubLink from "../../src/GithubLink.js";

**Let's write some code that will:**
- Fetch the last `N` number of public todos
- Listen for new public todos to be created, realtime
- Push new todos into a queue of received todos, which we can display by clicking a button
- Allow us to ask for the next `N` older todos

Open `src/components/TodoPublicList.vue` and add the following:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/TodoPublicList.vue" text="src/components/TodoPublicList.vue" />

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

+ const { onResult } = useSubscription(
+     SUBSCRIPTION_TODOS_WITH_USER,
+     computed(() => ({
+         limit: state.limit,
+         where: {
+             is_public: { _eq: true },
+         },
+         order_by: {
+             created_at: "desc",
+         },
+     }))
+ )

+ onResult(({ data }) => {
+     // If this is the first subscription result and we've not loaded initial todos
+     // Then we should just set the initial state.todos value and stop
+     if (!initialTodosSet) {
+         state.todos = data.todos
+         initialTodosSet = true
+     } else {
+         // Else, if the change is because of a change in the "limit" value (due to the "load more" button being clicked)
+         // Then we should add the new todos to the existing todos and clear the "receivedTodos" array
+         if (state.limit != previousLimit) {
+             state.todos = [...data.todos, ...state.receivedTodos]
+             state.receivedTodos = []
+             previousLimit = state.limit
+         } else {
+             // Else, if the change is because of a new todo being created
+             state.receivedTodos.push(data.todos[0])
+         }
+     }
+ })

 const state = reactive({
     limit: 5,
     type: "public",
+    receivedTodos: [],
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

