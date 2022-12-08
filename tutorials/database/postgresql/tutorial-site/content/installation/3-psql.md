---
title: "PostgreSQL Clients"
metaTitle: "PostgreSQL Client Applications | psql | PostgreSQL Tutorial"
metaDescription: "Postgres can be connected from a programming language, a CLI tool or a GUI. We will look at the various client applications for Postgres in this section."
--- 

Postgres can be connected from a programming language, a CLI tool or a GUI. Postgres follows the `Client Server` architecture where the server listens to requests from the client and returns a response.

In the end, the clients are just wrappers over SQL commands that get executed on the server and return a response.

Some of the popular client applications for PostgreSQL include

- `pg_dump` - Extracting database into a file
- `pg_restore` - Restoring a database from a file
- `create_db` - Create a new PostgreSQL database
- `create_user` - Create a new PostgreSQL user account
- `psql` - Interactive terminal

The full list of client applications is available [here](https://www.postgresql.org/docs/current/reference-client.html).

We will use `psql` for the rest of the tutorial. Since it's an interactive terminal, we can execute commands, SQL statements and control the database as a whole.