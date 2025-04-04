---
title: "The Query Function"
metaTitle: 'The Query Function | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Let's modify our query function to log out the request it receives, and this will give us a goal to work towards.

```typescript
async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  console.log(JSON.stringify(request, null, 2));
  throw new Error("Function not implemented.");
}
```

Remember to rebuild and restart the connector:

```shell
npm run build && node dist/index.js serve --configuration .
```

Let's run the tests again. In the `ndc-test` directory:

```shell
rm -rf snapshots
```

```shell
ndc-test test --endpoint http://0.0.0.0:8080 --snapshots-dir snapshots
```

OR
```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8080 --snapshots-dir snapshots
```

In the logs of the running app, we can see the request
that was sent. It identifies the name of the collection, and a query object to run. The query has a list of fields
to retrieve, and a limit of 10 rows. With this as a guide, we can start to implement our query function in the next
section.

```text
...
{
  "collection": "artists",
  "query": {
    "fields": {
      "id": {
        "type": "column",
        "column": "id",
        "fields": null
      },
      "name": {
        "type": "column",
        "column": "name",
        "fields": null
      }
    },
    "limit": 10
  },
  "arguments": {},
  "collection_relationships": {}
}
...
```

The query function is going to delegate to a function called `fetch_rows`, but only when rows are requested, which is
indicated by the presence of the query fields property. Let's do that:

```typescript
async function query(configuration: RawConfiguration, state: State, request: QueryRequest): Promise<QueryResponse> {
  console.log(JSON.stringify(request, null, 2));
  const rows = request.query.fields && await fetch_rows(state, request);
  return [{ rows }];
}
```

Later, we'll also implement aggregates here.

Let's define the `fetch_rows` function the `query` function is delegating to:

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

  const sql = `SELECT ${fields.length ? fields.join(", ") : '1 AS __empty'} FROM ${request.collection} ${limit_clause} ${offset_clause}`;

  console.log(JSON.stringify({ sql }, null, 2));
  
  const rows = await state.db.all(sql, {});

  return rows.map((row) => { delete row.__empty; return row; });
}
```

This function breaks down the request that we saw earlier and produces SQL with a basic shape. Here is what `fetch_rows` 
does: 

1. It initializes an empty array `fields` to store the fields that will be selected in the SQL query.

2. It iterates over the `fields` property of the `request.query` object. Each field represents a column in the database 
table that needs to be fetched.

3. For each field, it checks the `type` of the field. If the type is 'column', it adds the column name to the `fields` 
array. If the type is 'relationship', it throws an error because relationships are not supported in this context.

4. It checks if the `request.query.order_by` is not null. If it is not null, it throws an error because sorting is 
not supported.

5. It generates the `LIMIT` and `OFFSET` clauses for the SQL query based on the `request.query.limit` and 
`request.query.offset` values.

6. It constructs the SQL query string using the `fields` array, the collection name (which corresponds to the table 
name in the database), and the `LIMIT` and `OFFSET` clauses.

7. It logs the constructed SQL query.

8. Finally, it executes the SQL query on the database and returns the result. The database connection is accessed 
through the `db` object in the state.

Notice that we don't fetch more data than we need, either in terms of rows or columns. That's the benefit of 
connectors - we get to push down the query execution to the data sources themselves.


## Test again

Now let's see it work in the test runner. We'll rebuild and restart the connector, and run the tests again.

```text
...
├ Query ...
│ ├ albums ...
│ │ ├ Simple queries ...
│ │ │ ├ Select top N ... OK
│ │ │ ├ Predicates ... OK
│ │ │ ├ Sorting ... FAIL
│ ├ artists ...
│ │ ├ Simple queries ...
│ │ │ ├ Select top N ... OK
│ │ │ ├ Predicates ... OK
│ │ │ ├ Sorting ... FAIL
...
```

[//]: # (TODO - why are predicates passing here? They have not been implemented)

Of course, we still see some tests fail, but now we've made some progress because the most basic tests are passing.

We can get the test runner to write these expectations out as snapshot files to disk by adding the `--snapshots-dir` 
argument.

```shell
ndc-test test --endpoint http://0.0.0.0:8100 --snapshots-dir snapshots
```

OR
```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8100 --snapshots-dir snapshots
```

Here we can build up a library of **query requests** and **expected responses** that can be replayed in order to make 
sure that our connector continues to exhibit the same behavior over time.

Finally, let's see what this connector looks like when we add it to our Hasura graph, let's check that out in the 
next section. 

