---
title: "Joins"
metaTitle: "Joins | MySQL Tutorial"
metaDescription: "A JOIN clause in MySQL is used to combine rows from two or more tables in a database, based on a column that is common to them."
---

A JOIN clause is used to combine rows from two or more tables in a database, based on a column that is common to them.

## INNER JOIN

An inner join returns records that have identical values in both the tables.

```mysql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
```

**INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;**

The below query will help perform an inner join on three tables.

```mysql
SELECT Orders.OrderID, Customers.CustomerName, Shippe rs.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
```

## LEFT OUTER JOIN

A left inner join returns all the records from the left-sided table, and the matching records from the right-sided table.

```mysql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;
```

## RIGHT OUTER JOIN

A right inner join returns all records from the right-sided table, and the matching records from the left table.

```mysql
SELECT Orders.OrderID, Employees.LastName, Employees.FirstName
FROM Orders
RIGHT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
ORDER BY Orders.OrderID;
```

## FULL OUTER JOIN

A full outer join returns all records from both tables when there is a match in either the left-sided or the right-sided table.

```mysql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders ON Customers.CustomerID=Orders.CustomerID
ORDER BY Customers.CustomerName;
```
