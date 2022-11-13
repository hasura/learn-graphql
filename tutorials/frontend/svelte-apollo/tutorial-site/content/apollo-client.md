---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Apollo Client GraphQL Setup | Svelte Apollo GraphQL Tutorial"
metaDescription: "You will learn how to configure Apollo Client in Svelte by installing @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

### Svelte Apollo Installation

Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install svelte-apollo @apollo/client graphql --save
```

### Create Apollo Client Instance

Open `src/components/TodoApp.svelte` and add the following imports at the top:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/svelte-apollo/app-final/src/components/TodoApp.svelte" text="src/components/TodoApp.svelte" />

```javascript
<script>
  import Header from "./Header.svelte";
  import OnlineUsersWrapper from "./OnlineUsers/OnlineUsersWrapper.svelte";
  import TodoPrivateWrapper from "./Todo/TodoPrivateWrapper.svelte";
  import TodoPublicWrapper from "./Todo/TodoPublicWrapper.svelte";

+  import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

</script>

<div>
  <header />
  <div class="row container-fluid p-left-right-0 m-left-right-0">
    <div class="row col-md-9 p-left-right-0 m-left-right-0">
      <div class="col-md-6 sliderMenu p-30">
        <TodoPrivateWrapper />
      </div>
      <div class="col-md-6 sliderMenu p-30 bg-gray border-right">
        <TodoPublicWrapper />
      </div>
    </div>
    <div class="col-md-3 p-left-right-0">
      <div class="col-md-12 sliderMenu p-30 bg-gray">
        <OnlineUsersWrapper />
      </div>
    </div>
  </div>
</div>
```

These are the required apollo dependencies to get started. Now let's define a function which will return apollo client with httplink and cache.

```javascript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

+function createApolloClient(authToken) {
+   const link = new HttpLink({
+     uri: "https://hasura.io/learn/graphql",
+     headers: {
+       Authorization: `Bearer ${authToken}`,
+     },
+   });
+
+   const cache = new InMemoryCache();
+
+   const client = new ApolloClient({
+     link,
+     cache,
+   });
+
+   return client;
+ }
```

Let's try to understand what is happening here.

### HttpLink and InMemoryCache

We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running at `https://hasura.io/learn/graphql`

At the end, we instantiate ApolloClient by passing in our HttpLink and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client.

We are going to make use of this function inside `TodoApp` component.

Create the apollo client instance inside `TodoApp` and set it to make it available to all the child components.

```javascript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
+ import { setClient } from "svelte-apollo";

+ export let authToken;

+ const client = createApolloClient(authToken);
+ setClient(client);
```
