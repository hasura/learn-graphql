---
title: "Querying and Inserting | DML"
metaTitle: "Querying and Inserting | Data Manipulation Language | PostgreSQL Tutorial"
metaDescription: "In this section, we will try out Querying and Manipulating Data with simple select, insert, update, delete statements in PostgreSQL"
---

DML stands for Data Manipulation Language and is typically used to add, retrieve or update data. The commands used for DML in PostgreSQL are `INSERT`, `UPDATE` and `DELETE`.

In this section, we will try out

- Querying and Manipulating Data with simple select, insert, update, delete statements.
- Filtering and sorting with arguments like where, order_by, limit, offset

## Modifying Data in PostgreSQL

### INSERT with Postgres

Data can be inserted into Postgres using `INSERT INTO`. For example:

```sql
INSERT INTO users (id, name, age, is_active)
VALUES(1, 'John', 20, true );
```

### UPDATE with Postgres

Existing data in tables can be updated using `UPDATE` keyword.

```sql
UPDATE users
SET is_active = false 
WHERE age < 10;
```

### DELETE with Postgres

Similarly to delete row(s) of an existing table, we can execute the following statement.

```sql
DELETE FROM users 
WHERE id = 1;
```

## Querying Data in PostgreSQL

In the above examples, we saw how to add or modify data. Now lets look at how to query the data.

### SELECT with Postgres

```sql
SELECT id, name, age, is_active FROM users;
```

This will give the rows with all the 4 columns of the table selected.

### Filtering with Postgres

Lets try out a statement to filter users who are active and above a certain age. The statement would look something like below:

```sql
SELECT id, name FROM users
WHERE is_active = true AND age > 13;
```

### Sorting with Postgres

In this example, we fetch users ordered by their name in ascending.

```sql
SELECT id, name FROM users
ORDER BY name asc;
```
