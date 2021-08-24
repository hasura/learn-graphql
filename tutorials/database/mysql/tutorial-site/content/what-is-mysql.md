---
title: "What is MySQL?"
metaTitle: "What is MySQL? | MySQL Tutorial"
metaDescription: "In this section, we will look at what is MySQL, a brief look at the various features it supports"
---

## Introduction to MySQL

MySQL is an open-source relational database management system (RDBMS). A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data.

SQL is a language programmers use to create, modify, and extract data from the relational database, as well as control user access to the database. MySQL is free and open-source software under the terms of the GNU General Public License and is also available under a variety of proprietary licenses.

### Data Types in MySQL

- String (char, variable char, text, etc)
- Numeric (integer, float, Boolean, decimal, etc)
- Date and time (date, datetime, timestamp, time, year)

### Indexing and Constraints

An index is a data structure that improves the operational efficiency in a table. Indexes can be created using one or more columns within the table, providing the basis for both rapid random lookups and efficient access to records.

Constraints in MySQL are used to specify the rules that dictate what values/data will be stored in the table. They provide a way to ensure data accuracy and integrity within the table. It also helps to standardize the data that is inserted into the table. If the constraints are not met, the data cannot be entered.

Constraints in MySQL are classified into two types:

**Column Level Constraints:** These constraints are applied only to one particular column that limits the type of particular column data.

**Table Level Constraints:** These constraints are applied to the entire table that checks the type of data for the entire table.

We will cover this section in detail during a later part of the course.
