---
title: "Subscription"
metaTitle: "Set up GraphQL Subscriptions using Apollo Client | GraphQL React Apollo Hooks Tutorial"
metaDescription: "You will learn how to configure GraphQL Subscriptions using React Apollo Client by using @apollo/client and its dependency subscriptions-transport-ws. This will also have authorization token setup"
---

import GithubLink from "../../src/GithubLink.js";

When we had initially set up Apollo with HttpLink. It supports queries and mutations but not subscriptions. So we have to install more dependencies to set up subscriptions.

### React Apollo Subscriptions Setup

```bash
+ $ npm install subscriptions-transport-ws --save
```

Now we need to update our `ApolloClient` instance to point to the subscription server.

Open `src/components/App.res` and update the `createApolloClient`:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/App.res" text="src/components/App.res" />

```reason
let createApolloClient = authToken => {
  let headers = {
    "Authorization": `Bearer ${authToken}`,
  }

  let httpLink = ApolloClient.Link.HttpLink.make(
    ~uri=_ => "https://hasura.io/learn/graphql",
    ~headers=Obj.magic(headers),
    (),
  )

+  let wsLink = {
+    open ApolloClient.Link.WebSocketLink
+    make(
+      ~uri="wss://hasura.io/learn/graphql",
+      ~options=ClientOptions.make(
+        ~connectionParams=ConnectionParams(Obj.magic({"headers": headers})),
+        ~reconnect=true,
+        (),
+      ),
+      (),
+    )
+  }
+
+  let terminatingLink = ApolloClient.Link.split(~test=({query}) => {
+    let definition = ApolloClient.Utilities.getOperationDefinition(query)
+    switch definition {
+    | Some({kind, operation}) => kind === "OperationDefinition" && operation === "subscription"
+    | None => false
+    }
+  }, ~whenTrue=wsLink, ~whenFalse=httpLink)

  let client = {
    open ApolloClient
    make(
      ~cache=Cache.InMemoryCache.make(),
      ~connectToDevTools=true,
      ~defaultOptions=DefaultOptions.make(
        ~mutate=DefaultMutateOptions.make(~awaitRefetchQueries=true, ()),
        (),
      ),
-     ~link=httpLink,
+     ~link=terminatingLink,
      (),
    )
  }
  client
}
```

We configured split link to choose `WebSocketLink` for subscription queries and `HttpLink` for queries and mutations.
