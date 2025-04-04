---
title: "Building the 'where' clause"
metaTitle: 'Building the Where clause | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

We're going to build up the `WHERE` clause recursively, starting with the simplest expressions at the leaves of the
predicate expression tree, and working upwards. As we go, we will need to keep track of any query parameters that we
also need to pass to SQLite, so let's make a place to store those.

**In the `fetch_rows` function**, let's add a new variable to store our parameters:

```typescript
const parameters: any[] = [];
```

As we encounter literal values, we'll append them as new parameters to this list.

We also need to add our parameters to the database fetch function call, and to our logging function:

```typescript
console.log(JSON.stringify({ sql, parameters }));

return state.db.all(sql, ...parameters);
```

Let's delegate to a new helper function in order to build our `WHERE` clause. Let's call our function 
`visit_expression`, because we're using the [visitor design pattern](https://en.wikipedia.org/wiki/Visitor_pattern).

Let's define the where clause as a string which is either null if there is no `where` predicate, or the result of 
`visit_expression` when there is one:

```typescript
const where_clause = request.query.where == null ? "" : `WHERE ${visit_expression(parameters, request.query.where)}`;
```

We'll handle each different type of expression by pattern matching on the `type` field of the current expression.

Define the `visit_expression` helper function:

```typescript
function visit_expression(parameters: any[], expr: Expression): string {
  switch (expr.type) {
    case "and":

    case "or":

    case "not":

    case "unary_comparison_operator":

    case "binary_comparison_operator":

    case "binary_array_comparison_operator":

    case "exists":

    default:
      throw new BadRequest("Unknown expression type");
  }
}
```

For the logical expressions `and` and `or`, we will visit each of the subexpressions in turn, and concatenate the
generated SQL.

```typescript
// ...
case "and":
    if (expr.expressions.length > 0) {
        return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" AND ");
    } else {
        return "TRUE";
    }
// ...
```

So again we need a helper function here, which visits an expression, but always wraps the results in parentheses. This 
way, we don't generate SQL with the wrong operator precedence in cases where logical operators are nested.

Add the `visit_expression_with_parens` helper function:

```typescript
function visit_expression_with_parens(parameters: any[], expr: Expression): string {
    return `(${visit_expression(parameters, expr)})`;
}
```

Note that we also need to make a special case for zero subexpressions, or else we'll generate invalid SQL.

We can complete the `or` and `not` cases very similarly.

```typescript
// ...
case "or":
    if (expr.expressions.length > 0) {
        return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" OR ");
    } else {
        return "FALSE";
    }
case "not":
    return `NOT ${visit_expression_with_parens(parameters, expr.expression)}`;
// ...
```

For `unary_comparison_operator` expressions, we can switch on `expr.operator`. Right now, the only option is the
`is_null` operator and we will also need a helper function, `visit_comparison_target` here which we will define later:

```typescript
// ...
case "unary_comparison_operator":
    switch (expr.operator) {
      case 'is_null':
        return `${visit_comparison_target(expr.column)} IS NULL`;
      default:
        throw new BadRequest("Unknown comparison operator");
    }
// ...
```

For `binary_comparison_operator` expressions, we can switch on `expr.operator`. We only need to implement the `eq`
operator, because our schema doesn't advertise any other binary operators. If we wanted to add another operator, like a
"greater than" operator for numbers, we would do that here, and also advertise that operator in the NDC schema response.

```typescript
switch (expr.operator) {
    case 'eq':
        return `${visit_comparison_target(expr.column)} = ${visit_comparison_value(parameters, expr.value)}`
    default:
        throw new BadRequest("Unknown comparison operator");
}
```

Also, one new helper function `visit_comparison_value` is needed here, defined later, and we'll call it as per below:

```typescript
// ...
case "binary_comparison_operator":
    switch (expr.operator.type) {
      case 'equal':
        return `${visit_comparison_target(expr.column)} = ${visit_comparison_value(parameters, expr.value)}`
      default:
        throw new BadRequest("Unknown comparison operator");
    }
//...
```

The `column` property in an equality expression has type `ComparisonTarget`, so `visit_comparison_target` will break 
that type down into a SQL expression.

The `value` property represents the right hand side of the equality expression, and has type `ComparisonValue`, 
`visit_comparison_value` breaks _that_ type down.

Let's define those functions:

```typescript
function visit_comparison_target(target: ComparisonTarget) {
    switch (target.type) {
        case 'column':
            if (target.path.length > 0) {
                throw new NotSupported("Relationships are not supported");
            }
            return target.name;
        case 'root_collection_column':
            throw new NotSupported("Relationships are not supported");
    }
}

function visit_comparison_value(parameters: any[], target: ComparisonValue) {
    switch (target.type) {
        case 'scalar':
            parameters.push(target.value);
            return "?";
        case 'column':
            throw new NotSupported("column_comparisons are not supported");
        case 'variable':
            throw new NotSupported("Variables are not supported");
    }
}
```

We're skipping a lot here, but let's just handle the simplest cases.

In the `visit_comparison_target` function, we only handle the `column` case where the `path` is empty. The other cases
will be added later when we support the `relationships` capability.

In the `visit_comparison_value` function, we only handle the `scalar` case, in which we push the value onto our
parameter list. Again, the other cases correspond to capabilities we haven't implemented yet.

`exists` expressions are unsupported for now, so we'll throw an error here. We can come back to these later.

```typescript
// ...
case "binary_array_comparison_operator":
  throw new NotSupported("binary_array_comparison_operator is not supported");
case "exists":
  throw new NotSupported("exists is not supported");
// ...
```

Here's the finished `visit_expression` function:

```typescript
function visit_expression(parameters: any[], expr: Expression): string {
    switch (expr.type) {
        case "and":
            if (expr.expressions.length > 0) {
                return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" AND ");
            } else {
                return "TRUE";
            }
        case "or":
            if (expr.expressions.length > 0) {
                return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" OR ");
            } else {
                return "FALSE";
            }
        case "not":
            return `NOT ${visit_expression_with_parens(parameters, expr.expression)}`;
        case "unary_comparison_operator":
            switch (expr.operator) {
                case 'is_null':
                    return `${visit_comparison_target(expr.column)} IS NULL`;
                default:
                    throw new BadRequest("Unknown comparison operator");
            }
        case "binary_comparison_operator":
            switch (expr.operator.type) {
                case 'equal':
                    return `${visit_comparison_target(expr.column)} = ${visit_comparison_value(parameters, expr.value)}`
                default:
                    throw new BadRequest("Unknown comparison operator");
            }
        case "binary_array_comparison_operator":
            throw new NotSupported("binary_array_comparison_operator is not supported");
        case "exists":
            throw new NotSupported("exists is not supported");
        default:
            throw new BadRequest("Unknown expression type");
    }
}
```

Let's test these in the next section.