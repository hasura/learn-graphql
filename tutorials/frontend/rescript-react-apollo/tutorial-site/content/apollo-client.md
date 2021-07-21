---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Apollo Client GraphQL Setup | ReScript React Apollo GraphQL Tutorial"
metaDescription: "You will learn how to configure Apollo Client in React by installing @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Hope you got the app-boilerplate code up and running. We will use Apollo as GraphQL client in this tutorial.

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

### React Apollo Installation

Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install @apollo/client graphql rescript-apollo-client
```

### What are these dependencies?

- `@apollo/client` is a GraphQL client library
- `graphql` package contains core utilities which are used by other graphql libraries
- `rescript-apollo-client` contains ReScript bindings for the Apollo Client

Let's add `rescript-apollo-client` to `bs-dependencies`
Open `bsconfig.json` and update `bs-dependencies`
<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/bsconfig.json" text="bsconfig.json" />

```json
{
   ...
-  "bs-dependencies": ["@rescript/react"]
+  "bs-dependencies": ["@rescript/react", "rescript-apollo-client"],

}
```

### Create Apollo Client Instance

Let's create a function that creates and return a apollo client instance.

Open `src/components/App.res` and add the following code to create apollo client and App component.

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

  let client = {
    open ApolloClient
    make(
      ~cache=Cache.InMemoryCache.make(),
      ~connectToDevTools=true,
      ~defaultOptions=DefaultOptions.make(
        ~mutate=DefaultMutateOptions.make(~awaitRefetchQueries=true, ()),
        (),
      ),
      ~link=httpLink,
      (),
    )
  }
  client
}
```

Let's try to understand what is happening here.

### HttpLink and InMemoryCache

We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running at `https://hasura.io/learn/graphql`

At the end, we instantiate ApolloClient by passing in our HttpLink and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client.

Next, let's create the apollo client instance inside `App` and pass the client prop to `<ApolloProvider>` component.

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
