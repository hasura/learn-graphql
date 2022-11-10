---
title: "Connecting to a PostgreSQL database"
metaTitle: "Connecting to a PostgreSQL database | PostgreSQL Tutorial"
metaDescription: "Learn how to connect to a PostgreSQL database with psql"
---

Based on the keyword/value and connection URI we generated in the previous step, we will connect to the database and execute a few commands to try out a few things.

## Connect to a PostgreSQL database with psql

There are different ways to connect to a PostgreSQL database through psql. You can either use psql flags or the database connection string.

Connect to the database using the psql flags:

```bash
psql -h 192.168.0.118 -d postgres -U postgres -p 5432
```

> Note: Make sure you replace the host IP with your database IP.

Running the command prompts you to enter the password. If the connection is successful, you should see something like this:

```bash
psql (13.3)
Type "help" for help.

postgres=#
```

Alternatively, you can connect to the database using the database connection string:

```bash
psql postgresql://username:password@host:port/dbname
```

The above command connects directly to the database without asking for a password because the connection string already contains it.

### Connect to a PostgreSQL database in SSL mode with psql

```bash
psql "sslmode=require host=<db-host> dbname=<db-name> user=<db-user>"
```

If the command runs successfully, you should see a similar output in your terminal:

```bash
psql (13.3)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=#
```

It's important to mention that the Postgres server should support SSL to use the SSL mode.

Now that you know how to connect to a Postgres database, you can start executing commands and SQL statements. Let's see a few examples.

### psql create database

```sql
create database hasura;
```

Here, we are creating a new database called `hasura`.

### psql list databases

Next up, let us list all the available databases in this instance.

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

We can see the newly created database `hasura` and the existing `postgres` database available from our installation setup.

### psql list tables

```sql
\dt
```

Since we don't have any tables created, this would return `Did not find any relations`.
