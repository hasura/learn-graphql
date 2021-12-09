---
title: "Observability"
metaTitle: "Observability | Hasura GraphQL Advanced Tutorial"
metaDescription: "Observability means you can answer any questions about what’s happening on the inside of the system just by observing metrics from outside of the system"
---

Observability means you can answer any questions about what’s happening on the inside of the system just by observing metrics from outside of the system.

In a GraphQL application, these are the important metrics and context to capture:

- time of query and query execution time
- actual query payload / query hash
- response status codes of queries/mutations/subscriptions
- graphql server version
- ip_address from which the query originated

and specifically in the case of Hasura GraphQL Engine, you might want to capture context like

- user_id of the user who made the query
- role of the user
- metadata of the query

With this information available, you can ask meaningful questions in a production deployment to find what went wrong internally, or why your Hasura GraphQL API is behaving the way it is. For example, if you see anomalies in query execution time for a particular query, you can try to identify what is wrong with the query (may be there is a database bottleneck that you need to optimise).

## Monitoring {#monitoring}

Hasura Cloud comes with built-in metrics for monitoring errors, websocket connections, subscriptions, with drill-down into individual operations.

Here's how the errors tab on Cloud looks like:

![Errors](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/error-monitoring.png)

Looking more closely, you can identify what requests are failing and why. With GraphQL you don't have status codes to identify errors uniquely. So the requests need to be insepcted for the `errors` object in response.

## Distributed tracing {#distributed-tracing}

The tracing in Hasura Cloud works across database, remote schemas, event trigger and auth webhooks, and actions.

Here's an example of a request being traced. This is specifically hitting just the database.

![Inspect Request](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/inspect-request.png)

The cached query is being inspected here. Inspecting an individual request gives more detailed metrics like the headers, tracing of the request and unique identifiers for debugging later.

Similarly any request made to the remote schema, actions and events can be traced.
