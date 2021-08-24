---
title: "Alter Constraints"
metaTitle: "PostgreSQL Alter Constraints | PostgreSQL Tutorial"
metaDescription: "The ALTER statement can also be used to modify constraints like adding a check constraint or dropping a constraint in PostgreSQL "
---

Lets extend the concept of alter to modifying constraints.

Taking the users table example that we had earlier, lets add some constraints.

```sql
ALTER TABLE users ADD CONSTRAINT agecheck CHECK (age < 60);
```

This will add a constraint named `agecheck` with the condition that the age should be less than 60.

Now to drop the same constraint, we can execute the following statement:

```sql
ALTER TABLE users DROP CONSTRAINT agecheck;
```

Constraints can be of different types. As we saw earlier, it could be on the `Column`, on the `Table` or it could be a `Check` constraint.

Now if you want to change an existing constraint, you will drop the constraint first and then follow it up with the add constraint statement. This can also be done in a single transaction that is executed instead of multiple independent statements.
