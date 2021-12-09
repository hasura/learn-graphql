---
title: "GraphQL Response Caching"
metaTitle: "GraphQL Response Caching | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura GraphQL Engine (OSS) supports Query Caching where the internal representation of the fully qualified GraphQL AST is cached."
---

Hasura GraphQL Engine (OSS) supports Query Caching where the internal representation of the fully qualified GraphQL AST is cached. When a GraphQL query is made, the generated SQL is a prepared statement with the right session variables hitting the database. These prepared statements help in making queries fast. Read more about [Query Caching](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/performance.html)

Now, some queries are more frequently accessed than others. Typically, there could be latency and slow response times due to the

- Size of the response
- Location of the server
- Number of concurrent API calls etc

Hasura Cloud provides support for caching query responses. When queried with the cache configuration, Hasura Cloud ensures that the response data is cached to improve response time.

**Note**: GraphQL Response Caching is enabled for `Standard` tier Cloud projects with a cache size of upto 100 MB.

## How does caching work? {#how-does-caching-work}

Hasura has metadata about the data models across data sources, and the authorization rules at the application level. This helps Hasura to provide end to end application caching.

A GraphQL query’s response can be cached only if the following conditions hold:

- The query does not make use of remote schemas or remote joins
- The query and any related user permissions do not make use of session variables
- The response JSON is under 100KB in size

Cached responses are stored in for a period of time in a LRU (least-recently used) cache, and removed from the cache as needed based on usage.

For example, the `users` records in the slack model will be frequently accessed. We can cache this through the following query:

```graphql
query slackUsersCached @cached {
  users {
    id
    name
    display_name
    bio
  }
}
```

Note that in the above query, we have included `@cached` directive to specify that this query needs to be cached. By `default` the response for this is cached for `60 seconds`.

Now let's verify if the response was cached successfully.
Ideally the HTTP response will include a `Cache-Control` header, that indicates the maximum number of seconds for the returned response to remain in the cache. Post that time, it will be removed from the LRU.

![Cache-Control response header](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cache-control.png)

You can see the value of Cache-Control response header indicating how much more time in seconds this response would be cached.

## Cache Lifetime {#cache-lifetime}

The maximum lifetime of an entry in the cache can be controlled using the ttl argument to the @cached query directive. The value is an integer number of seconds:

```graphql
query usersCached @cached(ttl: 300) {
  users {
    id
    name
    display_name
    bio
  }
}
```
In the above query, we have included a `ttl` argument for the @cached directive. This is used to specify how long the cache needs to be in place.

The maximum allowed value is 300 seconds (5 minutes) and that's what we have used in the above query.

Now reading the `Cache-Control` header, you will know how long the query will be in cache. The clients can typically use this header to keep a track of cached responses.
