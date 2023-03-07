---
title: "Dynamic Database Connection"
metaTitle: "Dynamic Database Connection | Hasura GraphQL Advanced Authorization Tutorial"
metaDescription: "Route to a database connection dynamically based on tenant information in a session variable in Hasura"
---

In a multi-tenant system, let's take the first use case of each tenant having their own database. Credentials are unique and separate.

In Hasura, you can add multiple databases as a data source, configure permissions independently. This solves the data isolation problem since different databases have different permissions configured and are also hosted independently, if required.

## Tenants in same database with different schemas or tables

There are cases where, instead of it being a separate database, you have the architecture either in different schemas or in tables with different column identifiers.

If you are integrating with a vendor IAM or wish to use database RLS, you will want to use different connection credentials per request. If you have setup PostgreSQL RLS, this becomes useful.

For example, in Hasura, you may use a session variable like `x-hasura-role` and use a specific connection for that role. The role information could be tied to a tenant or we could use some custom session variables like `x-hasura-tenant-id` and route to the right DB connection. 

Read more about [Dynamic Database Connection for Postgres](https://hasura.io/docs/latest/databases/connect-db/dynamic-db-connection/).

