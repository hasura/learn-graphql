---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | GraphQL Angular Apollo Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using Angular Apollo Client by installing dependencies like subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

When we had initially set up Apollo, we used Apollo Boost to install the required dependencies. But subscriptions is an advanced use case which Apollo Boost does not support. So we have to install more dependencies to set up subscriptions.

### Angular Apollo Subscriptions Setup

```bash
+ $ npm install apollo-link-ws subscriptions-transport-ws --save
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/app/app.module.ts` and update the following imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/angular-apollo/app-final/src/app/app.module.ts" text="src/app/app.module.ts" />

```typescript
+ import { WebSocketLink } from '@apollo/client/link/ws';
```

Update to integrate WebSocketLink.

```typescript

providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: () => {
      return {
        cache: new InMemoryCache(),
-       link:  httpLink.create({
+       link: new WebSocketLink({
-          uri: 'https://hasura.io/learn/graphql',
+          uri: 'wss://hasura.io/learn/graphql',
+          options: {
+            reconnect: true,
+            connectionParams: {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
+            }
+          }
        })
      };
    },
    deps: [HttpLink]
  }],
```

Note that we are replacing HttpLink with WebSocketLink and hence all GraphQL queries go through a single websocket connection.
