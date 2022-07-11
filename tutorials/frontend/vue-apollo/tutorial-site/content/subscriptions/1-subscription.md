---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using Vue Apollo Client by installing dependencies like apollo-link-ws, subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

When we had initially set up Apollo, wired up an `HttpLink` to be able to make queries and mutations. But subscriptions is an advanced usecase, so we have to install more dependencies to set up subscriptions:

```bash
 npm install subscriptions-transport-ws --save
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/apollo-client.ts` and update the following imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/apollo-client.ts" text="src/apollo-client.ts" />

```ts
- import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
+ import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
+ import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

function getHeaders() {
    const headers = {}
    const token = window.localStorage.getItem("apollo-token")
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    return headers
}

// Create an http link:
const httpLink = new HttpLink({
    uri: "https://hasura.io/learn/graphql",
    fetch: (uri: RequestInfo, options: RequestInit) => {
        options.headers = getHeaders()
        return fetch(uri, options)
    },
})

+ // Create a WebSocket link:
+ const wsLink = new WebSocketLink({
+     uri: "wss://hasura.io/learn/graphql",
+     options: {
+         reconnect: true,
+         lazy: true,
+         timeout: 30000,
+         inactivityTimeout: 30000,
+         connectionParams: () => {
+             return { headers: getHeaders() }
+         },
+     },
+ })

const errorLink = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
-    link: errorLink.concat(httpLink),
+    link: errorLink.concat(
+        split(
+            // split based on operation type
+            ({ query }) => {
+                const definition = getMainDefinition(query)
+                return (
+                    definition.kind === "OperationDefinition" &&
+                    definition.operation === "subscription"
+                )
+            },
+            wsLink,
+            httpLink
+        )
+    ),
})
```