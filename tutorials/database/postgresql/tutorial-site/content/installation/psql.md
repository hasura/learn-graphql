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

We will make use of `psql` for the rest of the tutorial. It being an interactive terminal, we can execute commands, SQL statements and control the database as a whole.

## psql

Based on the keyword/value and connection URI that we generated in the previous step, we will connect to the database and execute a few commands to try out a few thing.

### psql connect to database

```bash
psql -h 192.168.0.118 -d postgres -U postgres -p 5432
```

You will be prompted to enter the password.

Replace the host IP with your localhost IP. Once the above command is successful, you will be able to start executing SQL statements.

If this is successful, you should see something like:

```bash
psql (13.3)
Type "help" for help.

postgres=#
```

Now you can start executing commands and SQL statements. Let's do a few examples.

### psql create database

```sql
create database hasura;
```

Here, we are creating a new database called `hasura`.

### psql list databases

Next up, let us list down all the databases that are available in this instance.

```sql
\list
```

The output of the above command should yield something like this:

```bash
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   
-----------+----------+----------+------------+------------+-----------------------
 hasura    | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
(4 rows)
```

We can see the newly created database `hasura` along with the existing `postgres` database that is available from our installation setup.

### psql list tables

```sql
\dt
```

Since we don't have any tables created, this would return `Did not find any relations`.
