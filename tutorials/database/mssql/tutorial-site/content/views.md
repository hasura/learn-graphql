---
title: "Views"
metaTitle: "Views - SQL Server | MSSQL Tutorial"
metaDescription: "Create views on one or more tables. Modify data through views, alter and drop views."
---

A View is a virtual table that is created by fetching data from one or more tables by a SQL query.

Just like a table, a view has data in the form of rows and columns. The content in a view is dynamically produced from the referencing table.

Views are generally used to:

* Simplify, customize, and filter data.
* Provide security by granting access to specific users on the views.
* Improve transaction performance

## Syntax

```SQL
CREATE VIEW <view_name> AS
SELECT [* | <columns_list>]
FROM <table_name>
[LEFT | RIGHT | FULL] JOIN <another_table> --optional
WHERE <condition> --optional
```

* `<view_name>`: A logical name for the view abiding to variables naming rules.
* `[* | <columns_list>]`: `SELECT` query with select all (`*`) option, or a comma-separated list of column names.
* `<table_name>`: First table being referenced.
* `<another_table>`: Next table name being referenced by the join query.
* `<condition>`: The `WHERE` clauses are applied to filter the result sets.

## Limitations and Restrictions

* A view can be created only in the current database.
* A view can have a maximum of 1,024 columns.

## Create views

```SQL
--Use the database that you created
USE HASURA;
GO

--View that references 2 tables based on the join condition
CREATE VIEW vempDetails AS
SELECT e.id, e.name, d.dept_name
FROM EMPLOYEE e
INNER JOIN DEPARTMENT d
ON e.dept_id=d.id;

--Retrieve data in a view as:
SELECT * FROM vempDetails;
```

![Retrieve view data](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/views/view-select-query.png)

## Modify data through views

A view is only updatable when it references a single table.

1. Create a view referencing a single table

```SQL
--View that references a single table
CREATE view v_employee AS
SELECT * FROM EMPLOYEE;

--Retrieve all the rows from the view
SELECT * FROM v_employee;
```

![View on a single table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/views/view-single-table.png)

2. Update the view

```SQL
--Insert a new row. The dept_id (29) must already be present in the 'Department' table
INSERT INTO v_employee VALUES(6, 'Dell', 29);

--Update values
UPDATE v_employee SET name='Torvalds' where name='Dell';

--Delete data
DELETE FROM v_employee WHERE id=6;
```

## Alter views structure

```SQL
--Alter the view to filter the result set with a `WHERE` clause
ALTER VIEW vempDetails AS
SELECT e.id, e.name, d.dept_name
FROM EMPLOYEE e
INNER JOIN DEPARTMENT d
ON e.dept_id=d.id
WHERE d.dept_name='Finance';

--Retrieve all the rows from the view
SELECT * FROM dbo.vempDetails;
```

![alter view](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/views/alter-view.png)

## Drop views

```SQL
--Drop the view from the database
DROP VIEW vempDetails;
```

Dropping a view does not affect the underlying referencing tables.

## Display the views definition

Use the system stored procedure `sp_helptext` to display the definition of the views (or any other user-defined objects).

```SQL
--Pass the view name as an argument within single quotes
sp_helptext 'dbo.vempDetails';
```

![views structure](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/views/views-structure.png)
