---
title: "Set Operations"
metaTitle: "Set Operations | MySQL Tutorial"
metaDescription: "MySQL supports a few Set operations like UNION, UNION ALL and MINUS which can be performed on the data in the table."
---

MySQL supports a few Set operations which can be performed on the data in the table. These are used to create meaningful relationships between different tables or query results to combine and analyse data.

There are 3 different types of SET operations:

- UNION
- UNION ALL
- MINUS

## UNION

The UNION set operation is used to combine the outputs of two or more SELECT statements. This will eliminate duplicates from its result set. The number of columns and the datatype must be the same in both the tables on which the UNION operation is being used.

![MySQL_56]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_56.jpg)

```mysql
SELECT FROM First

UNION

SELECT FROM Second;
```

## UNION ALL

This operation is similar to Union with the only difference being that it also shows the duplicate rows.

![MySQL_57]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_57.jpg)

```mysql
SELECT * FROM First

UNION ALL

SELECT * FROM Second;
```

## MINUS

The Minus set operation combines the results of two SELECT statements and returns only those in the final result, which belongs to the first set of the result.

![MySQL_58]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_58.jpg)

```mysql
SELECT * FROM First

MINUS

SELECT * FROM Second;
```
