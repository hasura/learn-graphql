---
title: Watching data - Subscriptions
metaTitle: "GraphQL Subscriptions for realtime data | GraphQL React Apollo Components Tutorial"
metaDescription: "Try out GraphQL Subscription using GraphiQL. A GraphQL subscriptions example to fetch live data pushed over websockets "
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-subscriptions/"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/i9hZYVVsDPg" />

The GraphQL specification allows for something called subscriptions that are like GraphQL queries
but instead of returning data in one read, you get data pushed from the server.

This is useful for your app to subscribe to "events" or "live results" from the backend, but
while allowing you to control the "shape" of the event from your app.

GraphQL subscriptions are a critical component of adding realtime or reactive features
to your apps easily. GraphQL clients and servers that support subscriptions are great because
they allow you to build great experiences without having to deal with websocket code!

## Make your first GraphQL subscription

1. Head to https://hasura.io/learn/graphql/graphiql
2. Write this GraphQL query in the textarea:
```graphql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```
3. Click on the play button.

Every time the set of online users change, you'll see the latest set on
the response window on the right.

## How do GraphQL subscriptions work?

GraphQL queries and mutations are strings sent to a POST endpoint. Which endpoint does a GraphQL subscription use? It can't use the POST endpoint, because a simple HTTP endpoint would just return the response and the connection would close.

A GraphQL subscription is a subscription query string sent to a websocket endpoint. Whenever data changes on the backend, new data is pushed over websocket from the server to the client.

## Summary

You now know how to make GraphQL subscriptions.

Now that you're comfortable with the basics of using GraphQL, let's start integrating GraphQL APIs with an app!
