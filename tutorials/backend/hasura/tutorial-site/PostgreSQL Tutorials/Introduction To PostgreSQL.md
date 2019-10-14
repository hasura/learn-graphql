
# PostgreSQL Tutorial


___
## Topics covered:



+ Installation
+ Getting started with PostgreSQL 
+ Working with Tables

## Installation
#### For ubuntu systems :

   
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib

## Getting started with PostgreSQL
PostgreSQL uses the concept of 'Roles'. Roles are like the user accounts in your OS, with each having a different type of access and rights, like superuser and such. By default, the user account postgres is associated with the default role.

To switch to the postgres account on your system/server 
     
    sudo -i -u postgres

You have switched to the Postgres account! Run the Postgres prompt by typing
    
    psql

Now you are in Postgres shell !

Exit the shell by typing '\q'

Some of the basic postgress shell commands that will come in handy are:
 
      \q - to exit the postgres shell
      \l - to list all the created datbases
      \du - to list all the roles

To create and delete a database
   
    postgres=# CREATE DATABASE db_name WITH OWNER postgres;
    postgres=# DROP DATABASE db_name
(PostgreSQL is **Case Insensitive**)

Don’t forget to put the semicolon after every postgres shell statement.

## Working with tables

To create a new table in PostgreSQL, you use the CREATE TABLE statement. The following illustrates the syntax of the CREATE TABLE statement:

    CREATE TABLE table_name (
    column_name TYPE column_constraint,
    table_constraint table_constraint
    ) INHERITS existing_table_name;

Let's understand the above syntax

+ Specify the name of the new table after the CREATE TABLE clause. 

+ List the column name, its data type, and column constraint. A table may have multiple columns separated by a comma (,). The column constraint defines rules for the column e.g.,  PRIMARY KEY

+ Define a table-level constraint that defines rules for the data in the table.

+ Specify an existing table from which the new table inherits. It means the new table contains all columns of the existing table and the columns defined in the CREATE TABLE statement.This is a PostgreSQL’s extension to SQL.

#### Column Constraints

Let's understand some column constraints of PostgreSQL

+ NOT NULL – the value of the column cannot be NULL.
+ UNIQUE – the value of the column must be unique across the whole table. 
However, the column can have many NULL values because PostgreSQL treats each NULL value to be unique.
+ PRIMARY KEY – this constraint is the combination of NOT NULL and UNIQUE constraints.
+ CHECK – enables to check a condition when you insert or update data. For example, the values in the price column of the product table must be positive values.
+ REFERENCES – constrains the value of the column that exists in a column in another table. You use REFERENCES to define the foreign key constraint.

#### Table Constraints

Here are some table constraints in PostgreSQL.

+ UNIQUE (column_list)–  to force the value stored in the columns listed inside the parentheses to be unique.
+ PRIMARY KEY(column_list) – to define the primary key that consists of multiple columns.
+ CHECK (condition) – to check a condition when inserting or updating data.
+ REFERENCES– to constrain the value stored in the column that must exist in a column in another table.

**Example Code for Table Creation**
    
    CREATE TABLE student(
    student_id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL
    );
A table would be created

#### Viewing Existing tables

First ,choose the database ,where the table resides.
 
     \c database_name

You can list all databases by
     
     \l
To show all tables current schema in current database.
     
     \dt




 