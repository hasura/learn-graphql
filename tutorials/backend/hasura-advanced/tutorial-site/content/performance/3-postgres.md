---
title: "Postgres Indexes"
metaTitle: "Postgres Indexes | Hasura GraphQL Advanced Tutorial"
metaDescription: ""
---

Postgres indexes are a way of increasing performance on a column that is queried frequently. The concept is similar to the one of an index in a book. It helps accessing the data you’re looking for more quickly by maintaining additional metadata.

Let’s say the database receives a large number of requests for selecting channels being queried by their name, for example:

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

We can now create an index on the name column of the channel table:

Head to the Data tab on the Hasura Console and navigate to the `SQL` tab.

Execute the following statement:

```sql
CREATE INDEX channel_name_index ON channel (name);
```

Since the database is now able to look up the result of these queries more quickly, the performance of these queries will increase significantly.

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
