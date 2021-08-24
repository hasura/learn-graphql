---
title: "Performance"
metaTitle: "PostgreSQL Performance | PostgreSQL Tutorial"
metaDescription: "Performance tuning in PostgreSQL can be done by using Explain and Analyze, adding Indexes and identifying bottlenecks to fix query execution speed."
---

Performance bottlenecks at the database layer will hit at some point and there are quicker ways to analyze what is the bottleneck and how to make fixes.

## Explain and Analyze

Postgres has great tooling to understand how slow a query runs. You can execute a simple SQL statement using EXPLAIN to ask the database why a particular query is taking long. For example, in our `users` model, we can make the following query in the SQL tab of the Data page of the console:

Postgres Explain command displays the execution plan generated for the supplied SQL statement.

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM users
WHERE age > 13;
```

and when you execute the above command, you should see the following (similar) output.

```sql
                       QUERY PLAN
---------------------------------------------------------
 Seq Scan on users (cost=0.00..155.00 rows=10000 width=4)
(1 row)
```

## Indexes

Postgres indexes are a way of increasing performance on a column that is queried frequently. The concept is similar to the one of an index in a book. It helps accessing the data you’re looking for more quickly by maintaining additional metadata.

Let’s say the database receives a large number of requests for selecting users being queried by their age filter, for example:

```sql
SELECT * FROM users WHERE age > 13;
```

After running a `EXPLAIN` on top of this, we should see a sequential scan.

```sql
CREATE INDEX users_age_index ON users (age);
```

Since the database is now able to look up the result of these queries more quickly, the performance of these queries will increase significantly.
