---
title: "Nested Queries"
metaTitle: "Nested Queries | MySQL Tutorial"
metaDescription: "A nested query is a regular SQL query which is nested inside a another query. In a MySQL database, it can be used in a select clause, a from clause or a where clause."
---

## Nested Queries

A nested query is a regular SQL query which is nested inside a another query.

A nested query is used in:

- A SELECT clause

- A FROM clause

- A WHERE clause

A query is usually added within the WHERE Clause of another SELECT query.

The comparison operators, including &gt;, &lt;, or = can be used. The comparison operator can also be a operator which is used in more than one row, such as IN, ANY, SOME, or ALL.

A nested query can be treated as an inner query, which is a SQL query placed as a part of another query called as outer query.

The inner query is executed first and then the outer query so that the results of the inner query can be used by the outer query.

An example of a nested query is:

```mysql
SELECT employee_id,first_name,last_name,salary

FROM employees WHERE salary >

(SELECT AVG(SALARY) FROM employees);
```
