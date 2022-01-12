---
title: "Table"
metaTitle: "T-SQL commands on a table | MSSQL Tutorial"
metaDescription: "This page explains how to create a table, insert data into a table, drop table, and truncate a table."
---

### Prerequisite

* MS SQL Server
* SQL Server Management Studio
* Create a Database

## CREATE table

`CREATE` is a T-SQL DDL command.

**Syntax**

```SQL
CREATE TABLE <table_name> (
    <column_name> data_type constraints
    ...
)
```

where,

* `table_name`: Name of the table to be created
* `column_name`: Column(attribute) name
* `data_type`: SQL data type
* `constraints`: MSSQL constraints to enforce data integrity

Example:

```SQL
USE HASURA; /*Connect to the database*/

CREATE TABLE EMPLOYEE (
    EMP_ID INT PRIMARY KEY,
    EMP_NAME VARCHAR(40) NOT NULL,
    DEPT_ID INT
)
GO
```

output:

`Commands completed successfully.`

In the *Object Explorer* window, refresh and view the `employee` table created under the `Hasura` database.

## INSERT data into the table

`INSERT` is a T-SQL command of type DML.

**Syntax**

```SQL
INSERT INTO <table_name> VALUES (

);
```

### Insert single row

```SQL
USE HASURA;

INSERT INTO EMPLOYEE VALUES (
1,'DB2',100
);

GO
```

The values entered must correspond to the sequence of the columns.

### Insert multiple rows

List the names of the columns and enter the values in the order of the column names listed in the `INSERT` statement.

```SQL
INSERT INTO EMPLOYEE(emp_id, dept_id, emp_name)
VALUES
(2, 101, 'MYSQL'),
(6, 110, 'MSSQL'),
(4, 101, 'ORACLE');
GO
```

## DROP table

The `DROP` command (DDL) removes the data table and the table's structure from the database.

**Syntax**

```SQL
DROP TABLE [IF EXISTS] <table_name>;
GO
```

`IF EXISTS`: First checks if the table exists, and if it does, drop the table.

Without this keyword if the table does not exist, an error is thrown:
`Cannot drop the table 'EMPLOYEE', because it does not exist or you do not have permission.`

Example:

```SQL
USE HASURA;

DROP TABLE IF EXISTS EMPLOYEE;
GO
```

The `SELECT` query on the 'EMPLOYEE' table results in an error: "Invalid object name 'EMPLOYEE'".

## TRUNCATE table

The `TRUNCATE` is a DDL T-SQL command. This command is used to delete the data in a table, but the structure of the table remains.

```SQL
USE HASURA

TRUNCATE TABLE EMPLOYEE;
GO
```

The `SELECT` query on the 'EMPLOYEE' table displays the structure of the table 'EMPLOYEE' with no rows in it.

![table structure remains](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/t-sql/table-truncated.png)
