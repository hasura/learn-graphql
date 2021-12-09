---
title: "GraphQL Servers"
metaTitle: "GraphQL Servers | GraphQL Tutorial"
metaDescription: "GraphQL is known for it's benefits on the client side. The GraphQL servers do the heavy lifting to ensure that just the right amount of data is fetched with minimal number of database lookups and API calls."
---

GraphQL is known for its benefits on the client-side. The GraphQL servers do the heavy lifting to ensure that just the right amount of data is fetched with a minimal number of database lookups and API calls.

GraphQL request is `executed` by the server with the following information:
The schema of the GraphQL service, GraphQL document which contains the operation definitions like selection set and fields.

The server goes through the following steps:
- Parsing the document
- Identify the operation to execute (if more than one)
- Validate the request and return errors if it fails
- Execute the operation (query / mutation / subscription)

There are many approaches to writing a GraphQL server. Let's look at the most common ones that are used by the GraphQL community.

## Resolver Approach {#resolver-approach}

The most common way of writing a GraphQL server is by defining the schema and writing resolvers for the different operations and fields.

Imagine resolvers as functions that contain instructions on how to process a particular field based on the context.

The basic signature of a resolver looks like the following: 

```
resolverFunc(data, args, context, info)
```

- `data` - previously fetched data from the parent.
- `args` - key-value pairs of arguments, optional. 
- `context` - state information per request, typically used for auth logic
- `info` - metadata about the selection context for traversal. 

This resolver function is now executed for every field in a GraphQL query.

### N+1 performance problem {#performance-problem}

Let's say I have to fetch a list of authors and their articles. In a simple REST API, the naive version would look something like this:

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

The resolver would look something like:

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

Alright, now let's see how the execution for this would look like. Consider there are 3 authors with each linked to 2 articles.

The first resolver would be called for `author` which returns all the authors (3 in this case). Now for the relational query `articles`, the resolver `articles` would be called once for each author. This leads to 4 hits to the database (one for author and 3 for articles) in this naive approach.

You can see the obvious performance implications with this approach.

### Dataloader {#dataloader}

Dataloader is a utility to be used as part of your application's data fetching layer. In trying to solve the N+1 problem, what it does is, it waits for all the resolvers to load in their individual values, coalesce all individual loads and call the batch function with the requested keys.

## Compiler Approach {#compiler-approach}

Batching of resolvers solves the performance problem to a large extent. 
It reduces multiple hits to the database. But even with batching, there would still be multiple hits to the database depending on the depth of the query.

The compiler approach lets you map a GraphQL query of any depth to one database query. This is more performant if your GraphQL query deals with data from the database. 

Learn how Hasura does [performant GraphQL query execution](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) using the compiler approach.

## Hybrid Approach {#hybrid-approach}

If data is coming from different sources, we need to use a combination of the above approaches. The compiler approach works well for database parts of the query and batching of queries with DataLoader works best for batching external data sources / HTTP requests. 

The hybrid approach architecture uses a server with a connected database for primary CRUD operations and uses the resolver approach for execution of other fields fetching or mutating data from different data sources.

If you are writing your own GraphQL server from scratch, you will be using the resolver approach, writing functions to resolve each field of the query. In case you are looking to map your database to GraphQL for instant CRUD, the compiler approach fits in. 

Usually, a Hybrid approach is recommended, where you would use a server like Hasura which gives instant CRUD for databases and also allows you to write your own resolvers in case you have some other custom business logic.


