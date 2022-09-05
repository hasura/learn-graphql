---
title: "Health Check"
metaTitle: "Health Check | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura gives a health check endpoint to monitor the status of the GraphQL API. This is available under `/healthz` endpoint for all Hasura projects (including the OSS GraphQL Engine)."
---

Hasura gives a health check endpoint to monitor the status of the GraphQL API. This is available under `/healthz` endpoint for all Hasura projects (including the OSS GraphQL Engine).

Make a `GET` request to the `/healthz` endpoint to fetch the status.

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz 
```

Replace (advanced-hasura) with your project name.

The status could be one of the following:

- `200, OK` - This requires no action. Everything is working as expected.
- `200, WARN, inconsistent objects in schema` - This requires a review of metadata since some inconsistent objects have been identified. Usually occurs when there is a metadata apply that had the wrong objects.
- `500, ERROR` - This means the API is not working and the logs need to be checked.
