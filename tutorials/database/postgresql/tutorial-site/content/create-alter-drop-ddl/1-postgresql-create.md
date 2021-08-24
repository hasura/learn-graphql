---
title: "CREATE Statements"
metaTitle: "PostgreSQL CREATE Statements | PostgreSQL Tutorial"
metaDescription: "The CREATE statements in PostgreSQL are used to declaratively create tables, views, functions etc."
---

The `CREATE` statements are used to declaratively create tables, views, functions etc.
If you went through the `psql` section of the tutorial, you might have executed some of these commands:

## Example of PostgreSQL CREATE DATABASE

In order to create a new database in Postgres, you can run the following statement.

```sql
CREATE DATABASE myapp;
```

We can verify the above command by executing the following in `psql` interface.

```sql
\l
```

## Example of PostgreSQL CREATE TABLE

Next up, to create a new table, we can follow the syntax of `CREATE TABLE <table_name>(column_name data_type constraints)`;

For example:

```sql
CREATE TABLE users(
    id integer,
    name text,
    age integer,
    is_active boolean
);
```

Once the table is created, you can verify this using `psql` by executing the following command:

```sql
\dt
```

It will return something like this:

```
         List of relations
 Schema | Name  | Type  |  Owner   
--------+-------+-------+----------
 public | users | table | postgres
(1 row)
```

**Note**: By default, all the statements are executed against the `public` schema.

## Example of PostgreSQL CREATE USER

```sql
CREATE USER praveen
```

This would create a user called `praveen`. You can also assign the user a role while creating.

```sql
CREATE USER praveen with SUPERUSER;
```

The above command gives the user super user privilege.
