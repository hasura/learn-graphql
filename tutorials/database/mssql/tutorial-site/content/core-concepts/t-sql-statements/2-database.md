---
title: "Database"
metaTitle: "Database | MSSQL Tutorial"
metaDescription: "This page explains how to create and drop a database"
---

This page shows how to create and drop a database in MS SQL Server Management Studio (SSMS) using Transact-SQL on a Windows2019 Server.

### Prerequisite

- MS SQL Server
- SQL Server Management Studio

## Create a database using T SQL

**Syntax**

```SQL
CREATE DATABASE database_name;
```

- Open SSMS and connect to the Database Engine.
- Click **New Query** from the top ribbon bar.
- In the Query editor, enter the following command and then press **Execute**.

```SQL
CREATE DATABASE HASURA;
GO
```

- GO is not a T-SQL statement. It is a command that indicates the end of a batch of T-SQL statements to Server utilities.

![Create a database](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mssql/t-sql/create-database.png)

Expand *Databases* in the *Object Explorer* on the left, the database `HASURA` is displayed.

Note: If the new database is not displayed automatically, click the **Refresh** icon in the *Object Explorer*.

## Drop a Database

To drop a database from a schema or from an instance of SQL Server, run the following command:

```SQL
DROP DATABASE database_name;
```

When you drop a database, the database is removed from the SQL Server instance.

- You cannot remove System databases.
- To drop multiple databases, you can provide a comma-separated list of database names.
