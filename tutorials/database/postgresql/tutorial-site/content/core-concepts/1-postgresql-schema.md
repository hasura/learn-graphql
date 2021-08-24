---
title: "Schema"
metaTitle: "PostgreSQL Schema | PostgreSQL Tutorial"
metaDescription: "Schema is a collection of logical structures of data. In PostgreSQL, schema is a named collection of tables, views, functions, constraints, indexes, sequences etc."
---

## What is a schema in PostgreSQL?

Schema is a collection of logical structures of data. In PostgreSQL, schema is a named collection of tables, views, functions, constraints, indexes, sequences etc.

PostgreSQL supports having multiple schemas in a single database there by letting you namespace different features into different schemas.

For example, you can have a database named `postgres` and have multiple schemas based on your application like `ecommerce`, `auth` etc.

Here's the hierarchy:

- PostgreSQL can have multiple databases in each instance.
- Each database can have multiple schemas.
- Each schema can have multiple tables.

## Creating a Schema in PostgreSQL

The SQL syntax for creating a schema in PostgreSQL looks like:

```sql
CREATE SCHEMA <schema_name>;
```

where you can replace `<schema_name>` with a name of choice.

Head to the `psql` terminal window and execute the following to create a new schema.

```sql
CREATE SCHEMA ecommerce;
```

You should see the following output:

```bash
postgres=# CREATE SCHEMA ecommerce;
CREATE SCHEMA
```

## Dropping a Schema in PostgreSQL

The SQL syntax for dropping a schema in PostgreSQL looks like:

```sql
DROP SCHEMA <schema_name>;
```

and in case you want to cascade delete all referenced objects, you can make use of

```sql
DROP SCHEMA <schema_name> CASCADE;
```

and replace `<schema_name>` with the name of choice of your schema.

Applying this to our newly created schema, this would translate to,

```sql
DROP SCHEMA ecommerce;
```

Fundamentally, schemas let users namespace their various application features, especially third-party stuff to have their own space and not interfere with the primary data source.

Especially with role based access, it's easier to restrict access to schemas.

## Default Schema in PostgreSQL

By default, the `public` schema is used in PostgreSQL when you set it up for the first time. Of course, you can create and drop more.

Any SQL queries executed will run against the `public` schema by default unless explicitly mentioned.
