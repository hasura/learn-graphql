---
title: "Indexing"
metaTitle: "Indexing | MySQL Tutorial"
metaDescription: "An index is a data structure that increases the effectiveness of operations in a table. We will look at how to create an index on MySQL objects."
---

An index is a data structure that increases the effectiveness of operations in a table. Indexes can be created by using one or more columns as a reference for both rapid random searches/lookups and efficient ordering of access to records.

Indexes are also a type of table, that have a primary key or an index field and a pointer to each record in the actual table.

You can create a unique index on a table. A unique index indicates that two rows cannot have the same index value.

The syntax is:

**CREATE UNIQUE INDEX index_name ON table_name ( column1, column2,...);**

The below lines of code illustrate how to create and use an index:

```mysql
SELECT employeeNumber, lastName, firstName
FROM
employees
WHERE
jobTitle = 'Sales Rep';
```

![MySQL_61]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_61.png)

```mysql
CREATE INDEX jobTitle ON employees(jobTitle);
```

In this case, the job title column is being used as an index to retrieve rows faster.

![MySQL_62]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_62.png)

We can see that only 17 rows were searched after creating the index as opposed to 23 rows before using the index.

This shows the importance of using an index to retrieve data especially when the table has a massive number of records (e.g., 1 million records or more)
