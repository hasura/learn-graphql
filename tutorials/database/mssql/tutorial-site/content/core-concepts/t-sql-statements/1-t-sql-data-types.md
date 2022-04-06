---
title: "Transact-SQL Data Types"
metaTitle: "Transact-SQL Data Types | MSSQL Tutorial"
metaDescription: "This page describes the data types of T-SQL statements"
---

Data types define what type of data the table cell will hold.

## Data types

| Data type category        | Data type                                                                |
|---------------------------|--------------------------------------------------------------------------|
| Exact numerics            | bigint, numeric, bit, smallint, decimal, smallmoney, int, tinyint, money |
| Approximate numerics      | float, real                                                              |
| Date and time             | date, datetimeoffset, datetime2, smalldatetime, datetime, time           |
| Character strings         | char, varchar, text                                                      |
| Unicode character strings | nchar, nvarchar, ntext                                                   |
| Binary strings            | binary, varbinary, image                                                 |
| Other data types          | cursor, rowversion, hierarchyid, uniqueidentifier, sql_variant, table    |

Refer the MS article on [Data types (Transact-SQL)](https://docs.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver15) for a complete list and their definitions.

## Next Steps

Run the T-SQL queries to interact with MS SQL Server.

This tutorial demonstrates all the examples in the query editor available in MS SQL Server Management Studio (SSMS) on a Windows2019 Server.

> You can execute the example T-SQL queries in both Linux and Mac OS using the `sqlcmd` utility running on your OS or on a Docker container; depending upon the type of MS SQL Server installation.
