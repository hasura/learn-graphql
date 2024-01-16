# Let's Build a Connector - Part 4 - Aggregates

https://github.com/hasura/ndc-learn/assets/630306/fdb4eb12-c8a7-4425-bead-12459e257128

## Transcript

Hi everyone. 

This time, we're going to start to implement aggregates in our sqlite connector.

Like we've done before, we won't implement aggregates in their full generality, and instead we're going to implement two types of aggregates, called `star_count` and `column_count`. Other aggregates like `SUM` and `MAX` that you know from Postgres will come under the umbrella of _custom aggregate functions_, and we'll cover those separately in another video.

If we take a look at our failing tests, we see that aggregate queries are indicated by the presence of the `aggregates` field in the query request body. Just like the `fields` property that we handled previously, each aggregate is named with a key, and has a `type`, in this case `star_count`. So we're going to handle aggregates very similarly to fields, by building up a SQL target list from these aggregates.

The NDC spec says that each aggregate should act over the same set of rows that we consider when returning `rows`. That is, we should apply any predicates, sorting, pagination, and so on, and then apply the aggregate functions over the resulting set of rows.
 
So assuming we have a function called `fetch_aggregates` which builds the SQL in this way, we can fill in the `aggregates` in the response:

```rs
const aggregates = request.query.aggregates && await fetch_aggregates(state, request);
```

Now let's start to fill in a `fetch_aggregates` function.

We'll actually copy/paste the `fetch_rows` function and create a new function for handling aggregates. It'd be possible to extract that commonality into a shared function, but arguably not worth it, since so much is already extracted out into small helper functions anyway.

The first difference is the return type. Instead of `RowFieldValue`, we're going to return a value directly from the database, so let's change that to `unknown`.

Next, we want to generate the target list using the requested aggregates, so let's change that.

```rs
const target_list = [];

for (const aggregateName in request.query.aggregates) {
    if (Object.prototype.hasOwnProperty.call(request.query.aggregates, aggregateName)) {
        const aggregate = request.query.aggregates[aggregateName];
        switch (aggregate.type) {
            case 'star_count':
                // TODO
            case 'column_count':
                // TODO
            case 'single_column':
                // TODO
        }
    }
}
```

For now, we'll handle the first two cases here, and save the last for when we talk about custom aggregates.

In the first case, we want to generate a target list element which uses the `COUNT` SQL aggregate function.

```rs
case 'star_count':
    target_list.push(`COUNT(1) AS ${aggregateName}`);
    break;
```

In the second case, we'll also use the `COUNT` function, but this time, we're counting non-null values in a single column:

```rs
case 'column_count':
    target_list.push(`COUNT(${aggregate.column}) AS ${aggregateName}`);
    break;
```

We also need to interpret the `distinct` property of the aggregate object, and insert the `DISTINCT` keyword if needed:

```rs
case 'column_count':
    target_list.push(`COUNT(${aggregate.distinct ? 'DISTINCT ' : ''}${aggregate.column}) AS ${aggregateName}`);
    break;
```

Now let's update our generated SQL to use the generated target list:

```rs
const sql = `SELECT ${target_list.join(", ")} FROM (
               (
                 SELECT * FROM ${request.collection} ${where_clause} ${order_by_clause} ${limit_clause} ${offset_clause}
               )`;
```

Note that we form the set of rows to be aggregated first, so that the limit and offset clauses are applied correctly.

And instead of returning all rows, we're going to assume that we only get a single row back, so we can match on that and return the single row of aggregates:

```rs
const result = await state.db.get(sql, ...parameters);

if (result === undefined) {
    throw new InternalServerError("Unable to fetch aggregates");
}

return result;
```

That's it, so let's test our connector one more time, and hopefully see some passing tests this time.

And let's check that we're generating the right SQL.
