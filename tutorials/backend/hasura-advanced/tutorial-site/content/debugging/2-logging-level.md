---
title: "Logging Level"
metaTitle: "Logging Level | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura server outputs structured logs for your GraphQL API that can be configured to output different log levels from http-log, websocket-log, webhook-log"
---

Earlier in the tutorial, we ran a docker-compose setup for hasura/graphql-engine and postgres. Accessing the server logs can be done using `docker logs` command followed by the container id of Hasura. This would output the graphql-engine logs for your local instance. If you would like to debug a Hasura Cloud Project, you can head to the `Pro/Monitoring` tab on the Hasura Console.

This tab will give various structured metrics of the API usage. Starting from the errors to websocket connections, the queries can be inspected individually. Unlike the open source version, the Cloud instance will have a better UX around inspecting individual requests.

By default, all log-types are enabled on Hasura Cloud. If you want to disable any of them, you can do so by configuring `HASURA_GRAPHQL_ENABLED_LOG_TYPES` ENV variable.

These are configurable:

- http-log
- websocket-log
- webhook-log

There is a logging level that can be configured to specify how explicit the information should be. The log-level hierarchy is: `debug > info > warn > error`. This can be updated using `HASURA_GRAPHQL_LOG_LEVEL` with the highest logging level being `debug`. This coupled with the `dev` mode would give insights into what is going wrong in the underlying query / handler.
