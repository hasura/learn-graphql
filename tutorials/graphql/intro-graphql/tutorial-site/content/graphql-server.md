---
title: "GraphQL Servers"
metaTitle: "GraphQL Servers | GraphQL Tutorial"
metaDescription: "GraphQL is known for its benefits on the client-side. The GraphQL servers do the heavy lifting to ensure that just the right amount of data is fetched with a minimal number of database lookups and API calls."
---

GraphQL is known for its benefits on the client-side, but what about the server-side? The GraphQL servers do the heavy lifting to ensure that the right amount of data is fetched with a minimal number of database lookups and API calls.

## How Does GraphQL Work With the Server?

GraphQL servers are composed of two main parts:
1. Schema
2. Resolvers

The GraphQL Schema defines what the API looks like. That means it specifies the available types, fields and operations. The schema acts as a contract between the client and server, guaranteeing that the data requirements are always met.

A GraphQL Resolver is a function that specifies how to process a specific GraphQL operation and turn it into data.

Each time the server receives a request, it goes through the following steps:
- Parsing the document
- Identify the operation to execute (if more than one)
- Validate the request and return errors if it fails
- Execute the operation (query / mutation / subscription)

There are many approaches to writing a GraphQL server. Let's look at the most common ones used by the GraphQL community.

## Resolver Approach {#resolver-approach}

The most common way of writing a GraphQL server is by defining the schema and writing resolvers for the different operations and fields.

Imagine resolvers as functions that contain instructions on how to process a particular field based on the context.

The basic signature of a resolver looks like the following: 

```
resolverFunc(data, args, context, info)
```

- `data` - previously fetched data from the parent
- `args` - key-value pairs of arguments, optional
- `context` - state information per request, typically used for auth logic
- `info` - metadata about the selection context for traversal 

This resolver function is now executed for every field in a GraphQL query.

### N+1 Performance Problem {#performance-problem}

Let's consider we have to fetch a list of authors and their articles. In a simple REST API, the naive version would look something like this:

```
fetchData: async () => ORM.getAuthors().getArticles();
```

There are two (SQL) queries to the database - one to fetch the list of authors and another to fetch the list of articles of each author. 

Now let's do this using GraphQL.

The GraphQL query for this would look something like this:

```graphql
query {
  author {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

The resolver would look something like this:

```
resolvers = {
  Query: {
    author: async () => {
      return ORM.getAllAuthors()
    }
  },
  Author: {
    articles:  async (authorObj, args) => {
      return ORM.getArticlesBy(authorObj.id)
    }
  },
}
```

Now let's see what the execution for this would look like. Consider there are 3 authors, each having 2 articles.

The first resolver would be called for `author`, which returns all the authors (3 in this case). Now for the relational query `articles`, the resolver `articles` would be called once for each author. This leads to 4 hits to the database (one for author and 3 for articles) in this naive approach.

You can see the apparent performance implications with this approach.

### Dataloader {#dataloader}

Dataloader is a utility used as part of your application’s data fetching layer. In trying to solve the N+1 problem, it waits for all the resolvers to load in their individual values, coalesce all individual loads and call the batch function with the requested keys.

## Compiler Approach {#compiler-approach}

Batching of resolvers solves the performance problem to a large extent. It reduces multiple hits to the database. But even with batching, there would still be multiple hits to the database depending on query depth.

The compiler approach lets you map a GraphQL query of any depth to one database query. This is more performant if your GraphQL query deals with data from the database. 

Learn how Hasura does [performant GraphQL query execution](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) using the compiler approach.

## Hybrid Approach {#hybrid-approach}

If data is coming from different sources, we need to use a combination of the above approaches. The compiler approach works well for the query’s database parts, while batching queries with DataLoader works best for batching external data sources / HTTP requests. 

The hybrid approach architecture uses a server with a connected database for primary CRUD operations. It uses the resolver approach to execute other fields fetching or mutating data from different data sources.

If you are writing your GraphQL server from scratch, you will be using the resolver approach, writing functions to resolve each query field. If you are looking to map your database to GraphQL for instant CRUD, the compiler approach fits in. 

Usually, a Hybrid approach is recommended. You would use a server like Hasura, which gives instant CRUD for databases and allows you to write your resolvers if you have some other custom business logic.

## How to Deploy a GraphQL Server? {#how-to-deploy-a-graphql-server}

Deploying a GraphQL server depends on the language you use for its implementation and the platform you choose for deployment.

In most cases, you deploy a GraphQL server the same way you deploy a REST server. You can use a platform like Heroku or an alternative to deploy your GraphQL server.

One of the main benefits of using Hasura is that it gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service! That means you do not need to worry about deployment.