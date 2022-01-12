---
title: "Azure SQL Database limitations"
metaTitle: "Azure SQL Database limitations | MSSQL Tutorial"
metaDescription: "Azure SQL Database and T-SQL has some limitations which are distinct from other offerings. Read more about the key differences between SQL Server and Azure SQL Database"
---

Some of the database and T-SQL limitations in Azure SQL are:

* No Windows authentication on Azure SQL.
* No Extended stored procedures and table partitioning.
* No support for database mirroring and failover clustering.
* No point-in-time restore as in SSMS.
* Does not support Common Language Runtime (CLR) like views, stored procedures, triggers, and user-defined functions.
* The `FILETABLE` and `FILESTREAM` options are not available in the `CREATE DATABASE` command.
* `CREATE LOGIN` and `ALTER LOGIN` supports limited features.
* T-SQL syntax for server-level permissions such as `GRANT`, `REVOKE`, and `DENY` not supported.
* Database diagrams are not available.
* System stored procedure [sp_helpuser](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-helpuser-transact-sql?view=sql-server-ver15) not available.
* T-SQL debugging.
* `USE` statement to change database. Create a new connection to that database instead.

Refer the [T-SQL differences between SQL Server and Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/transact-sql-tsql-differences-sql-server) for a complete reference.
