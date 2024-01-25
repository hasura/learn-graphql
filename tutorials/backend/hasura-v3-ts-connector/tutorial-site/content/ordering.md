In this section we dive into implementing basic sorting functionality

The focus is on transforming the `ORDER BY` clause of SQL queries into a workable format within our Typescript 
connector.

We will integrate a new `ORDER BY` clause into our SQL template. This involves constructing a function,
`visit_order_by_elements`, to interpret the `order_by` property from the query request. This function efficiently
processes a list of order-by elements, each specifying an expression to sort by, along with the direction of sorting,
either ascending or descending.
