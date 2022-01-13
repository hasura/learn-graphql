---
title: "Dev Mode"
metaTitle: "Dev Mode | Hasura GraphQL Advanced Tutorial"
metaDescription: "In local dev with custom code written, you may want to see the exact details of the webhook call for the custom code handler like Hasura Actions."
---

In local dev with custom code written, you may want to see the exact details of the webhook call for the custom code handler like Hasura Actions.

## Enable Dev Mode {#enable-dev-mode}

Head to Hasura Cloud dashboard to the project settings and add a new ENV var.

The new env var would be `HASURA_GRAPHQL_DEV_MODE` with a boolean true.

![Enable Dev Mode](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

Once this is enabled, this would add an `extensions` key to the `errors` object of the response. The `internal` key contains error information including the generated SQL statement and exception information from Postgres.

Of course it is highly recommended to enable this dev mode only in dev/staging environments and also for just the `admin` role. To force the extensions to work only for the admin role, we can add a new env var called `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS` boolean with a `true` value.
