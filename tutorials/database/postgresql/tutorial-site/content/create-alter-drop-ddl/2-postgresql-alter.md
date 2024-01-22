---
title: "ALTER Statements"
metaTitle: "PostgreSQL ALTER Statements | PostgreSQL Tutorial"
metaDescription: "The ALTER statements in PostgreSQL are used to modify properties of existing objects like a table, column, function or a view."
---

The `ALTER` statements are used to modify properties of existing objects. In the last section, we tried `CREATE`. We can now make use of ALTER to change the definition of an existing object, be it a table, column, function, view etc.

## Example of PostgreSQL ALTER TABLE

Once a table is created, you can modify any of the table properties following this syntax:

```sql
ALTER TABLE <table_name> <action>
```

So lets use the above format to perform some actions. Postgres allows you to rename a table, add/remove/rename a column, change data type of a column if possible and add more constraints among other things.

From the previous example, you can modify the `users` table name by executing the following command:

```sql
ALTER TABLE users RENAME TO users_renamed;
```

## Example of PostgreSQL ALTER COLUMN

Now let's add a new column to the `users_renamed` table.

```sql
ALTER TABLE users_renamed 
ADD COLUMN created_at timestamptz;
```

This adds a column called `created_at` with a type timestamptz.

## Example of PostgreSQL RENAME COLUMN

Lets rename the column from `created_at` to `created`, retaining the same data type. This would look like:

```sql
ALTER TABLE users_renamed RENAME COLUMN created_at TO created;
```

## Example of PostgreSQL SET DEFAULT

Sometimes, we might to assign a default value to a column. Ideally you would want to do it during the creation step because that way all the rows will get the right values. But nevertheless, you can alter the default values for existing columns for rows that are going to be inserted in the future.

```sql
ALTER TABLE users_renamed ALTER COLUMN created SET DEFAULT 'now()';
```

## Example of PostgreSQL DROP COLUMN

In this step, lets trying dropping the column using the renamed version.

```sql
ALTER TABLE users_renamed DROP COLUMN created;
```

Once you are done with the above experiments, ensure the table name `users_renamed` is renamed back to `users` for convenience.
