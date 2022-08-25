---
title: "Create View"
metaTitle: "PostgreSQL CREATE VIEW| PostgreSQL Tutorial"
metaDescription: "In this example, we will look at how to create a PostgreSQL view with CREATE OR REPLACE VIEW statement."
---

In this example, we will look at how to create a PostgreSQL view with CREATE OR REPLACE VIEW statement.

## Create a PostgreSQL View

You can create a Postgres view with `CREATE OR REPLACE VIEW` statement. For example, to create a view for the existing `users` table to find only users who are above a particular age. We can make use of `SELECT` to get exactly the type of data and rows we want in the view to be able to dynamically query.

```sql
CREATE OR REPLACE VIEW "public"."old_users" AS
 SELECT users.id,
    users.age
   FROM users
  WHERE (users.age >= 60);
```

## GraphQL Example

Check out the Postgres view in GraphQL using our example [running in Hasura Cloud](https://cloud.hasura.io/public/graphiql?endpoint=https://learn-postgres.hasura.app/v1/graphql).
