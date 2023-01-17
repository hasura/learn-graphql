---
title: "Dev Mode"
metaTitle: "Dev Mode | Hasura GraphQL Advanced Tutorial"
metaDescription: "In local dev with custom code written, you may want to see the exact details of the webhook call for the custom code handler like Hasura Actions."
---

In your local dev environment with custom code written, you may want to see the exact details of the webhook call for the custom code handler (like Hasura Actions).

## Enable Dev Mode {#enable-dev-mode}

Head to the project settings in the Hasura Cloud dashboard and add a new env var. The new env var should be `HASURA_GRAPHQL_DEV_MODE` with the value set to `true`.

![Enable Dev Mode](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

Once enabled, this adds an `extensions` key to the `errors` object of the response. The `internal` key contains error information, including the generated SQL statement and exception information from Postgres.

Of course, it is highly recommended to enable the dev mode only in dev/staging environments and only for the `admin` role. To force the extensions to work only for the admin role, add a new env var called `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS` and set it to `true`.
