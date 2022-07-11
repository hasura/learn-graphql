---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Vue Apollo Client GraphQL Setup | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "You will learn how to configure Apollo Client in Vue by installing dependencies like @vue/apollo-composable, @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with a request body, headers, and options, that you might have done with `axios` or `fetch`.
You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

### Vue Apollo Installation
Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install --save @apollo/client @vue/apollo-composable @vue/apollo-util graphql graphql-tag
```

### Create Apollo Client Instance
Open `src/apollo-client.ts` and add the following code to create an ApolloClient instance.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/vue-apollo/app-final/src/apollo-client.ts" text="src/apollo-client.ts" />

```ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
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

const errorLink = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
})
```

These are the required apollo dependencies to get started. We have also written a utility to get token information to construct the headers.

### Install Vue Apollo Plugin and Provider

Now let's install the VueApollo plugin into Vue. Then, let's provide an ApolloClient instance. This is the instance that can then be used by all the child components.

```ts
import App from "./App.vue"
import { router } from "./router"
- import { createApp } from "vue"
+ import { createApp, provide, h } from "vue"

+ import { DefaultApolloClient } from "@vue/apollo-composable"
+ import { apolloClient } from "./apollo-client"

import authPlugin from "./auth/authPlugin"

- const app = createApp(App)
+ const app = createApp({
+     setup() {
+         provide(DefaultApolloClient, apolloClient)
+     },
+     render: () => h(App),
+ })

app.use(authPlugin)
app.use(router)
app.mount("#app")
```

Let's try to understand what is happening in all of the above.

- We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running at `https://hasura.io/learn/graphql`.
- Subsequently, we instantiate ApolloClient by passing in our `HttpLink` and a new instance of `InMemoryCache` (recommended caching solution).
- Finally, we are adding a `DefaultApolloClient` to the Vue app.
