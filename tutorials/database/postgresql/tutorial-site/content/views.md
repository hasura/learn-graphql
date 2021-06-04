---
title: "PostgreSQL Views"
metaTitle: "PostgreSQL Views | PostgreSQL Tutorial"
metaDescription: ""
---

A view is a named query that provides another way to present data in the database tables. A view is defined based on one or more tables which are known as base tables. When you create a view, you basically create a query and assign a name to the query. Therefore, a view is useful for wrapping a commonly used complex query.

Note that regular views do not store any data except the materialized views. In PostgreSQL, you can create special views called materialized views that store data physically and periodically refresh data from the base tables. The materialized views are handy in many scenarios, such as faster data access to a remote server and caching.

In this section, you will learn about the PostgreSQL views concept and how to manage views, such as creating, modifying, and removing views from the database.
