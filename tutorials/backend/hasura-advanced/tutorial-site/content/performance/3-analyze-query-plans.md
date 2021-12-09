---
title: "Analyzing Query Plans"
metaTitle: "Analyzing Query Plans | Hasura GraphQL Advanced Tutorial"
metaDescription: "Postgres has great tooling to understand how slow a query runs. You can execute a simple SQL statement using `EXPLAIN` to ask the database why a particular query is taking long."
---

Postgres has great tooling to understand how slow a query runs. You can execute a simple SQL statement using `EXPLAIN` to ask the database why a particular query is taking long. For example, in our slack model, we can make the following query in the `SQL` tab of the `Data` page of the console:

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

The above one would return a `JSON` response with data for `Total Cost`, `Planning Time`, `Execution Time` etc among other metrics. These metrics are useful to understand how long a query is taking and what parts to optimize. For example, this returned a plan type `Seq Scan` (Sequential Scan) and for large datasets this could be relatively slower.

## PostgreSQL Indexes {#postgresql-indexes}

Postgres indexes are a way of increasing performance on a column that is queried frequently. The concept is similar to the one of an index in a book. It helps accessing the data you’re looking for more quickly by maintaining additional metadata.

Let’s say the database receives a large number of requests for selecting channels being queried by their name, for example:

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

In the API Explorer, make the following query

```graphql
query {
    channel {
        id
        name
    }
}
```

and click on `Analyze` button.

![Explain/Analyze](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

You can notice that there is a Sequential scan. This could become slower if there are a lot of records in the database.

We can now create an index on the name column of the channel table:

Head to the Data tab on the Hasura Console and navigate to the `SQL` tab again.

Execute the following statement:

```sql
CREATE INDEX channel_name_index ON channel (name);
```

Since the database is now able to look up the result of these queries more quickly, the performance of these queries will increase significantly.
