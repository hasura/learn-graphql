---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | GraphQL React Apollo Hooks Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using React Apollo Client by using @apollo/client and its dependency subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

When we had initially set up Apollo, we used Apollo Boost to install the required dependencies. But subscriptions is an advanced use case which Apollo Boost does not support. So we have to install more dependencies to set up subscriptions.

### React Apollo Subscriptions Setup

```bash
+ $ npm install subscriptions-transport-ws --save
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/components/App.js` and update the following imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
- import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
+ import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

Update the createApolloClient function to integrate WebSocketLink.

```javascript
const createApolloClient = (authToken) => {
  return new ApolloClient({
-   link: new HttpLink({
+   link: new WebSocketLink({
-     uri: 'https://hasura.io/learn/graphql',
+     uri: 'wss://hasura.io/learn/graphql',
+     options: {
+       reconnect: true,
+       connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
+       }
+     }
    }),
    cache: new InMemoryCache(),
  });
};
```

Note that we are replacing HttpLink with WebSocketLink and hence all GraphQL queries go through a single websocket connection.
