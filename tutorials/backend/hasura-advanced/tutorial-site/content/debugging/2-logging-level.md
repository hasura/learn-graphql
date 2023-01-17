---
title: "Logging Level"
metaTitle: "Logging Level | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura server outputs structured logs for your GraphQL API that can be configured to output different log levels from http-log, websocket-log, webhook-log"
---

Earlier in the tutorial, we ran a docker-compose setup for hasura/graphql-engine and Postgres. You can access the server logs using the`docker logs` command followed by the container id of Hasura. Running the command returns the graphql-engine logs for your local instance. If you want to debug a Hasura Cloud Project, head to the `Pro/Monitoring` tab on the Hasura Console.

This tab will give various structured metrics of your API usage. You can inspect all queries individually and see the errors in WebSocket connections. Unlike the open-source version, the Cloud instance will have a better UX around inspecting individual requests.

Hasura Cloud comes with all log types enabled by default. If you want to disable any of them, you can do so by configuring the `HASURA_GRAPHQL_ENABLED_LOG_TYPES` ENV variable.

The following logs are configurable:
- http-log
- websocket-log
- webhook-log

You can configure the logging level to specify how explicit the information should be. The log-level hierarchy is: `debug > info > warn > error`. This can be updated using `HASURA_GRAPHQL_LOG_LEVEL` with the highest logging level being `debug`. This, coupled with the `dev` mode, would give insights into what is going wrong in the underlying query/handler.
