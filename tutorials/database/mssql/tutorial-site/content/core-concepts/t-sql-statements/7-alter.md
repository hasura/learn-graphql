---
title: "Alter Table"
metaTitle: "Alter table | MSSQL Tutorial"
metaDescription: "Learn how to alter the table structure and its data types."
---

An `ALTER` statement is a `DDL` T-SQL that modifies a table definition.
You can use an `ALTER` statement to:

* Add/drop columns/constraints/triggers
* Change column definition, datatype, maximum length

## Syntax

```SQL
ALTER TABLE <table_name>
[ALTER | ADD | DROP] [ <column_name> COLUMN | CONSTRAINT] datatype;
```

## Before you begin

```SQL
--Use the Hasura database
USE HASURA;
GO

--Create a new table
CREATE TABLE EMPLOYEE (
    EMP_ID INT PRIMARY KEY,
    EMP_NAME VARCHAR(40) NOT NULL,
    DEPT_ID INT
)
GO

--Retrieve all rows from the table
SELECT * FROM EMPLOYEE;
```

## Add a new column

```SQL
--Add a new column named 'PROJECT' with datatype varchar(5).
ALTER TABLE EMPLOYEE ADD PROJECT VARCHAR(5);
```

## Add a new column with a constraint

```SQL
ALTER TABLE EMPLOYEE ADD EMAIL VARCHAR(20) NULL
CONSTRAINT email_unique UNIQUE ;
```

## Modify column definition

```SQL
--Increase the string limit from 5 to 10
ALTER TABLE EMPLOYEE ALTER COLUMN PROJECT VARCHAR(10) NULL;
```

```SQL
--Change the data type of the column from 'INT' to 'DECIMAL'
ALTER TABLE EMPLOYEE ALTER COLUMN DEPT_ID DECIMAL(5,2);
```

## DROP column

```SQL
ALTER TABLE EMPLOYEE DROP COLUMN PROJECT;
```

## DROP CONSTRAINT

```SQL
ALTER TABLE EMPLOYEE DROP CONSTRAINT email_unique;
```

## What next

Use the `sp_help` stored procedure to view the table definition.

```SQL
sp_help 'EMPLOYEE'
```
