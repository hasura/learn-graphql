---
title: "Testing"
metaTitle: 'Testing | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

So we have one more function to define, which is the query function, but before we do, let's talk about tests. The [NDC
specification repository](https://github.com/hasura/ndc-spec/) provides a
[test runner executable](https://github.com/hasura/ndc-spec/tree/main/ndc-test) called `ndc-test`, which can be used to
implement a test suite for a connector.

We can also use ndc-test to run some automatic tests and validate the work we've done so far. Let's compile and run
our connector, and then use the test runner with the running connector.

Here I have a configuration.json file which I can use to run the connector against my sample database.

First let's run the connector.

```shell
npm run build && node dist/index.js serve --configuration configuration.json
```

[//]: # (TODO - document the test runner better in the spec repo)
Now, let's run the tests. (You will need to have the
[ndc test runner](https://github.com/hasura/graphql-engine-mono/pull/10626#pullrequestreview-1826948556) installed on
your machine.)

```shell
ndc-test test --endpoint http://localhost:8100
```

OR

```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8100
````

Of course, we expected it to fail, but we can already see that our schema response is good.

Let's modify our query function to print out the request it receives, and this will give us a goal to work towards.

```typescript
async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  console.log(JSON.stringify(request, null, 2));
  throw new Error("Function not implemented.");
}
```

Let's recompile and restart the connector, and run the tests again.

```text
{"level":30,"time":1705491544618,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-3","req":{"method":"POST","url":"/query","hostname":"localhost:8100","remoteAddress":"127.0.0.1","remotePort":55462},"msg":"incoming request"}
{
  "collection": "albums",
  "query": {
    "fields": {
      "artist_id": {
        "type": "column",
        "column": "artist_id"
      },
      "id": {
        "type": "column",
        "column": "id"
      },
      "title": {
        "type": "column",
        "column": "title"
      }
    },
    "limit": 10
  },
  "arguments": {},
  "collection_relationships": {}
}
{"level":30,"time":1705491544622,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-3","res":{"statusCode":500},"responseTime":4.2100830078125,"msg":"request completed"}
{"level":30,"time":1705491544623,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-4","req":{"method":"POST","url":"/query","hostname":"localhost:8100","remoteAddress":"127.0.0.1","remotePort":55462},"msg":"incoming request"}
{
  "collection": "albums",
  "query": {
    "aggregates": {
      "count": {
        "type": "star_count"
      }
    },
    "limit": 10
  },
  "arguments": {},
  "collection_relationships": {}
}
{"level":30,"time":1705491544624,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-4","res":{"statusCode":500},"responseTime":0.9287499785423279,"msg":"request completed"}
{"level":30,"time":1705491544624,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-5","req":{"method":"POST","url":"/query","hostname":"localhost:8100","remoteAddress":"127.0.0.1","remotePort":55462},"msg":"incoming request"}
{
  "collection": "artists",
  "query": {
    "fields": {
      "id": {
        "type": "column",
        "column": "id"
      },
      "name": {
        "type": "column",
        "column": "name"
      }
    },
    "limit": 10
  },
  "arguments": {},
  "collection_relationships": {}
}
{"level":30,"time":1705491544625,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-5","res":{"statusCode":500},"responseTime":0.482666015625,"msg":"request completed"}
{"level":30,"time":1705491544625,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-6","req":{"method":"POST","url":"/query","hostname":"localhost:8100","remoteAddress":"127.0.0.1","remotePort":55462},"msg":"incoming request"}
{
  "collection": "artists",
  "query": {
    "aggregates": {
      "count": {
        "type": "star_count"
      }
    },
    "limit": 10
  },
  "arguments": {},
  "collection_relationships": {}
}
{"level":30,"time":1705491544625,"pid":47901,"hostname":"Seans-MBP.lan","reqId":"req-6","res":{"statusCode":500},"responseTime":0.37700000405311584,"msg":"request completed"}
```

In the logs of the app, we can see the request that was sent. It identifies the name of the collection, and a query
object to run. The query has a list of fields to retrieve, and a limit of 10 rows. With this as a guide, we can
start to implement our query function.
