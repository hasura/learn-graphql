---
title: "Triggers"
metaTitle: "Triggers | MySQL Tutorial"
metaDescription: "A trigger in MySQL is a set of SQL statements that are part of a system catalog. It is a type of stored procedure that is automatically invoked in response to an event which is specified by the user."
---

A trigger in MySQL is a set of SQL statements that are part of a system catalog. It is a type of stored procedure that is automatically invoked in response to an event which is specified by the user. Each trigger is associated with a specific table, which is activated on any DML statement.

A trigger is also known as a special procedure because it cannot be called directly like a function. The most important difference between the trigger and a procedure is that a trigger is called automatically in the case of a data modification event. In contrast, a stored procedure needs to be called explicitly.

**Row-Level Trigger:** It is a trigger, which is activated for every row by a trigger statement such as insert, update, or delete. For example, if a table has inserted, updated, or deleted multiple rows, the row trigger is fired automatically for each row affected by the insert, update, or delete statement.

**Statement-Level Trigger:** It is a trigger, which is fired once for each event that occurs on a table regardless of how many rows are inserted, updated, or deleted.

Below is an example of how to use a trigger:

mysql; DELIMITER //

```mysql
Create Trigger before_insert_empworkinghours

BEFORE INSERT ON employee FOR EACH ROW

BEGIN

IF NEW.working_hours < 0 THEN SET NEW.working_hours = 0;

END IF;

END //
```

This trigger automatically sets the working hours as zero if the user tries to enter the working hours value as less than zero.
