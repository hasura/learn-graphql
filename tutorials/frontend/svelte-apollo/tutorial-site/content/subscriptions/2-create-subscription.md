---
title: "Create Subscription and Render Result"
metaTitle: "Create Subscription and Render Result | Svelte Apollo GraphQL Tutorial"
metaDescription: "Integrate Apollo subscription hook to watch for changes in realtime data. We use GraphQL subscriptions as an example to get live data in the svelte app"
---

import GithubLink from "../../src/GithubLink.js";

So let's define the graphql subscription to be used.

Open `src/components/OnlineUsers/OnlineUsersWrapper.svelte` and add the following code, below the other imports

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/OnlineUsers/OnlineUsersWrapper.svelte" text="src/components/OnlineUsers/OnlineUsersWrapper.svelte" />

```
<script>
  import OnlineUser from "./OnlineUser.svelte";
+  import { gql } from "@apollo/client/core";
+  import { subscribe, mutation } from "svelte-apollo";

+  const onlineUsers = subscribe(gql`
+    subscription getOnlineUsers {
+      online_users(order_by: { user: { name: asc } }) {
+        id
+        user {
+          name
+        }
+      }
+    }
+  `);

</script>
```

We are importing the `subscribe` function from `svelte-apollo` and passing the graphql subscription query to it.
`subscribe` function returns subscription query results store. You can reference a store value by prefixing the store name with $. So subscription query results can be accessed with $onlineUsers

Add the below code to renders online users

```javacript
+ {#if $onlineUsers.loading}
+   <div>loading ...</div>
+ {:else if $onlineUsers.error}
+   <div>Error!</div>
+ {:else if $onlineUsers.data}
+   <div class="onlineUsersWrapper">
+     <div class="sliderHeader">
+       Online users - {$onlineUsers.data.online_users.length}
+     </div>
+     {#each $onlineUsers.data.online_users as u (u.id)}
+       <OnlineUser user={u.user} />
+     {/each}
+   </div>
+ {/if}
```

Refresh your svelte app and see yourself online! Don't be surprised; There could be other users online as well.

Awesome! You have completed implementations of a GraphQL Query, Mutation and Subscriptions.
