---
title: "Order By"
metaTitle: 'Order By | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---


Now that we've implemented basic predicates and started to see some test cases passing, we'll now implement basic
sorting, and see more of our tests turn green.

Implementing sorting is much simpler than implementing predicates, because there is no recursive structure to process.
Instead, we have a simple list of orderings that we will turn into a SQL `ORDER BY` clause.

## Order By

Just like with the `WHERE` clause last time, we will modify our SQL template to add a new `ORDER BY` clause, and
delegate to a new function to generate the SQL for that new clause.

```typescript
const order_by_clause = request.query.order_by == null ? "" : `ORDER BY ${visit_order_by_elements(request.query.order_by.elements)}`;

const sql = `SELECT ${fields.length ? fields.join(", ") : '1 AS __empty'} FROM ${request.collection} ${where_clause} ${order_by_clause} ${limit_clause} ${offset_clause}`;
```

In this case, our new helper function is called `visit_order_by_elements`, and it breaks down the `order_by` property 
of the query request.

`visit_order_by_elements` processes a list of "order-by elements", each of which identifies an expression to order by,
and a sort order - ascending or descending.

Let's implement the new function.

```typescript
function visit_order_by_elements(values: OrderByElement[]): String {
    if (values.length > 0) {
        return values.map(visit_order_by_element).join(", ");
    } else {
        return "1";
    }
}
```

The function makes a special case for zero elements, because otherwise we'd generate invalid SQL.

Otherwise, it delegates to another function, `visit_order_by_element`, to generate the SQL for a single order-by 
element, and concatenates the results. This has the desired effect of implementing the lexicographical order, where 
the first order-by element takes precedence, the second acts as tie-breaker in case of equality, and so on.

Now let's implement the `visit_order_by_element` function.

```typescript
function visit_order_by_element(value: OrderByElement): String {
    const direction = value.order_direction === 'asc' ? 'ASC' : 'DESC';

    switch (value.target.type) {
        case 'column':
            
        case 'single_column_aggregate':

        case 'star_count_aggregate':
    }
}
```

Here we'll pattern match on the `value.target.type` property, which determines the type of expression that we need to
evaluate. For now, we'll only implement sorting based on the simplest column expressions.

For the other cases, we can throw an error:

```typescript
throw new NotSupported("order_by_aggregate is not supported");
```

In the column case, we only handle the case where `path` is empty, just like we did for predicates. When we implement
relationships, we can come back and implement the general case here.

```typescript
if (value.target.path.length > 0) {
    throw new NotSupported("Relationships are not supported");
}
return `${value.target.name} ${direction}`;
```

Here's the full implementation of `visit_order_by_element`:

```typescript
function visit_order_by_element(element: OrderByElement): String {
    const direction = element.order_direction === 'asc' ? 'ASC' : 'DESC';

    switch (element.target.type) {
        case 'column':
            if (element.target.path.length > 0) {
                throw new NotSupported("Relationships are not supported");
            }
            return `${element.target.name} ${direction}`;
            case 'single_column_aggregate': case 'star_count_aggregate':
            throw new NotSupported("order_by_aggregate are not supported");
    }
}
```

In this case, the generated SQL is simple: just the name of the column, followed by the sort direction.

Actually, that's all that's needed to implement sorting. We can rebuild our connector and re-run the test suite to make
sure that our new test cases are passing.

Next up: aggregates.