---
title: "Primary Keys"
metaTitle: "PostgreSQL Primary Keys | PostgreSQL Tutorial"
metaDescription: "A primary key in PostgreSQL is used to identify a row uniquely in a table. It could be a single column or a group of columns defined to restrict data input and validate."
---

A primary key is used to identify a row uniquely in a table. It could be a single column or a group of columns (composite). A primary key is one of the constraints that we define to restrict data input and validate.

Primary key is a combination of

- NOT NULL Constraint
- UNIQUE Constraint

## Defining a primary key

As we looked at the constraints in the previous section, In the `CREATE TABLE` statement, you can define a primary key for a column by using the `PRIMARY KEY` keyword against the required unique column or a combination of columns.

```sql
CREATE TABLE author (
  id integer PRIMARY KEY,
  name text,
);
```

Here the `id` column is marked as the primary key.

## Adding a primary key later

In case you had forgotten to mark any column as a primary key during table creation, we can also add a primary key later by altering the table using the following command:

```sql
ALTER TABLE author ADD PRIMARY KEY (id);
```

## Removing a primary key

We can remove an existing primary key by using the `DROP CONSTRAINT` keyword in the alter table syntax.

```sql
ALTER TABLE author DROP CONSTRAINT author_pkey;
```
