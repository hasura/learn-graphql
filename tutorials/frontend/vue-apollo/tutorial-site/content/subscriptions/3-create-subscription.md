---
title: "Create Subscription and Render Result"
metaTitle: "Vue Apollo Subscription Example | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "Integrate Vue Apollo Smart Subscription to watch for changes in real-time data. We use GraphQL subscriptions as an example to get live data in the Vue app"
---

import GithubLink from "../../src/GithubLink.js";

## Add subscription query

So let's define the graphql subscription to be used.

Open `src/components/OnlineUsers.vue` and add the following code, below the other import.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/OnlineUsers.vue" text="src/components/OnlineUsers.vue" />

```javascript
<script>
+  import gql from 'graphql-tag'
+ const SUBSCRIPTION_ONLINE_USERS = gql`
+   subscription getOnlineUsers {
+     online_users(order_by: {user: {name: asc }}) {
+       id
+       user {
+         name
+       }
+     }
+   }
+ `;
```

We are defining the graphql subscription query to fetch the online user data. Now let's define a smart subscription.

```vue
<script setup lang="ts">
import { useMutation, useResult, useSubscription } from "@vue/apollo-composable"

const onlineUsersSubscription = useSubscription(SUBSCRIPTION_ONLINE_USERS)
- const onlineUsers = [{ user: { name: "someUser1" } }, { user: { name: "someUser2" } }]
+ const onlineUsers = useResult(onlineUsersSubscription.result, [], (data) => data.online_users)

const UPDATE_LASTSEEN_MUTATION = gql`
    mutation updateLastSeen($now: timestamptz!) {
        update_users(where: {}, _set: { last_seen: $now }) {
            affected_rows
        }
    }
`

const updateLastSeenMutation = useMutation(UPDATE_LASTSEEN_MUTATION, {
    variables: () => ({
        now: new Date().toISOString(),
    }),
})

setInterval(async () => {
    try {
        updateLastSeenMutation.mutate()
    } catch (e) {
        console.log(e)
    }
}, 30000)
</script>
```

How does this work?
-------------------

We are using the `useSubscription()` method to define the subscription query, which functions similar to queries. The `online_users` prop gives the result of the real-time data for the query we have made.

Refresh your vue app and see yourself online! Don't be surprised ;) There could be other users online as well.

Awesome! You have completed basic implementations of a GraphQL Query, Mutation and Subscription. Easy isn't it?
