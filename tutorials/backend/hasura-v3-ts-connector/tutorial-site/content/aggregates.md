---
title: "Aggregates"
metaTitle: 'Aggregates | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

The section covers the implementation of basic aggregate functions (`star_count` and `column_count`) in an SQLite
connector for Hasura. 

It involves modifying the `fetch_aggregates` function to handle these aggregates, constructing a
SQL query that applies the correct count functions, and ensuring that the query respects any specified conditions like
predicates, sorting, or pagination. 

The `star_count` aggregate counts all entries, while `column_count` counts non-null values in a specific column, 
with the option to count distinct values. The section concludes with testing the connector to ensure correct SQL 
generation and functionality.