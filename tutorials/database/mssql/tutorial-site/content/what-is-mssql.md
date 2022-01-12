---
title: "What is MSSQL Server?"
metaTitle: "What is MSSQL? | MSSQL Tutorial"
metaDescription: "This section introduces MSSQL Server and some tools to execute SQL commands on the server."
---

MS SQL Server is a Relational Database Management System (RDBMS) developed by Microsoft.
A Relational database is based on a Relational Model architecture. The data is organized in tables(relations), and the tables are related to each other.
Each table has rows and columns(attributes).
MS SQL Server is a software product used to administer the database and retrieve information.

## What is SQL and T-SQL

SQL (Structured Query Language) is a domain-specific language to manage data in RDBMS.
The scope of SQL includes data query, data manipulation, data definition, and data access control.

MS SQL Server has its proprietary query language called Transact-SQL or T-SQL to interact with MS SQL Server.
You can run T-SQL queries via SQL Server Utility available in SQL Server Management Studio (SSMS) or via the `sqlcmd` utility.
Azure portal provides Query editor(preview) to run sql queries against Azure SQL database.

## Tools that use T-SQL

Some of the Microsoft tools that are used to run T-SQL commands are:

* [SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
* [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15)
* [SQL Server Data Tools (SSDT)](https://docs.microsoft.com/en-us/sql/ssdt/download-sql-server-data-tools-ssdt?view=sql-server-ver15)
* [sqlcmd](https://docs.microsoft.com/en-us/previous-versions/sql/2014/tools/sqlcmd-utility?view=sql-server-2014&preserve-view=true)

> In this tutorial, we will use SSMS on Windows Server 2019.

## What is SQL Server Management Studio SSMS

SQL Server Management Studio (SSMS) is a management software for SQL Server database engine.
An SSMS is a primary tool to connect and administer the SQL Server database engine and run Transact-SQL on the database.
