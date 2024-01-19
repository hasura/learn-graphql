## Query

The query function is going to delegate to a function called `fetch_rows`, but only when rows are requested, which is
indicated by the presence of the query fields property.

```typescript
async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  console.log(JSON.stringify(request, null, 2));
  const rows = request.query.fields && await fetch_rows(state, request);
  return [{ rows }];
}
```

Later, we'll also implement aggregates here.

Let's define the `fetch_rows` function:

```typescript
async function fetch_rows(state: State, request: QueryRequest): Promise<{
  [k: string]: RowFieldValue
}[]> {
  const fields = [];

  for (const fieldName in request.query.fields) {
    if (Object.prototype.hasOwnProperty.call(request.query.fields, fieldName)) {
      const field = request.query.fields[fieldName];
      switch (field.type) {
        case 'column':
          fields.push(`${field.column} AS ${fieldName}`);
          break;
        case 'relationship':
          throw new Error("Relationships are not supported");
      }

    }
  }

  if (request.query.order_by != null) {
    throw new NotSupported("Sorting is not supported");
  }

  const limit_clause = request.query.limit == null ? "" : `LIMIT ${request.query.limit}`;
  const offset_clause = request.query.offset == null ? "" : `OFFSET ${request.query.offset}`;

  const sql = `SELECT ${fields.join(", ")} FROM ${request.collection} ${limit_clause} ${offset_clause}`;

  console.log(JSON.stringify({ sql }, null, 2));

  return state.db.all(sql);
}
```
This function breaks down the request that we saw earlier and produces some SQL with this basic shape here. The
requested fields get pushed down in the target list, and the limit and offset clauses are generated based on the
request as well. Notice that we don't fetch more data than we need, either in terms of rows or columns. That's the
benefit of connectors - we get to push down the query execution to the data sources themselves.

## Test again

Now let's see it work in the test runner. We'll rebuild and restart the connector, and run the tests again.

Of course, we still see our tests fail, but now we've made some progress because the most basic tests are passing. If we
look at the connector logs, we can see that we're now receiving some more advanced queries which we're not handling yet,
such as queries with predicates and orderings.

In fact, we can get the test runner to write these expectations out as snapshot files to disk by adding the
`--snapshots-dir` argument.

```sh
ndc-test test --endpoint http://0.0.0.0:8100 --snapshots-dir snapshots
```

Here we can build up a library of query requests and expected responses that can be replayed in order to make sure that
our connector continues to exhibit the same behavior over time.

Finally, let's see what this connector looks like when we add it to our Hasura graph.

I have some [Hasura metadata ready here](https://github.com/hasura/ndc-typescript-learn-course/blob/main/deployment/metadata.hml),
but I won't go into the setup now. For more information on this you can check out
[the quickstart guide in the docs](https://hasura.io/docs/3.0/local-dev/).

For now, we can run a command to deploy this metadata to Hasura cloud, and see our connector in action. I can use the
`build create` command to create a new build from my metadata:

```sh
hasura3 cloud build create -p deployment/hasura.yaml
```

As you can see, I get a GraphQL endpoint and a console URL that I can use to test it. Let's take a look.

Let's make a request for albums, and specify a limit of 5 rows. In my metadata configuration, I've set up Hasura Cloud
to tunnel requests for this connector to my local machine, so as we can see, our connector has received the request and
generated the appropriate SQL.

In the next section, we'll start to fill out some of the missing query functionality, beginning with `where` clauses.