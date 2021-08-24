---
title: "Schema, DDL and DML"
metaTitle: "MySQL Schema, DDL and DML | MySQL Tutorial"
metaDescription: "In this section, we will look at schemas, different types of schema, DDL and DML statements to interact with the MySQL database."
---

## Schemas, DDL and DML Statements

A schema is a logical skeleton structure of the database to store data. Schema is a collection of tables with rows and columns and a separate query can be written for the schemas like databases. A schema is a template in MySQL. They define size, type, a grouping of information. The schemas have database objects like views, tables, and privileges. Schemas include data types, functions, and operators. They are used in business analysis identifying features and how to implement in new data collections using relational databases and information schemas.

There are three different schemas in data warehousing. The star schema is the most commonly used in designing data warehouse.

### Star Schema

A star schema is a schema where a central table is complemented by smaller denormalized dimensional tables. A star schema can have varying levels of complexity. A simple star schema consists of one central table whereas a complex star schema may possibly have one or more central tables.

### Snowflake Schema

A snowflake schema is a more complex version of star schema by adding more dimensions. Snowflake schemas are ideal when there are low cardinality attributes in the dimensions.

### Galaxy Schema

Galaxy schema contains multiple fact tables that have some shared dimensions (conformed dimensions). This schema is a combination of multiple data marts.

The two types of commands in SQL can be classified as:

- Data Definition Language (DDL)

- Data Manipulation Language (DML)

**DML(Data Manipulation Language):** DML commands deal with operations on data present in the database and DML commands make up a majority of the SQL statements.

### DML commands

**INSERT** – is used to insert data into a table.

```mysql
INSERT INTO People VALUES
(102, 'Joseph', 'Developer', 30),
(103, 'Mike', 'Leader', 28),
(104, 'Stephen', 'Scientist', 45);
```

**UPDATE** – is used to update existing data within a table.

```mysql
UPDATE trainer
SET email = 'mike@sql.com'
WHERE course_name = 'MySQL'
```

**DELETE** – is used to delete records from a database table.

```mysql
DELETE FROM Employees WHERE emp_id=108
```

**DDL (Data Definition Language):**

DDL commands are those that can be used to define the database schema. It consists of metadata of the database schema and also create and modify the structure of the various objects within the database.

DDL commands:

**CREATE** – is used to create the database or its objects (table index, function, views, store procedure and triggers).

```mysql
CREATE TABLE employee_table(
id int NOT NULL AUTO_INCREMENT,
name varchar(45) NOT NULL,
occupation varchar(35) NOT NULL,
age int NOT NULL,
PRIMARY KEY (id)
);
```

**DROP** – is used to delete objects from the database.

```mysql
DROP TABLE orders;
```

```mysql
DROP DATABASE mytestdb_copy;
```

**ALTER** -is used to alter the structure of the database.

```mysql
ALTER TABLE cus_tbl
ADD cus_age varchar(40) NOT NULL;
```

**TRUNCATE** –is used to remove all records from a table, including all spaces allocated for the records are removed.

```mysql
TRUNCATE TABLE customer;
```

**DQL (Data Query Language) :**

DQL statements are used for performing operations on the data within schema objects. It is used to slice and dice the data according to the needs of the user.

Example of DQL:

**SELECT** – is used to retrieve data from the database.

```mysql
SELECT * FROM Customers;
```

**DCL(Data Control Language):** DCL consists of commands such as GRANT and REVOKE which deal with the rights, permissions and access control of the database system.

**GRANT-** gives user&#39;s access privileges to the database.

**REVOKE** -withdraw user&#39;s access privileges given by using the GRANT command.

**TCL(transaction Control Language):** TCL commands deal with the transaction within the database.

Examples of TCL commands:

**COMMIT** – commits a Transaction.

**ROLLBACK** – rollbacks a transaction in case of any error occurs.

**SAVEPOINT** –sets a savepoint within a transaction.

**SET TRANSACTION** –specify characteristics for the transaction.
