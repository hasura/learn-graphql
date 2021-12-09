---
title: "GraphQL Clients"
metaTitle: "GraphQL Clients | GraphQL Tutorial"
metaDescription: "GraphQL clients can help with better querying, caching and building reusable modules. Let's see why we need a GraphQL client and the popular client libraries available"
---

In this section, we will look at how specialised GraphQL clients can help with better querying, caching and building reusable modules.

A GraphQL request can be made using native JavaScript Fetch API. For example, to fetch a list of authors, we can make the query using the following code:

```javascript
const limit = 5;
const query = `query author($limit: Int!) {
    author(limit: $limit) {
        id
        name
    }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { limit },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

This of course, assumes that your server accepts GraphQL requests over HTTP. (Remember GraphQL is protocol agnostic?).

## Why do I need a GraphQL Client? {#why-do-i-need-a-graphql-client}

Now that you have learnt that requests can be made using the old fetch API method, what is the point of a GraphQL client?

#### Constructing query, processing response {#constructing-query-processing-response}

A GraphQL client can help in constructing the full query with just the GraphQL document as input with relevant headers and context information. So instead of you writing the fetch API call everytime, the client will handle it for you giving the response data and error after parsing. 

#### Managing UI State {#managing-ui-state}

GraphQL client is also useful to manage UI state and sync data across multiple UI components.

#### Updating cache {#updating-cache}

GraphQL client can also be used to manage cached entries of data fetched from queries or mutation. Reactive updates to UI as mentioned above is achieved using a cache.

Popular GraphQL Clients in the community are [Apollo Client](https://github.com/apollographql/apollo-client) and [Relay](https://github.com/facebook/relay).

## Fluent GraphQL Clients {#fluent-graphql-clients}

When you are writing GraphQL queries or mutations using a client, you would notice that it is just a raw string with its own syntax. This string is usually parsed into a valid GraphQL query using external libraries. 

With fluent GraphQL clients, you can write these queries as objects. Fluent APIs aim to make code more readable via method chaining by returning this or self from each method. Fluent GraphQL clients allow you to write your query as an object, which they then convert to a string query behind the scenes. 

In addition to freeing you from strings, they offer
- Strong typing
- Single source of truth for type definitions
- Autocompletion of queries

Here is a [list of Fluent GraphQL Clients](https://github.com/hasura/awesome-fluent-graphql) that you can try out.

