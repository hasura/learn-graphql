---
title: "PostgreSQL Connection String"
metaTitle: "PostgreSQL Connection String | PostgreSQL Tutorial"
metaDescription: "Connection string is the entrypoint to connect to the database to perform various operations and execute SQL statements. In this section we will learn how to construct a Postgres connection string."
---
 
Once the installation is done, we need a way to connect the database to perform various operations and execute SQL statements. Once we are able to identify the various parameters involved in the credentials for connecting, we can construct something called Connection String.

Several libraries parse a user specified string to get the connection parameter. There are two formats which are widely used.

- plain keyword/value strings
- Connection URIs.

Example of keyword value:

```bash
host=localhost port=5432 dbname=mydb connect_timeout=10
```

Example of connection string:

```bash
postgresql://username:password@host:port/dbname[?paramspec]
```

Let us try to create a connection URI to the database we had set up in the previous step:

```bash
postgresql://postgres:postgrespassword@host.docker.internal:5432/postgres
```

Here the following parameters are used:

- POSTGRES_USER = postgres
- POSTGRES_PASSWORD = postgrespassword
- POSTGRES_HOST = host.docker.internal
- POSTGRES_PORT = 5432
- POSTGRES_DATABASE = postgres

In case you are using Linux, the host would be `localhost` and in case you are using Mac, the host would be `host.docker.internal`.

## Connection String from Heroku Postgres

In case you installed Postgres via Heroku in the earlier step, you can click on `View Database Credentials` button on their app dashboard for the Postgres add-on.

![View Database Credentials](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-postgresql/view-credentials-heroku.png)

We will make use of the Connection URI in the next step using psql.
