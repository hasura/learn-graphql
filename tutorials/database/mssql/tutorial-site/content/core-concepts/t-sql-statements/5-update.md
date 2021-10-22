---
title: "UPDATE"
metaTitle: "UPDATE table | MSSQL Tutorial"
metaDescription: "Learn how to update row(s) in a table"
---

The page explains how to update the existing data in a table with the `UPDATE` (DML) T-SQL command.

## Pre-requisite

* MS SQL Server
* SQL Server Management Studio (SSMS)
* Create/restore a Database (AdventureWorks2019)
* Create a table, and insert some data into the table.

**Syntax**

```SQL
UPDATE <table_name>
SET <column1>=<value1>
WHERE <column2>=<value2>
```

where,

* table_name: Name of the table to update
* column1: Name of the column to be updated
* value1: The new value to be updated.
* column2: column name to filter the search
* value2: The existing value to be searched to filter the row

## Before you begin

Install and restore the 'AdventureWorks2019' sample database.
Create a backup table from another table as:

```SQL
USE AdventureWorks2019;
GO

SELECT * 
INTO PRODUCTION.PRODUCT_BACKUP
FROM PRODUCTION.PRODUCT;
```

Retrieve all columns/rows from the table.

```SQL
SELECT * FROM PRODUCTION.PRODUCT_BACKUP;
```

## UPDATE table

The `UPDATE` table allows you to update single/multiple rows in a table.

```SQL
--Update all rows with the current date and time
UPDATE PRODUCTION.PRODUCT_BACKUP SET ModifiedDate = GETDATE();
```

```SQL
--Update the color for certain products with the `WHERE` clause
UPDATE Production.Product_backup
SET Color = 'Metallic Red'
WHERE Name LIKE 'Road-250%' AND Color = 'Red';
```

```SQL
--Update the value based on calculation on another column
UPDATE Production.Product_backup
SET ListPrice = ListPrice * 2;
```
