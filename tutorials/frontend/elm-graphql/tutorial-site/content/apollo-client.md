---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Apollo Client GraphQL Setup | GraphQL Elm Tutorial"
metaDescription: "You will learn how to configure Apollo Client in Elm by installing dependencies like react-apollo, apollo-client, apollo-link-http, apollo-cache-inmemory"
---

import GithubLink from "../src/GithubLink.js";

Elm-graphql doesn't have a native websockets client. The only option available as of now is to use apollo client on the javascript side to make a GraphQL subscription query. We will get into how we can achieve it a little later. 

Lets configure our ApolloClient

### Elm Apollo Installation
Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install --save graphql apollo-client apollo-link-ws apollo-cache-inmemory subscriptions-transport-ws graphql-tag
```

### Create Apollo Client Instance

```javascript
/* */
+var apolloClient = require("apollo-client")
+var apolloLinkWS = require('apollo-link-ws')
+var apolloCacheInMemory = require("apollo-cache-inmemory")
+var gql = require('graphql-tag')
+
+var GRAPHQL_URI = 'hasura.io/learn/graphql'
+
+const getClient = (token) => {
+    const wsLink = new apolloLinkWS.WebSocketLink({
+        uri: `wss://${GRAPHQL_URI}`,
+        options: {
+            reconnect: true,
+            connectionParams: {
+                headers: {
+                    Authorization: `Bearer ${ token }`
+                }
+            }
+        }
+    });
+
+    const client = new apolloClient.ApolloClient({
+        link: wsLink,
+        cache: new apolloCacheInMemory.InMemoryCache({
+            addTypename: true
+        })
+    });
+    return client;
+};

document.addEventListener("DOMContentLoaded", function() {
    var app = Elm.Main.init({node: document.getElementById('app')})

    app.ports.storeToken.subscribe(function(token) {
        localStorage.setItem('token', token)
    })
    app.ports.removeTokenFromStarage.subscribe(function() {
        localStorage.removeItem('token')
    })
    var token = localStorage.getItem('token')
    if ( token ) {
        app.ports.gotStoredToken.send(token)
    }
})

```

Let's try to understand what is happening here. 

### HttpLink and InMemoryCache
We are creating a `wsLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running at `https://hasura.io/learn/graphql`

At the end, we instantiate ApolloClient by passing in our link and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client.

We are going to make use of this function to initiate GraphQL subscriptions.
