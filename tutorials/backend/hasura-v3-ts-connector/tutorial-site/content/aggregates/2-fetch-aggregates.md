---
title: "Implementing Aggregates"
metaTitle: 'Aggregates | Hasura DDN Typescript Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Let's implement aggregates in our SQLite connector.

Like we've done before, we won't implement aggregates in their full generality, and instead we're going to implement two
types of aggregates, called `star_count` and `column_count`. Other aggregates like `SUM` and `MAX` that you know from
Postgres will come under the umbrella of _custom aggregate functions_.

If we take a look at our failing tests, we see that aggregate queries are indicated by the presence of the `aggregates`
field in the query request body. Just like the `fields` property that we handled previously, each aggregate is named
with a key, and has a `type`, in this case `star_count`. So we're going to handle aggregates very similarly to fields,
by building up a SQL target list from these aggregates.

```JSON
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
```

[The NDC spec](https://hasura.github.io/ndc-spec/specification/queries/aggregates.html) says that each aggregate should
act over the same set of rows that we consider when returning `rows`. That is, we should apply any predicates, sorting,
pagination, and so on, and then apply the aggregate functions over the resulting set of rows.

So assuming we have a function called `fetch_aggregates` which builds the SQL in this way, we can fill in the
`aggregates` in the response.

If the `query` function, add this line and amend the return type to include aggregates:

```typescript
const aggregates = request.query.aggregates && await fetch_aggregates(state, request);

return [{ rows,aggregates }];
```

So the final query function becomes:
```typescript
async function query(configuration: Configuration, state: State, request: QueryRequest): Promise<QueryResponse> {
    console.log(JSON.stringify(request, null, 2));

    const rows = request.query.fields && await fetch_rows(state, request);
    const aggregates = request.query.aggregates && await fetch_aggregates(state, request);

    return [{ rows, aggregates }];
}
```

Now let's start to fill in a `fetch_aggregates` helper function.

We'll actually copy/paste the `fetch_rows` function and create a new function for handling aggregates. It would be 
possible to extract that commonality into a shared function, but arguably not worth it, since so much is already 
extracted out into small helper functions anyway.

The first difference is the return type. Instead of `RowFieldValue`, we're going to return a value directly from the
database, so let's change that to `unknown`.

Next, we want to generate the target list using the requested aggregates, so let's change that.

```typescript
async function fetch_aggregates(state: State, request: QueryRequest): Promise<{ [k: string]: unknown }> {
    const target_list = [];

    for (const aggregateName in request.query.aggregates) {
        if (Object.prototype.hasOwnProperty.call(request.query.aggregates, aggregateName)) {
            const aggregate = request.query.aggregates[aggregateName];
            switch(aggregate.type) {
                case 'star_count':
                  
                case 'column_count':
                  
                case 'single_column':
            }
        }
    }
    
}
```

For now, we'll handle the first two cases here.

In the first case, we want to generate a target list element which uses the `COUNT` SQL aggregate function.

```typescript
// ...
case 'star_count':
    target_list.push(`COUNT(1) AS ${aggregateName}`);
    break;
// ...
```

In the second case, we'll also use the `COUNT` function, but this time, we're counting non-null values in a single column:

```typescript
// ...
case 'column_count':
    target_list.push(`COUNT(${aggregate.column}) AS ${aggregateName}`);
    break;
// ...
```

We also need to interpret the `distinct` property of the aggregate object, and insert the `DISTINCT` keyword if needed:

```typescript
// ...
case 'column_count':
    target_list.push(`COUNT(${aggregate.distinct ? 'DISTINCT ' : ''}${aggregate.column}) AS ${aggregateName}`);
    break;
// ...
```

We'll create a new generated SQL function within `fetch_aggregates()` to use the generated target list:

```typescript
// ...
const sql = `SELECT ${target_list.join(", ")} FROM (
    (
        SELECT * FROM ${request.collection} ${where_clause} ${order_by_clause} ${limit_clause} ${offset_clause}
    )`;
// ...
```

Note that we form the set of rows to be aggregated first, so that the limit and offset clauses are applied correctly.

And instead of returning all rows, we're going to assume that we only get a single row back, so we can match on that and
return the single row of aggregates:

```typescript
const result = await state.db.get(sql, ...parameters);

if (result === undefined) {
    throw new InternalServerError("Unable to fetch aggregates");
}

return result;
```

Here's the full function:

```typescript
async function fetch_aggregates(state: State, request: QueryRequest): Promise<{
    [k: string]: unknown
}> {
    const target_list = [];

    for (const aggregateName in request.query.aggregates) {
        if (Object.prototype.hasOwnProperty.call(request.query.aggregates, aggregateName)) {
            const aggregate = request.query.aggregates[aggregateName];
            switch(aggregate.type) {
                case 'star_count':
                    target_list.push(`COUNT(1) AS ${aggregateName}`);
                    break;
                case 'column_count':
                    target_list.push(`COUNT(${aggregate.distinct ? 'DISTINCT ' : ''}${aggregate.column}) AS ${aggregateName}`);
                    break;
                case 'single_column':
                    throw new NotSupported("custom aggregates not yet supported");
            }
        }
    }

    const parameters: any[] = [];

    const limit_clause = request.query.limit == null ? "" : `LIMIT ${request.query.limit}`;
    
    const offset_clause = request.query.offset == null ? "" : `OFFSET ${request.query.offset}`;

    const where_clause = request.query.where == null ? "" : `WHERE ${visit_expression(parameters, request.query.where)}`;

    const order_by_clause = request.query.order_by == null ? "" : `ORDER BY ${visit_order_by_elements(request.query.order_by.elements)}`;

    const sql = `SELECT ${target_list.join(", ")} FROM (
                    SELECT * FROM ${request.collection} ${where_clause} ${order_by_clause} ${limit_clause} ${offset_clause}
                )`;

    console.log(JSON.stringify({ sql, parameters }, null, 2));

    const result = state.db.get(sql, ...parameters);

    if (result === undefined) {
        throw new InternalServerError("Unable to fetch aggregates");
    }

    return result;
}
```

That's it, so let's test our connector one more time, and hopefully see some passing tests this time. 

Remember to delete the snapshots first, so that we can generate new ones:

```bash
rm -rf snapshots
```

And re-run the tests with the snapshots directory:

```shell
ndc-test test --endpoint http://0.0.0.0:8100 --snapshots-dir snapshots
```

OR
```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8100 --snapshots-dir snapshots
```

Nice! We've now implemented the `star_count` and `column_count` aggregates, and we've seen how to generate SQL for them.