---
title: "Testing"
metaTitle: 'Testing the where clause | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Now let's remove our old snapshots and re-run the test suite.

```bash
rm -rf snapshots
```

And re-run the tests with the snapshots directory:

```shell
rm -rf snapshots
```

```shell
ndc-test test --endpoint http://localhost:8080/ --snapshots-dir snapshots
```

OR
```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8100 --snapshots-dir snapshots
```

We can see that predicate tests are passing, but some other test cases are not. That's okay - we'll keep iterating 
until we have all green tests here.

[//]: # (TODO predicate tests were passing before)

In our snapshots directory, we can also see that we're returning the correct data for some simple predicate queries.
This query searches for albums for artist with ID `5`, and we can see that the response contains the correct rows.

Request:
```JSON
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
    "limit": 10,
    "where": {
      "type": "binary_comparison_operator",
      "column": {
        "type": "column",
        "name": "artist_id",
        "path": []
      },
      "operator": {
        "type": "equal"
      },
      "value": {
        "type": "scalar",
        "value": 5
      }
    }
  },
  "arguments": {},
  "collection_relationships": {}
}
```

Response:
```shell
[
  {
    "rows": [
      {
        "artist_id": 1,
        "id": 1,
        "title": "For Those About To Rock We Salute You"
      },
      {
        "artist_id": 2,
        "id": 2,
        "title": "Balls to the Wall"
      },
      {
        "artist_id": 2,
        "id": 3,
        "title": "Restless and Wild"
      },
      {
        "artist_id": 1,
        "id": 4,
        "title": "Let There Be Rock"
      },
      {
        "artist_id": 3,
        "id": 5,
        "title": "Big Ones"
      },
      {
        "artist_id": 4,
        "id": 6,
        "title": "Jagged Little Pill"
      },
      {
        "artist_id": 5,
        "id": 7,
        "title": "Facelift"
      },
      {
        "artist_id": 6,
        "id": 8,
        "title": "Warner 25 Anos"
      },
      {
        "artist_id": 7,
        "id": 9,
        "title": "Plays Metallica By Four Cellos"
      },
      {
        "artist_id": 8,
        "id": 10,
        "title": "Audioslave"
      }
    ]
  }
]
```

Now let's deploy to Hasura and see how the GraphQL schema looks. 

[//]: # (TODO Need to have the deploy section done)

Let's add a `where` clause to fetch the albums for artist ID `1`.

We can see that the generated SQL is correct and that we're correctly parameterizing the query as well.

Let's try a query which uses a logical operator in the Hasura DDN GraphiQL console: 

```graphql
query MyQuery {
  albums(where: {
    _or: [
      {artist_id: {_eq: 1}}, 
      {artist_id: {_eq: 2}}, 
      {artist_id: {_eq: 5}}
    ]
  }) {
    title
  }
}
```

Again, we generate valid SQL and parameters, although we do have too many parentheses here. That's something we can
improve later, but it's better to err on the safe side for now.

We've added support for basic where clauses, and we'll come back and fill in some of the missing expression types
later, but next time, we'll take a look at order by clauses.