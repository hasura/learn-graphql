---
title: "Sequences and Increments"
metaTitle: "PostgreSQL Sequences and Auto Increments | PostgreSQL Tutorial"
metaDescription: "Sequences are user defined ordered list of integers that are unique and typically used as primary keys in PostgreSQL like relational database"
---

Sequences are user defined ordered list of integers. You can define a sequence like `1,2,3,4,5` or multiple of something like `2,4,6,8,10` among different combinations. Since these are unique, typically they are used as primary keys.

## Creating a Sequence

We can create a new sequence using the `CREATE SEQUENCE` statement. For example:

```sql
CREATE SEQUENCE increment_by_two INCREMENT 2 START 2;
```

Now the above statement creates a sequence called `increment_by_two` which starts at the value `2` and increments by `2`.

## Auto increment in PostgreSQL

Let's apply a simple sequence like `1,2,3,4,5...` to a column.

```sql
CREATE TABLE profile( id SERIAL );
```

Here the `id` column has been assigned a data type called `SERIAL` which generates a sequence called `profile_id_seq` with values starting from `1` and followed by increments of `1`. Typically `id` is used as a primary key and sequencing ensures the uniqueness of the column values.

## Operating on Sequence

Once a sequence is created, it can be operated on using certain functions. Primarily to fetch the current value, the next value in the sequence or (re)set the sequence to start from a new value.

- nextval
- currval
- setval

The above functions can be used to perform the operations on the sequence.
