Now let's remove our old snapshots and re-run the test suite.

We can see that predicate tests are passing, but some other test cases are not. That's okay - we'll keep iterating over
the next few videos until we have all green tests here.

In our snapshots directory, we can also see that we're returning the correct data for some simple predicate queries.
This query searches for albums for artist with ID `5`, and we can see that the response contains the correct rows.

Now let's deploy to Hasura and see how the GraphQL schema looks.

Let's add a `where` clause to fetch the albums for artist ID `1`.

We can see that the generated SQL is correct and that we're correctly parameterizing the query as well.

Let's try a query which uses a logical operator:

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