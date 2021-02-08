---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | GraphQL React Apollo Typescript Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using React Apollo Client by installing dependencies like apollo-link-ws, subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

When we had initially set up Apollo, we installed the required dependencies for a http client. But subscriptions is an advanced use case with websockets. We have to install more dependencies to set up subscriptions.

### React Apollo Subscriptions Setup

```bash
$ yarn add subscriptions-transport-ws
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/components/App.tsx` and update the following imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/typescript-react-apollo/app-final/src/components/App.tsx" text="src/components/App.tsx" />

```javascript
  import { InMemoryCache } from 'apollo-cache-inmemory';
- import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
+ import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

Update the createApolloClient function to integrate WebSocketLink.

```javascript
const createApolloClient = (authToken: string) => {
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

Note that we are replacing HttpLink with WebSocketLink and hence all GraphQL queries go through a single websocket connection. This means not just subscriptions, but also GraphQL queries and mutations also go through websockets.
