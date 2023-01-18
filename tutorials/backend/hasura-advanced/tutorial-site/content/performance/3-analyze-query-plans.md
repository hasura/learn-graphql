---
title: "Analyzing Query Plans"
metaTitle: "Analyzing Query Plans | Hasura GraphQL Advanced Tutorial"
metaDescription: "Postgres has great tooling to understand how slow a query runs. You can execute a simple SQL statement using `EXPLAIN` to ask the database why a particular query is taking long."
---

Postgres has great tooling that helps you analyze the performance of queries. You can execute a SQL statement using `EXPLAIN` to ask the database why a particular query is slow. For example, in our slack model, we can make the following query in the `SQL` tab of the `Data` page of the console:

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

The above would return a `JSON` response with data for `Total Cost`, `Planning Time`, and `Execution Time`, among other metrics. These metrics help you understand how long a query takes and what parts to optimize. For example, this returned a plan type `Seq Scan` (Sequential Scan), and for large datasets, this could be relatively slower.

## PostgreSQL Indexes {#postgresql-indexes}

Postgres indexes are a way of increasing performance on a column that is queried frequently. The concept is similar to the one of an index in a book. It helps access the data you’re looking for more quickly by maintaining additional metadata.

Let’s say the database receives a large number of requests for selecting channels that are queried by their name, for example:

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

In the API Explorer, run the following query:

```graphql
query {
    channel {
        id
        name
    }
}
```

And click on the `Analyze` button.

![Explain/Analyze](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

You can notice that there is a Sequential Scan. This could become slower if there are a lot of records in the database.

To improve the performance, we can create an index on the name column of the `channel` table. Head to the `Data` tab in the Hasura Console and navigate to the `SQL` tab.

Execute the following statement:

```sql
CREATE INDEX channel_name_index ON channel (name);
```

Since the database can now look up the result of these queries more quickly, the performance of these queries will increase significantly.
