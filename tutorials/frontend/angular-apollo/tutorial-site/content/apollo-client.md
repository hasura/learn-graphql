---
title: "Set up a GraphQL client with Apollo"
metaTitle: "Apollo Client GraphQL Setup | GraphQL Angular Apollo Tutorial"
metaDescription: "You will learn how to configure Apollo Client in Angular by installing dependencies like apollo-angular, @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `axios` or `fetch` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your apollo client instance.

### Angular Apollo Installation
Let's get started by installing apollo client & peer graphql dependencies:

```bash
$ npm install apollo-angular @apollo/client graphql
```

### Create Apollo Client Instance
Open `src/app/app.module.ts` and add the following imports at the top:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/angular-apollo/app-final/src/app/app.module.ts" text="src/app/app.module.ts" />

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'

+ import { HttpClientModule  } from "@angular/common/http";
+ import { APOLLO_OPTIONS } from "apollo-angular";
+ import { HttpLink } from 'apollo-angular/http';
+ import { InMemoryCache } from '@apollo/client/core';
```

These are the required apollo dependencies to get started. Now let's define a provider which will return apollo client with httplink and cache.

```typescript
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
+   HttpClientModule
  ],
  providers: [{
+    provide: APOLLO_OPTIONS,
+    useFactory: (httpLink: HttpLink) => {
+      return {
+        cache: new InMemoryCache(),
+        link:  httpLink.create({
+          uri: 'https://hasura.io/learn/graphql',
+            headers: {
+              Authorization: `Bearer ${localStorage.getItem('token')}`
+            }
+        })
+      };
+    },
+    deps: [HttpLink]
  }]
```

Let's try to understand what is happening here.

### HttpLink and InMemoryCache
We are creating an `HttpLink` to connect ApolloClient with the GraphQL server. As you know already, our GraphQL server is running at `https://hasura.io/learn/graphql`

At the end, we return ApolloClient by passing in our HttpLink and a new instance of `InMemoryCache` (recommended caching solution). We are wrapping all of this in a function which will return the client.

