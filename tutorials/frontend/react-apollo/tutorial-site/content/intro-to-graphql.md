---
title: "Intro to GraphQL"
metaTitle: "Intro to GraphQL | GraphQL React Apollo Tutorial"
metaDescription: "What is GraphQL? GraphQL is a specification for how to talk to an API. This part also covers GraphQL vs REST with an example and takes you over benefits of GraphQL"
---

## What is GraphQL?
GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (`me`) as well as that user's name might look something like this:
```bash
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```
Along with functions for each field on each type:
```bash
function Query_me(request) {
  return request.auth.user;
}
function User-name(user) {
  return user.getName();
}
```
Open a GraphQL service is runnning (typically at a URL on a webservice), it can be sent GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result. 
For example the query:
```bash 
{
  me {
    name
  }
}
```
Could produce the JSON result:
```bash
{
  "me": {
    "name": "Rohit Rathore"
  }
}
```
Learn more about GraphQL-the query language, type system, how the GraphQL service works, as well as best practices for using GraphQL to solve common problems-in the articles written in below sections.

## GraphQL vs REST: an example
Let's say you have an API to fetch a user's profile and their address. In a typical REST scenario, this is what the request/response would look like:

![GraphQL API example](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

If your API server was a GraphQL server instead, this is what your API calls would look like:

![GraphQL API example](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

You can see that the response JSON is different for different "queries" sent by the client.

```
Request1:         |  Response1:

query {           |  {
  user (id: 1) {  |    "user": {
    id            |       "id": 1
  }               |     }
}                 |  }

----------------------------------------

Request2:         |   Response2:

query {           |   {
  user (id: 1) {  |     "user": {
    id            |       "id": 1
    name          |       "name": "Elmo"
  }               |     }
}                 |   }
```

## Thinking in GraphQL

We're changing the way we think about API calls. Instead of making different API
calls to different URLs to fetch data, we're making ad-hoc queries to a "single
URL endpoint" that returns data based on the query.
- Instead of 'GET'ing a resource you 'POST' a query that describes what data you
  want.
- You think of the data your API returns as a "graph", this allows you to make
  queries to fetch "related" pieces of data in a single shot. In the example
  above, you fetch the user and the user's address (as a nested JSON object)
  in the same API call, as opposed to making 2 API calls.
- The "query" you send as data in the POST request has a structure and a syntax.
  This "language" is called GraphQL.

As you can see in the example above, GraphQL queries look very neat and easy to
read! This is because the query is the "shape" of the final JSON data you desire.
This is one of the key-reasons that makes GraphQL a joy to work with!

## GraphQL benefits

- **Avoid over-fetching**: You avoid fetching more data than you need because you
  can specify the exact **fields** you need.
- **Prevent multiple API calls**: In case you need more data, you can also avoid
  making multiple calls to your API. In the case above, you don't need to make
  2 API calls to fetch `user` and `address` separately.
- **Lesser communication with API developers**: Sometimes to fetch the exact data
  you need, especially if you need to fetch more data and want to avoid multiple API
  calls, you will need to ask your API developers to build a new API. With GraphQL,
  your work is *independent* of the API team! This allows you to work faster on your
  app.
- **Self-documenting**: Every GraphQL API conforms to a "schema" which is the graph
  data model and what kinds of queries a client can make. This allows the community
  to build lots of cool tools to explore & visualise your API or create IDE plugins
  that autocomplete your GraphQL queries and even do "codegen". We'll understand this
  in more detail later!

Here's a quick chart to show you the GraphQL analogs of typical REST-ish terms:

| Requirement | REST | GraphQL |
| :-- | :-- | :-- |
| Fetching data objects | GET | query |
| Writing data | POST | mutation |
| Updating/deleting data | PUT/PATCH/DELETE | mutation |
| Watching/subscribing to data | - | subscription |
