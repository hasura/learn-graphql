---
title: "Database Concepts"
metaTitle: "Database Concepts | MSSQL Tutorial"
metaDescription: "This section introduces you to database objects"
---

## Database Objects

Database objects are entities that hold data and its metadata.
In other words, an object is a data structure used to store or reference data.

Some of the object types contained in a schema are Databases, Tables, Views, Stored procedures, Indexes, Sequences, Constraints, Triggers, and Functions.

### Further reading

To get a complete list of objects in your schema -

* Connect to the SQL Server
* In the Query editor, execute the following command

```SQL
SELECT DISTINCT type_desc FROM sys.all_objects;
```

Output:

type_desc
CLR_STORED_PROCEDURE
EXTENDED_STORED_PROCEDURE
SYSTEM_TABLE
VIEW
SQL_TABLE_VALUED_FUNCTION
SQL_STORED_PROCEDURE
AGGREGATE_FUNCTION
SERVICE_QUEUE
SQL_INLINE_TABLE_VALUED_FUNCTION
USER_TABLE
PRIMARY_KEY_CONSTRAINT
INTERNAL_TABLE
CLR_SCALAR_FUNCTION
SQL_SCALAR_FUNCTION
UNIQUE_CONSTRAINT

## What is a Database Schema

A *schema* is a collection of database objects. Schema is a collection of logical structures of data.

Database schema describes the structure of the data and how the data is related to each other.

Schema is also referred to as a named space of database objects. Each user owns a single schema. You can use the T-SQL commands to create and manipulate the objects in the schema.
