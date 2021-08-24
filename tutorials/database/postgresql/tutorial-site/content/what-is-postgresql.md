---
title: "What is PostgreSQL?"
metaTitle: "What is PostgreSQL? | PostgreSQL Tutorial"
metaDescription: "In this section, we will look at what is PostgreSQL, a brief look at history and different features it supports"
---

PostgreSQL (aka Postgres) is one of the most popular relational database backed by more than 25 years of open source development.

For history lovers, Postgres was started in 1986. The initial name Postgres was later changed to PostgreSQL to reflect the clear support for SQL in 1996.

PostgreSQL supports a number of features, data types, ability to write functions in different languages, a robust RBAC and support for JSON data storage for NoSQL like ability.

You can read more about what PostgreSQL supports in [PostgreSQL Feature matrix](https://www.postgresql.org/about/featurematrix/).

## Server programming support

PostgreSQL officially supports a few languages for writing database functions.

- PL/pgSQL
- PL/Tcl
- PL/Perl
- PL/Python

In addition to the above, there's also support for other languages through a number of open source implementations for Java, Shell, R, Lua, JavaScript etc. This wide support makes it very extensible to solve custom logic via functions.

## Data Types

PostgreSQL has built-in support for general-purpose data types. Among the most commonly used types are:

- Numeric (integer, float, serial etc)
- Character (varying character, text)
- Date/Time (timestamp, date, time etc)
- Boolean (true, false)
- Geometry (Point, Line, Box etc)
- UUID (generating unique IDs)
- JSON (for document storage)

We will look into this in more detail in the upcoming sections.

## Indexing and Constraints

Indexes allows PostgreSQL to find and retrieve specific rows faster and are typically used as a simple performance optimisation technique.

PostgreSQL allows you to define constraints on tables and columns giving you much more control over the data. Although data types restrict you the kind of data, there are very specific use cases where just a data type restriction may not be enough.

## Access Control

PostgreSQL lets you create users and role with access control rules. Each role needs to be explicitly configured / granted access for database objects.

## Views and Materialized Views

Views let you encapsulate the table structure for making queries easier, perform custom logic using existing data. Views execute everytime the query is made. Materialized Views are similar to views except that they are stored in disk and for quicker data access use cases. Typically materialized views are used for data reporting cases where the data doesn't need to be exactly live or realtime.

## Extensions

PostgreSQL is pretty extensible. We saw earlier the various programming languages you can use. Extensions are on the same lines, letting you load it into the database and behave like built-in features.

Some of the popular extensions are PostGIS, TimescaleDB, PgMemCache etc.
