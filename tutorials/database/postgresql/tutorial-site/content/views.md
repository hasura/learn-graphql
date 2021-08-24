---
title: "PostgreSQL Views"
metaTitle: "PostgreSQL Views | PostgreSQL Tutorial"
metaDescription: "In this section, you will learn about the PostgreSQL views concept and how to manage views, such as creating, modifying, and removing views from the database."
---

In this section, you will learn about the PostgreSQL views concept and how to manage views, such as creating, modifying, and removing views from the database.

## What is a view in PostgreSQL?

A view is a named query.

Let’s say that you have a complex query that you do not want to repeat everywhere, you can create a view over this query. Creating a view gives the query a name and now you can SELECT from this view as you would from an ordinary table.

You can use views to represent joined tables or a subset of a table, selecting only the required columns and rows from a table.

Views can be used in almost any place a real table can be used and are very common in SQL database designs.

Common use cases:

- Group by and aggregate
- Hide columns

There are two types of views:

- Standard Views
- Materialized Views

We will primarily focus on the standard views in the next section.
