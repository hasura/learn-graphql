---
title: "Predicates"
metaTitle: 'Predicates | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---


Let's dive deeper into enhancing our SQLite database connector by implementing predicates that convert into `WHERE`
clauses in the generated SQL.

Building on the foundation established in the previous session, this installment focuses on interpreting and translating
the `where` property of the query request into meaningful SQL `WHERE` clauses.

The tutorial demonstrates how to handle various predicate expressions, including logical expressions like `AND`, `OR`,
and `NOT`, as well as comparison operator expressions. We emphasize the visitor design pattern for recursively building
the `WHERE` clause and ensuring the correct handling of query parameters.
