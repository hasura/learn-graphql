---
title: "Tables"
metaTitle: "PostgreSQL Tables | PostgreSQL Tutorial"
metaDescription: "A table in relational database consists of rows and columns and PostgreSQL tables are no different."
---

A table in relational database consists of rows and columns.

- Columns are fixed in order and each column has a unique name within a table.
- Rows can be unlimited but SQL does not guarantee the order in which rows are returned, unless you explicitly mention a sorting parameter like order by.
- Each column has a data type associated with it. This restricts the type of data that a column can store. For example, a column with data type integer will not accept string inputs. We will read more about data types in the next section.

## Creating a table in PostgreSQL

Let us look at an example of creating a table in PostgreSQL.

```sql
CREATE TABLE author (
    id integer,
    name text 
);
```

The above statement creates a table named `author` with two columns `id` and `name`.

The `id` column has the data type `integer` and `name` column has the data type `text`.

## Dropping a table in PostgreSQL

```sql
DROP TABLE author;
```

This will delete the table `author` from the `public` schema.

And if you want to cascade delete all associated objects, you can make use of the following:

```sql
DROP TABLE author CASCADE;
```

We will look at use cases of `CASCADE` when we look at relationships and foreign key constraints.
