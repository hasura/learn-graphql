---
title: "Functions"
metaTitle: "MySQL Functions | MySQL Tutorial"
metaDescription: "In this section, we will learn about various built-in functions in MySQL like string functions, numeric functions and date functions"
---

MySQL contains several built-in functions.

## String Functions

The CHAR_LENGTH() function return the length of a string (in characters).

**SELECT CHAR_LENGTH('SQL Tutorial') AS LengthOfString;**

The CONCAT() function adds two or more expressions together.

**SELECT CONCAT('SQL ', 'Tutorial ', 'is ', 'fun!') AS ConcatenatedString;**

The LCASE() function converts a string to lower-case.

**SELECT LCASE('SQL Tutorial is FUN!');**

The UCASE() function converts a string to upper-case.

**SELECT UCASE('SQL Tutorial is FUN!');**

The LTRIM() function removes leading spaces from a string.

**SELECT LTRIM(' SQL Tutorial') AS LeftTrimmedString;**

The RTRIM() function removes trailing spaces from a string.

**SELECT RTRIM('SQL Tutorial ') AS RightTrimmedString;**

The REVERSE() function reverses a string and returns the result.

**SELECT REVERSE('SQL Tutorial');**

The REPLACE() function replaces all occurrences of a substring within a string, with a new substring.

The replace function returns a case-sensitive output.

**SELECT REPLACE('SQL Tutorial', 'SQL', 'HTML');**

The SUBSTR() function extracts a substring from a string (starting at any position).

**SELECT SUBSTR('SQL Tutorial', 5, 3) AS ExtractString;**

The above query returns Tut as the output

The LOCATE() function returns the position of the first occurrence of a substring in a string.

If the substring is not found within the original string, this function returns 0.

This function performs a case-insensitive search.

**SELECT LOCATE('3', 'W3Schools.com') AS MatchPosition;**

This query will return 2 as the output as 3 is the second character in the string.

## Numeric Functions

The AVG() function returns the average value of an expression.

**SELECT AVG(Price) AS AveragePrice FROM Products;**

The COUNT() function returns the number of records returned by a select query.

**SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;**

The MAX() function returns the maximum value in a set of values.

**SELECT MAX(Price) AS LargestPrice FROM Products;**

The MIN() function returns the minimum value in a set of values.

**SELECT MIN(Price) AS SmallestPrice FROM Products;**

The POWER() function returns the value of a number raised to the power of another number.

**SELECT POWER(4, 2);**

The SQRT() function returns the square root of a number.

**SELECT SQRT(64);**

The SUM() function calculates the sum of a set of values.

**SELECT SUM(Quantity) AS TotalItemsOrdered FROM OrderDetails;**

The TRUNCATE() function truncates a number to the specified number of decimal places.

**SELECT TRUNCATE(135.375, 2);**

## Date Functions

The DATE() function extracts the date part from a datetime expression.

**SELECT DATE('2017-06-15 09:34:21');**

The ADDDATE() function adds a time/date interval to a date and then returns the date.

**SELECT ADDDATE('2017-06-15', INTERVAL 10 DAY);**

This returns the output of '2017-06-25'

The ADDTIME() function adds a time interval to a time/datetime and then returns the time/datetime.

**SELECT ADDTIME('2017-06-15 09:34:21', '2');**

This adds 2 seconds to the time

The DATEDIFF() function returns the number of days between two date values.

**SELECT DATEDIFF('2017-06-25', '2017-06-15');**

This query returns 10 days as the output.

The DAYNAME() function returns the weekday name for a given date.

**SELECT DAYNAME('2017-06-15');**

This query returns Thursday as the output.

The DAYOFMONTH() function returns the day of the month for a given date (a number from 1 to 31).

**SELECT DAYOFMONTH('2017-06-15');**

This query returns 15 as the output.

The DAYOFWEEK() function returns the weekday index for a given date (a number from 1 to 7).

Note: 1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thursday, 6=Friday, 7=Saturday.

**SELECT DAYOFWEEK('2017-06-15');**

This returns 5 as the output.

The DAYOFYEAR() function returns the day of the year for a given date (a number from 1 to 366).

**SELECT DAYOFYEAR('2017-06-15');**

This would return 166 as the output.
