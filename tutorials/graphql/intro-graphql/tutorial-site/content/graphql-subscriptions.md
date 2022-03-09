---
title: GraphQL Subscriptions - Realtime updates
metaTitle: "GraphQL Subscriptions for realtime data | GraphQL Tutorial"
metaDescription: "Try out GraphQL Subscription using GraphiQL. A GraphQL subscriptions example to fetch live data pushed over WebSockets "
---

As we learned earlier, you can fetch data with [GraphQL Queries](https://hasura.io/learn/graphql/intro-graphql/graphql-queries/), which return the requested information in one read. If the data updates on the server, you have to perform another query to get the updates.

However, there are use cases when you might want real-time updates from the server. In this section, you will learn how to do that with the help of GraphQL Subscriptions! 

## What is a GraphQL Subscription? {#what-is-a-graphql-subscription}

A Subscription is a GraphQL operation that enables you to subscribe to events on the server. You will get real-time updates from the server each time the event you subscribed to occurs.

An event can represent a record insertion, modification or deletion. Using the todo application as an example, we can use GraphQL Subscriptions to notify us each time a new todo is added to the database.

GraphQL Subscriptions are a critical component of adding real-time or reactive features to your applications. GraphQL clients and servers that support subscriptions allow you to build great experiences without dealing with WebSocket code!

## GraphQL Subscription Example {#graphql-subscription-example}

Let's write the first Subscription that notifies us when a user becomes online.

`Step 1`: Head to https://hasura.io/learn/graphql/graphiql

`Step 2`: Write this GraphQL Query in the textarea:

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

`Step 3`: Click on the play button.

Every time the set of online users changes, you’ll see the latest set on the right side of the GraphiQL IDE.

## GraphQL Subscriptions with WebSockets {#graphql-subscriptions-with-websocket}

GraphQL Subscriptions are implemented using the WebSocket protocol, enabling us to create a persistent connection between the server and client. The connection stays open until either party terminates it.

The WebSockets make it possible to implement features such as Subscriptions and get real-time updates from the server.

## Replace Query with Subscription {#replace-query-with-subscription}

With Hasura, you can convert a Query to a Subscription to get real-time data. Let's consider the following query:

```graphql
query {
  todos {
    id
    created_at
    is_completed
    is_public
    title
  }
}
```

The above query returns all the todos and their:
- id
- creation date
- completion status (completed or not completed)
- privacy (public or private)
- title

How do you convert the above Query to a Subscription? You can do so by replacing the keyword `query` with `subscription`:

```graphql
subscription {
  todos {
    id
    created_at
    is_completed
    is_public
    title
  }
}
```

Now the connection stays open and you get updates every time a new todo is added to the database.

## GraphQL Subscriptions vs Live Queries

Another way to get real-time data updates from the server is using GraphQL Live Queries. A Live Query is like a regular query except that it contains the `@live` directive.

Here’s an example of a Live Query:

```graphql
query @live {
  todos {
    id
    created_at
    is_completed
    is_public
    title
  }
}
```

The above Live Query watches the query result and whenever it changes, the server returns the new results to the client.

One significant difference is that Subscriptions are defined in the GraphQL Specification, whereas Live Queries are not. That means there is no official definition of a Live Query.

Another difference is that Subscriptions respond to events. For example, you might have a Subscription that reacts to an insertion. When the insertion occurs, the server sends back the new data to the client.

On the other hand, Live Queries watch the latest result of a query and whenever it changes, the server returns the latest results to the client. Rather than responding to an event, they monitor for changes in the query result.

**Note**: Live Queries do not work by default. They only work if the server supports them.

## Summary {#summary}

By this point, you:
- Learnt what a GraphQL Subscription is
- Wrote your first Subscription
- Converted a Query to a Subscription
- Learnt the difference between GraphQL Subscriptions and Live Queries

Now that you’re comfortable with the basics of using GraphQL let's see how the servers and clients are structured.
