---
title: "Subscriptions to show online users"
metaTitle: "Update last seen of user with Mutation | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "GraphQL Mutation to update last seen of user to make them available online. Use setInterval to trigger mutation every few seconds "
---

import GithubLink from "../src/GithubLink.js";

We cruised through our GraphQL queries and mutations. We queried for todos, added a new todo, updated an existing todo, removed an existing todo.

Now let's get to the exciting part.

GraphQL Subscriptions
---------------------

We have a section of UI that displays the list of online users. So far we have made queries to fetch data and display them on the UI. But typically online users' data is dynamic.

We can make use of GraphQL Subscription API to get real-time data from the graphql server to efficiently handle this.

But but but...

We need to tell the server that the user who is logged in is online. We have to poll our server to do a mutation which updates the `last_seen` timestamp value of the user.

We have to make this change to see yourself online first. Remember that you are already logged in, registered your data in the server, but not updated your `last_seen` value.?

The goal is to update every few seconds from the client that you are online. Ideally, you should do this after you have successfully authenticated with Auth0. So let's update some code to handle this.

Open `src/components/OnlineUsers.vue` and add the following imports and set the client prop in the constructor

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/components/OnlineUsers.vue" text="src/components/OnlineUsers.vue" />

```vue
<script setup lang="ts">
+ import { useMutation, useResult, useSubscription } from "@vue/apollo-composable"
+ import { SUBSCRIPTION_ONLINE_USERS, UPDATE_LASTSEEN_MUTATION } from "../graphql-operations"

const onlineUsers = [{ user: { name: "someUser1" } }, { user: { name: "someUser2" } }]

+ const UPDATE_LASTSEEN_MUTATION = gql`
+     mutation updateLastSeen($now: timestamptz!) {
+         update_users(where: {}, _set: { last_seen: $now }) {
+             affected_rows
+         }
+     }
+ `

+ const updateLastSeenMutation = useMutation(UPDATE_LASTSEEN_MUTATION, {
+     variables: () => ({
+         now: new Date().toISOString(),
+     }),
+ })

+ setInterval(async () => {
+     try {
+         updateLastSeenMutation.mutate()
+     } catch (e) {
+         console.log(e)
+     }
+ }, 30000)
</script>
```

In `mounted()`, we are creating a `setInterval` to update the `last_seen` of the user every 30 seconds.

Great! Now the metadata about whether the user is online will be available in the backend. Let's now do the integration to display real-time data of online users.
