---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | Svelte Apollo GraphQL Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using Svelte Apollo Client by using @apollo/client and its dependency subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

We need one more dependency to setup subscriptions. Let's install it.

### Apollo Subscriptions Setup

```bash
+ $ npm install subscriptions-transport-ws --save
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/apollo.js` and update the following imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/apollo.js" text="src/apollo.js" />

Update the createApolloClient function to integrate WebSocketLink.

```
import { split, HttpLink, InMemoryCache, ApolloClient } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

export function createApolloClient(authToken) {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const httpLink = new HttpLink({
    uri: "https://hasura.io/learn/graphql",
    headers,
  });

+  const wsLink = new WebSocketLink({
+    uri: "wss://hasura.io/learn/graphql",
+    options: {
+      reconnect: true,
+      connectionParams: {
+        headers,
+      },
+    },
+  });
+
+  const link = split(
+    ({ query }) => {
+      const definition = getMainDefinition(query);
+      return (
+        definition.kind === "OperationDefinition" &&
+        definition.operation === "subscription"
+      );
+    },
+    wsLink,
+    httpLink
+  );

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
}

```

split is used to choose WebSocketLink for subscription queries and HttpLink for queries and mutations.
