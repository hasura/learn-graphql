---
title: "Rate Limiting"
metaTitle: "Rate Limiting | Hasura GraphQL Advanced Tutorial"
metaDescription: "Rate Limiting ensures that API performance issues caused by malicious or poorly implemented queries can be restricted."
---

Malicious or poorly implemented queries typically cause API performance issues. In the case of malicious queries, we can restrict by configuring allow lists as we did in the previous step. But sometimes, you can [configure restrictions for API access](https://hasura.io/docs/latest/security/api-limits/#introduction).

It could be implemented as follows:
- Rate of API requests - Rate limits
- Limiting the depth of the requests - Query Depth Limit

## Configuring an API limit {#configuring-api-limit}

Hasura Cloud lets you configure API limits in the Pro/Monitoring tab. Head to the `API Limits` page on the `Pro` tab of the Console. Click on `Configure` to start specifying a rule.

### Rate limits {#configuring-rate-limits}

Rate limits allow you to restrict the number of GraphQL operations per minute. It uses a sliding window approach, which means whenever Hasura receives a request, it will count the rate of that client, starting from the current time to the last minute.

You can configure the number of operations to 100, for example. The next step is configuring it based on some unique parameter, such as the IP address or session variables like `x-hasura-*`.

The `IP address` way of rate limiting is useful when the API is exposed to a broader public audience and when there is unauthenticated public access to queries.

The session variable way of rate limiting is useful when users of your application have an equal load on your API and database.

![Role based API Limit](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/role-based-api-limit.png)

API limits can be configured per role or globally for all roles.

### Query Depth limits {#query-depth-limits}

You can also restrict a GraphQL operation based on depth, preventing deeply nested queries. API limits are defined by role (anonymous, user) and can restrict request rate, depth, or both. Unique request parameters can include IP address or session variables (x-hasura-user-id, x-hasura-org-id, etc.)

In our slack schema, imagine a user making the following query:

```graphql
query userDetails {
  users {
    id
    name
    display_name
    bio
    channel_members {
      id
      user {
        id
        name
      }
      channel {
        id
        name
        channel_members {
          id
          user {
            id
          }
        }
      }
    }
  }
}
```

There are multiple depths to this query through relationships. Sometimes, due to the nature of relationships, you can keep looping through them in the query. For instance, here `channel_members` is being queried twice along with the `user` relationship inside that. This could go on and on, causing a really long SQL query to be generated. Such queries hit the performance of the database. Since these queries don't add any value, we should be able to restrict the depth of the query made to a reasonable number.

How do you determine the right depth of query? In the Allow List tab, you have the list of `New Operations` that gives you a fair idea of how many queries are being made and with what depth.

Let's assume we are fine with a query depth of 5, in this case, to allow other genuine queries to go through. We can configure the same through the API Limits.

![API Limits](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/api-limits.png)
