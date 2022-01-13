---
title: "DELETE"
metaTitle: "Delete table | MSSQL Tutorial"
metaDescription: "Learn how to delete data from a table with the DELETE command"
---

The `DELETE` is a T-SQL command of type DML.

**Syntax**

```SQL
DELETE FROM <table_name>
WHERE <condition>;
GO
```

Arguments

* `<table_name>`: Table name to delete data from.
* `<condition>`: The `WHERE` clause applied to the search result.

## Before you begin

Create a backup table

```SQL
USE AdventureWorks2019;
GO

SELECT *  
INTO Production.Product_backup 
FROM Production.Product;
GO 
```

## Delete all rows

```SQL
DELETE FROM PRODUCTION.PRODUCT_BACKUP;
```

```bash
(504 rows affected)

Completion time: 2021-10-07T00:44:18.4932582-07:00
```

## Delete selected rows

Please re-create the Product_backup table as in the above query.
You can delete some of the rows based on a `WHERE` clause.

```SQL
DELETE FROM Production.Product_backup 
WHERE safetystocklevel > 500;
```

```bash
(181 rows affected)

Completion time: 2021-10-07T00:45:12.7313869-07:00
```

> The `DELETE` statement only removes the data from the table, but the schema structure remains.
You can also roll back this transaction.
