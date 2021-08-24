---
title: "Create Trigger"
metaTitle: "Create Trigger PostgreSQL | PostgreSQL Tutorial"
metaDescription: "Lets look at an example of how to create a trigger in PostgreSQL which will get executed before an operation is executed."
---

## Trigger for a before operation

Lets look at an example of how to create a trigger which will get executed before an operation is executed.

```sql
CREATE FUNCTION check_user_type()
    RETURNS trigger AS $BODY$
    DECLARE active_user BOOLEAN;
    BEGIN
    SELECT users.age INTO active_user FROM "users" WHERE users.id = NEW."id";
    IF active_user > 13 THEN
        RAISE EXCEPTION 'User must be atleast 13';
    END IF;
    RETURN NEW;
    END;
    $BODY$ LANGUAGE plpgsql;
```

## Trigger for a materialized view

Let’s say we want to refresh a materialized view whenever a new user is inserted.

The following Postgres function refreshes a materialized view:

```sql
CREATE FUNCTION refresh_materialized_view()
  RETURNS trigger AS $BODY$
  BEGIN
  REFRESH MATERIALIZED VIEW old_users;
  RETURN NULL;
  END;
  $BODY$ LANGUAGE plpgsql;
```

Now, to make sure this function gets called whenever a new user is inserted, we can create the following Postgres trigger:

```sql
CREATE TRIGGER update_materialized_view AFTER INSERT 
ON "users" FOR EACH ROW EXECUTE PROCEDURE refresh_materialized_view();
```
