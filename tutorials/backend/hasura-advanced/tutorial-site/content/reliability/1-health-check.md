---
title: "Health Check"
metaTitle: "Health Check | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura gives a health check endpoint to monitor the status of the GraphQL API. This is available under the `/healthz` endpoint for all Hasura projects (including the OSS GraphQL Engine)."
---

Hasura gives a [health check endpoint](https://hasura.io/docs/latest/deployment/health-checks/healthz-check/) to monitor the status of the GraphQL API. This is available under the `/healthz` endpoint for all Hasura projects (including the OSS GraphQL Engine).

Make a `GET` request to the `/healthz` endpoint to fetch the status as follows:

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz 
```

Note: Replace (advanced-hasura) with your project name.

The status could be one of the following:

- `200, OK` - This requires no action. Everything is working correctly.
- `200, WARN, inconsistent objects in schema` - This requires a review of metadata since some inconsistent objects have been identified. Usually, it occurs when a `metadata apply` has the wrong objects.
- `500, ERROR` - This means the API is not working, and the logs need to be checked.
