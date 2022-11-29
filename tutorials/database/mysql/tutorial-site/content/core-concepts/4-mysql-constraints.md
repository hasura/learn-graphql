---
title: "Constraints"
metaTitle: "MySQL Constraints | MySQL Tutorial"
metaDescription: "In this section, we will look at what are the different constraints in MySQL and when to use what constraint with an example."
---

## Constraints in MySQL

The following are the most common constraints used in MySQL:

- NOT NULL
- CHECK
- DEFAULT
- PRIMARY KEY
- AUTO_INCREMENT
- UNIQUE
- ENUM
- FOREIGN KEY

## NOT NULL Constraint

The NOT NULL constraint indicates that the column cannot have NULL or blank values.

```mysql
CREATE TABLE Student(Id INTEGER, LastName TEXT NOT NULL, FirstName TEXT NOT NULL, City VARCHAR(35));
```

```mysql
INSERT INTO Student VALUES(1, 'Hanks', 'Peter', 'New York');
```

```mysql
INSERT INTO Student VALUES(2, NULL, 'Amanda', 'Florida');
```

The third query will throw an error because LastName cannot be a null value and the user has to enter a last name for the insert command to be accepted.

## UNIQUE Constraint

The UNIQUE constraint makes sure that all values entered into that particular column are unique. It indicates that a column cannot store duplicate values.

```mysql
CREATE TABLE ShirtBrands(Id INTEGER, BrandName VARCHAR(40) UNIQUE, Size VARCHAR(30));
```

```mysql
INSERT INTO ShirtBrands(Id, BrandName, Size) VALUES(1, 'Pantaloons', 38), (2, 'Cantabil', 40);
```

```mysql
INSERT INTO ShirtBrands(Id, BrandName, Size) VALUES(1, 'Raymond', 38), (2, 'Cantabil', 40);
```

## CHECK Constraint

The CHECK constraint verifies the value in a particular column. It ensures that the value which is entered into a column satisfies the specified constraint.

[CONSTRAINT [symbol]] CHECK (expr) [[NOT] ENFORCED]

```mysql
CREATE TABLE Persons(
ID int NOT NULL,
Name varchar(45) NOT NULL,
Age int CHECK (Age>=18)
);
```

Execute the listed queries to insert the values into the table:

```mysql
INSERT INTO Persons(Id, Name, Age)
VALUES (1,'Robert', 28), (2, 'Joseph', 35), (3, 'Peter', 40);
```

```mysql
INSERT INTO Persons(Id, Name, Age) VALUES (1, 'Robert', 15);
```

The third query throws an error because the age is below 15.

## DEFAULT Constraint

The DEFAULT constraint is used to specify the default value for that particular column when no value is specified while inserting the record. It also means that the column must contain a value no matter what, even if it is a NULL value.

```mysql
CREATE TABLE Persons (
ID int NOT NULL,
Name varchar(45) NOT NULL,
Age int,
City varchar(25) DEFAULT 'New York';
);
```

Execute the queries listed below to insert the values into the table:

```mysql
INSERT INTO Persons(Id, Name, Age, City)
VALUES (1,'Robert', 15, 'Florida'),
(2, 'Joseph', 35, 'California'),
(3, 'Peter', 40, 'Alaska');
```

```mysql
INSERT INTO Persons(Id, Name, Age) VALUES (1, 'Brayan', 15);
```

The third query does not have a city specified and as a result, will add &#39;New York&#39; as the City.

## PRIMARY KEY Constraint

The PRIMARY KEY constraint is used to create a unique identifier for each record in a table. If the column has a primary key, then it cannot be a NULL value. A table can only have one primary key.

```mysql
CREATE TABLE Persons (
ID int NOT NULL PRIMARY KEY,
Name varchar(45) NOT NULL,
Age int,
City varchar(25));
```

Next, use the insert query to store data into a table:

```mysql
INSERT INTO Persons(Id, Name, Age, City)
VALUES (1, 'Robert', 15, 'Florida')
(2, 'Joseph', 35, 'California'),
(3, 'Peter', 40, 'Alaska');
```

```mysql
INSERT INTO Persons(Id, Name, Age, City)
VALUES (1,'Stephen', 15, 'Florida')
AUTO_INCREMENT Constraint
```

The AUTO INCREMENT constraint automatically generates a unique number when a record is entered into the table. This constraint is usually used for the primary key.

```mysql
CREATE TABLE Animals(
id int NOT NULL AUTO_INCREMENT,
name CHAR(30) NOT NULL,
PRIMARY KEY (id));
```

Next, the values have to be inserted into the &quot;Animals&quot; table:

```mysql
INSERT INTO Animals (name) VALUES
('Tiger'),('Dog'),('Penguin'),
('Camel'),('Cat'),('Ostrich');
```

## ENUM Constraint

The ENUM constraint in MySQL is a string object. It allows the user to make sure the value entered into the table is chosen from a list of pre-specified values that are displayed at the time of table creation. It uses numeric indexes (1,2,3) to represent the string values.

The below query creates a table named &quot;shirts&quot; that contains 3 columns: id, name, and size. The column name &quot;size&quot; uses the ENUM constraint that allows the user to enter one of small, medium, large, and x-large sizes.

```mysql
CREATE TABLE Shirts (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(35),
size ENUM('small', 'medium', 'large', 'x-large')
);
```

Next, we need to insert the values into the &quot;Shirts&quot; table using the below statements:

```mysql
INSERT INTO Shirts(id, name, size)
VALUES (1,'t-shirt', 'medium';),
(2, 'casual-shirt', 'small'),
(3, 'formal-shirt', 'large');
```

## Foreign Key Constraint

The FOREIGN KEY constraint is used to link two tables. A foreign key matches with the primary key of a different table.

Table: Persons

```mysql
CREATE TABLE Persons (
Person_ID int NOT NULL PRIMARY KEY,
Name varchar(45) NOT NULL,
Age int,
City varchar(25)
);
```

Table: Orders

```mysql
CREATE TABLE Orders (
Order_ID int NOT NULL PRIMARY KEY,
Order_Num int NOT NULL,
Person_ID int,
FOREIGN KEY (Person_ID) REFERENCES Persons(Person_ID)
);
```
