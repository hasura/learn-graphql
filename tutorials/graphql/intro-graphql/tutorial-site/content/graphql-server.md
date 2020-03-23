---
title: "GraphQL Servers"
metaTitle: "GraphQL Servers | GraphQL Tutorial"
metaDescription: "GraphQL is known for it's benefits on the client side. The GraphQL servers do the heavy lifting to ensure that just the right amount of data is fetched with minimal number of database lookups and API calls."
---

GraphQL is known for it's benefits on the client side. The GraphQL servers do the heavy lifting to ensure that just the right amount of data is fetched with minimal number of database lookups and API calls.

GraphQL request is `executed` by the server with the following information:
The schema of the GraphQL service, GraphQL document which contains the operation definitions like selection set and fields.

The server goes through the following steps:
- Parsing the document
- Identify the operation to execute (if more than one)
- Validate the request and return errors if it fails
- Execute the operation (query / mutation / subscription)

There are many approaches to writing a GraphQL server. Let's look at the most common ones that are used by the GraphQL community.

## Resolver Approach

The most common way of writing a GraphQL server is by defining the schema and writing resolvers for the different operations and fields.

Imagine resolvers as functions which contains instructions on how to process a particular field based on the context.

The basic signature of a resolver looks like the following: 

```
resolverFunc(data, args, context, info)
```

- `data` - previously fetched data from the parent.
- `args` - key value pairs of arguments, optional. 
- `context` - state information per request, typically used for auth logic
- `info` - metadata about the selection context for traversal. 

## Compiler Approach

Batching of resolvers solves the performance problem to a large extent. 
It reduces multiple hits to the database. But even with batching, there would still be multiple hits to the database depending on the depth of the query.

The compiler approach lets you map a GraphQL query of any depth to one database query. This is more performant if your GraphQL query deals with data from the database. 

Learn how Hasura does [performant GraphQL query execution](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) using the compiler approach.

## Hybrid Approach

If data is coming from different sources, we need to use a combination of the above approaches. The compiler approach works well for database parts of the query and batching of queries with DataLoader works best for batching external data sources / HTTP requests. 

The hybrid approach architecture uses a server with a connected database for primary CRUD operations and uses resolver approach for execution of other fields fetching or mutating data from different data sources.

If you are writing your own GraphQL server from scratch, you will be using the resolver approach, writing functions to resolve each field of the query. In case you are looking to map your database to GraphQL for instant CRUD, the compiler approach fits in. 

Usually a Hybdrid approach is recommended, where you would use a server like Hasura which gives instant CRUD for databases and also allows you to write your own resolvers in case you have some other custom business logic.


