---
title: "Response Limiting"
metaTitle: "Response Limiting | Hasura GraphQL Advanced Tutorial"
metaDescription: "We can restrict how much data can be accessed in a single request through response limits. On top of rate limiting, response limiting is important to avoid creating a database bottleneck."
---

Once you have configured API limits, you also have the luxury of limiting the number of rows returned, plus access to aggregation queries.

Let's say you have a rate limit of 100 req/min. But what if each request fetches data worth thousands of rows from the database? It would result in a bottleneck to the database.

We can restrict how much data can be accessed in a single request through response limits. You can configure this at the role-based permission layer.

In our slack model example, if we want to restrict `channel_thread` to return only a maximum of 100 rows at any point in time, then we can configure that using `Limit` in permissions as follows:

Head to the `channel_thread` table and the `Permissions` tab on the Hasura Console.

![Channel thread response limit](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

Under `Row Select Permissions`, configure the `Limit` to be 100 or any desired value.

By default, aggregation queries are disabled. You need to enable them under role permissions explicitly. As a result, data like `count` are not exposed easily to the user making the request.