---
title: "SELECT"
metaTitle: "SELECT (T-SQL) command | MSSQL Tutorial"
metaDescription: "This page explains how you can query the database and view the records using the `SELECT` query."
---

`SELECT` is a T-SQL command of the type Data Query Language (DQL). A `SELECT` query is used to retrieve rows from a table.

## Prerequisite

* MS SQL Server database installed on [Windows](https://hasura.io/learn/database/microsoft-sql-server/installation/1-installing-mssql-windows/) or [Linux](https://hasura.io/learn/database/microsoft-sql-server/installation/2-installing-mssql-linux/) or on [Mac](https://hasura.io/learn/database/microsoft-sql-server/installation/3-installing-mssql-mac/) OS.
* [SQL Server Management Studio (SSMS)](https://hasura.io/learn/database/microsoft-sql-server/installation/1-installing-mssql-windows/) or `sqlcmd` utility.

## Download sample database

Download the sample database here: [AdventureWorks2019.bak](https://docs.microsoft.com/en-us/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms).

Select the `OLTP` data that is used for most typical online transaction processing workloads.

Move the `.bak` file to your SQL Server backup location. The default location for a default instance of SQL Server 2019 is: `C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\Backup`.

## Restore to SQL Server

Next, you can use the `.bak` file to [restore the sample database](https://hasura.io/learn/database/microsoft-sql-server/restore/) into your SQL Server.

## Before you begin

1. In the **Object Explorer**, click to expand **AdventureWorks2019 > Tables**.
2. Select **HumanResources.Employee** and then click **New Query** from the top ribbon bar.
where,

- `HumanResources` is the schema name.
- `Employee` is a table in the above schema.

3. Run the below statement to use the 'AdventureWorks2019' sample database.

```SQL
USE AdventureWorks2019;
GO
```

## SELECT T SQL statements

The statement is used to retrieve all of the columns or some columns based on certain clauses.

**Syntax**

```SQL
SELECT [Arguments]
FROM <table_name>
WHERE <search_condition>
GROUP BY <group_by_expression>
HAVING <search_condition>
ORDER BY <order_expression> [ASC|DESC]
```

The **Arguments** may be any of the following:

* ALL: The result set returns all the rows and columns and may include duplicate values. 'ALL' is the default.
* DISTINCT: Returns unique rows.
* column_list: A single column name or a list of comma-separated column names.
* *: The result set returns all columns and rows from a table/view, as specified in the 'FROM' clause.

Some of the common select query clauses are:

### Select to retrieve all rows and columns

```SQL
SELECT * FROM HumanResources.Employee;
```

![All rows](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/all-rows.png)

### Get the count of all rows in a table

```SQL
SELECT COUNT(*) FROM HumanResources.Employee;
```

![Count of rows](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/count-rows.png)

### Select certain columns

```SQL
SELECT NationalIDNumber, JobTitle FROM HumanResources.Employee;
```

![only2cols](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/only2-cols.png)

### Select columns and print an alias column name

```SQL
--First column is renamed as 'SSN'
SELECT NationalIDNumber AS 'SSN', HireDate
FROM HumanResources.Employee;
```

![Alias column name](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/col-alias.png)

### Derived column

A derived column is based on the calculation results on another column(s).

```SQL
SELECT ( VacationHours + SickLeaveHours ) AS 'TOTAL LEAVES' FROM HumanResources.Employee;
```

![Derived column](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/derived-col.png)

### Select distinct rows

`DISTINCT` keyword removes any duplicate row(s).

The query results in 290 rows

```SQL
SELECT JobTitle FROM HumanResources.Employee;
```

The query results in 67 rows

```SQL
SELECT DISTINCT JobTitle FROM HumanResources.Employee;
```

### Limit the rows with the WHERE clause

1. Equal to `=` operator

```SQL
--List all the employees with a specific job title
SELECT * FROM HumanResources.Employee
WHERE JobTitle='Application Specialist';
```

![single-jobTitle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/single-jobTitle.png)

2. `LIKE`

The `LIKE` clause retrieves only the rows that match the search pattern (regular expression).

```SQL
--Search with a regular expression - 'Assistant' anywhere in the text
SELECT DISTINCT JobTitle FROM HumanResources.Employee
WHERE JobTitle LIKE '%Assistant%';
```

![regex1](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/regex1.png)

```SQL
--Job Title that begins with 'Assistant' followed by any text
SELECT DISTINCT JobTitle FROM HumanResources.Employee
WHERE JobTitle LIKE 'Assistant%';
```

![regex2](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/regex2.png)

```SQL
--Job Title that ends with 'Assistant'
SELECT DISTINCT JobTitle FROM HumanResources.Employee
WHERE JobTitle LIKE '%Assistant';
```

![regex3](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/regex3.png)

```SQL
--Job Title that begins with 'Human' and ends with 'Assistant'
SELECT DISTINCT JobTitle FROM HumanResources.Employee
WHERE JobTitle LIKE 'Human%Assistant';
```

![regex4](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/regex4.png)

3. `NOT LIKE`

```SQL
-- Retrieve all the roles, where 'Job Title' is not like the given string.
SELECT DISTINCT JobTitle FROM HumanResources.Employee
WHERE JobTitle NOT LIKE '%Supervisor%';
```

4. LOGICAL `AND`

```SQL
--Select the rows where both the `Where` conditions are true
SELECT * FROM HumanResources.Employee
WHERE OrganizationLevel=2 AND JobTitle LIKE '%Assistant%';
```

![logical-and](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/logical-and.png)

5. LOGICAL `OR`

```SQL
--Show the rows where any one of the conditions is true
SELECT * FROM HumanResources.Employee
WHERE OrganizationLevel=2 OR JobTitle LIKE '%Assistant%';
```

![Logical-or](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/logical-or.png)

6. `IN`

```SQL
SELECT * FROM HumanResources.Employee
WHERE OrganizationLevel IN (1,3);
```

![in-condition](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/in-condition.png)

7. `BETWEEN`

```SQL
--Rows with OrganizationLevel that include 2,3, AND 4.
SELECT DISTINCT OrganizationLevel FROM HumanResources.Employee
WHERE OrganizationLevel BETWEEN 2 and 4;
```

![between-range](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/between.png)

8. `NOT`

```SQL
--Rows with OrganizationLevel that do not include 2,3, AND 4.
SELECT DISTINCT OrganizationLevel FROM HumanResources.Employee
WHERE OrganizationLevel NOT BETWEEN 2 and 4;
```

![not-between](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/not-between.png)

## Group BY

The `GROUP BY` clause is used to categorize the result set based on a single or multiple columns.

* The clause can be applied only on the column(s) that are listed in the `SELECT` query
* All non-aggregate columns listed in the `SELECT` query must be included in the `GROUP BY` clause. Or, the column on which you apply the `GROUP BY` clause must be a non-aggregate column.

```SQL
--Get the count of employees in each department.
SELECT COUNT(NationalIDNumber) AS 'Count of employees', JobTitle
FROM HumanResources.Employee
GROUP BY JobTitle;
```

![group-by](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/group-by.png)

## HAVING

Is used along with the `GROUP BY` clause to limit the result set obtained by the Group by clause.
It specifies a search condition on the Groups.

```SQL
--List the department that has more than 25 employees
SELECT COUNT(NationalIDNumber) AS 'Count of employees', JobTitle 
FROM HumanResources.Employee
GROUP BY JobTitle
HAVING COUNT(NationalIDNumber) > 20;
```

![having](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/having.png)

### ORDER BY

The result set can be sorted by any column's value in ascending (`ASC`) or descending (`DESC`) order.
By default, the rows are sorted in ascending order. To change the order in descending order run the following statement:

```SQL
--Rows ordered in descending order of BusinessEntityID
SELECT * FROM HumanResources.Employee
ORDER BY BusinessEntityID DESC;
```

![order-by](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/select/order-by.png)

## SELECT INTO

Use the `SELECT INTO` statement to create another (backup) table from an existing table.

```SQL
USE AdventureWorks2019;
GO

SELECT *
INTO PRODUCTION.PRODUCT_BACKUP
FROM PRODUCTION.PRODUCT;
```
