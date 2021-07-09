---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Apollo Client GraphQL Setup | ReScript React Apollo Tutorial"
metaDescription: "You will learn how to configure Apollo Client in React by installing @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

### React Apollo Hooks Installation

Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install @apollo/client graphql rescript-apollo-client
```

Open `src/components/App.res` and add the following code to create apollo client and App component.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/App.res" text="src/components/App.res" />

### Create Apollo Client Instance

Let's create a function that creates and return a apollo client instance.

```reason
let createApolloClient = authToken => {
  let headers = {
    "Authorization": `Bearer ${authToken}`,
  }

  let wsLink = {
    open ApolloClient.Link.WebSocketLink
    make(
      ~uri="wss://hasura.io/learn/graphql",
      ~options=ClientOptions.make(
        ~connectionParams=ConnectionParams(Obj.magic({"headers": headers})),
        ~reconnect=true,
        (),
      ),
      (),
    )
  }

  let client = {
    open ApolloClient
    make(
      ~cache=Cache.InMemoryCache.make(),
      ~connectToDevTools=true,
      ~defaultOptions=DefaultOptions.make(
        ~mutate=DefaultMutateOptions.make(~awaitRefetchQueries=true, ()),
        (),
      ),
      ~link=wsLink,
      (),
    )
  }
  client
}

```

Create the apollo client inside `App` and pass the client prop to `<ApolloProvider>` component.

```reason
@react.component
let make = (~idToken) => {
  let {loading, logout} = useAuth0()
  if loading {
    <div> {React.string("Loading...")} </div>
  } else {
+    let client = createApolloClient(idToken)
+    <ApolloClient.React.ApolloProvider client={client}>
      <div>

      </div>
+    </ApolloClient.React.ApolloProvider>
  }
}
```
