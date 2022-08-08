---
title: "Response Limiting"
metaTitle: "Response Limiting | Hasura GraphQL Advanced Tutorial"
metaDescription: "We can restrict how much data can be accessed in a single request through response limits. On top of rate limiting, response limiting is important to not create a database bottleneck"
---

Once you have configured API limits, you also have the luxury of limiting the number of rows returned, and access to aggregation queries on top of this.

Let's say you have a rate limit of 100 req/min. But what if each request fetches data worth thousands of rows from the database. This would become a bottleneck to the database.

We can restrict how much data can be accessed in a single request through response limits.
This can be configured at the role based permission layer.

In our slack model example, if we want to restrict `channel_thread` to return only a maximum of 100 rows at any point of time, then we can configure that using Limit in permissions like below:

Head to the `channel_thread` table and to the `Permissions` tab on the Hasura Console.

![Channel thread response limit](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

Under `Row Select Permissions`, configure the `Limit` to be 100 or to any desired value.

By default, aggregation queries cannot be made. It needs to be explictly enabled under role permissions. This is to ensure data like `count` are not exposed easily to the user making the request.
