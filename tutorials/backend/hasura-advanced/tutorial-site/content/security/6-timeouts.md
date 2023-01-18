---
title: "Timeouts"
metaTitle: "Timeouts | Hasura GraphQL Advanced Tutorial"
metaDescription: "The other attack vector is to make a query that takes a long time to execute. There are broadly two types of timeouts: Database Timeout and HTTP Timeout."
---

The other attack vector is to make a query that takes a long time to execute. There are broadly two types of timeouts:

*Database timeout*: If a database connection or a query takes a long time to respond, Hasura can return a timeout error. There's a `statement_timeout` setting in Postgres to abort any statement execution that's taking longer than specified milliseconds. This is just a configuration at the database layer (Postgres in this case).

*HTTP timeout*: If you are using Actions/Remote Schemas/Events, you would have configured HTTP endpoints for respective requests. You can configure a timeout setting as well to abort the query execution. HTTP endpoints make different queries in their underlying logic, and configuring a timeout is recommended to abort connections and respond quickly to the client.
