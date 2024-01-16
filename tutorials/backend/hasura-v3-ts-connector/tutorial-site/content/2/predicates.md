# Let's Build a Connector - Part 2 - Predicates

https://github.com/hasura/ndc-sqlite/assets/630306/5eb5d2a0-55f0-46ed-add7-8e3daefe70e3

## Transcript

Hi everyone.

In the last video, we set up a basic data connector for a sqlite database running locally. In this video, we'll start to implement predicates by turning them into where clauses in the generated SQL.

Let's pick up from where we left off. We can modify our SQL template to include a `WHERE clause`:

```typescript
const sql = `SELECT ${fields.join(", ")} FROM ${request.collection} ${where_clause} ${limit_clause} ${offset_clause}`;
```

To generate our `WHERE` clause, we will need to interpret the contents of the `where` property of the query request. To see what this will look like, we can find some examples in the snapshots we generated last time.

This predicate expression has type `binary_comparison_operator`, which means it is a predicate which compares a column to a value using an operator - in this case, the equality operator - this predicate asserts that the `artist_id` column equals the literal value `5`.

In the SDK, these predicate expressions are given the TypeScript type `Expression`, and we can see that there are several different types of expression.

There are logical expressions like `and`, `or`, and `not`, which combine other simpler expressions.

There are unary and binary comparison operator expressions.

And there are `exists` expressions, which are expressed using a subquery against another collection.

For now, we'll concentrate on logical expressions and comparison operator expressions.

We're going to build up the `WHERE` clause recursively, starting with the simplest expressions at the leaves of the predicate expression tree, and working upwards. As we go, we will need to keep track of any query parameters that we also need to pass to sqlite, so let's make a place to store those.

```typescript
const parameters: any[] = [];
```

As we encounter literal values, we'll append them as new parameters to this list.

We also need to add our parameters to the database fetch function call, and to our logging function:

```typescript
console.log(JSON.stringify({ sql, parameters }));

return state.db.all(sql, ...parameters);
```

Let's delegate to a helper function in order to build our `WHERE` clause. Let's call our function `visit_expression`, because we're using the visitor design pattern.

```typescript
const where_clause = request.query.where == null ? "" : `WHERE ${visit_expression(parameters, request.query.where)}`;
```

We'll handle each different type of expression by pattern matching on the `type` field of the current expression.

```typescript
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
```

For the logical expressions `and` and `or`, we will visit each of the subexpressions in turn, and concatenate the generated SQL.

```typescript
if (expr.expressions.length > 0) {
    return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" AND ");
} else {
    return "TRUE";
}
```

We need a helper function here, which visits an expression, but always wraps the results in parentheses. This way, we don't generate SQL with the wrong operator precedence in cases where logical operators are nested.

```typescript
function visit_expression_with_parens(parameters: any[], expr: Expression): string {
    return `(${visit_expression(parameters, expr)})`;
}
```

Note that we also need to make a special case for zero subexpressions, or else we'll generate invalid SQL.

We can complete the `or` and `not` cases very similarly.

```typescript
case "or":
    if (expr.expressions.length > 0) {
        return expr.expressions.map(e => visit_expression_with_parens(parameters, e)).join(" OR ");
    } else {
        return "FALSE";
    }
case "not":
    return `NOT ${visit_expression_with_parens(parameters, expr.expression)}`;
```

For `unary_comparison_operator` expressions, we can switch on `expr.operator`. Right now, the only option is the `is_null` operator:

```typescript
switch (expr.operator) {
    case 'is_null':
        return `${visit_comparison_target(expr.column)} IS NULL`;
    default:
        throw new BadRequest("Unknown comparison operator");
}
```

For `binary_comparison_operator` expressions, we can switch on `expr.operator.type`.  We will only implement the `equal` operator, because our schema doesn't advertise any custom binary operators. If we wanted to add another operator, like a "greater than" operator for numbers, we would do that here, and also advertise that operator in the NDC schema response.

```typescript
switch (expr.operator.type) {
    case 'equal':
        return `${visit_comparison_target(expr.column)} = ${visit_comparison_value(parameters, expr.value)}`
    default:
        throw new BadRequest("Unknown comparison operator");
}
```

Here we're using two helper functions. The `column` property in an equality expression has type `ComparisonTarget`, so we have one helper function to break that type down into a SQL expression. The `value` property represents the right hand side of the equality expression, and has type `ComparisonValue`, so we need a second helper function to break _that_ type down.

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

We're skipping a lot here, but we'll handle the simplest cases.

In the `visit_comparison_target` function, we only handle the `column` case where the `path` is empty. The other cases will be added when we support the `relationships` capability.

In the `visit_comparison_value` function, we only handle the `scalar` case, in which we push the value onto our parameter list. Again, the other cases correspond to capabilities we haven't implemented yet.

The other two expression types are unsupported for now, so we'll throw an error here. We can come back to these later.

```typescript
case "binary_array_comparison_operator":
case "exists":
    throw new NotSupported("Unsupported expression type");
```

Now let's remove our old snapshots and re-run the test suite.

We can see that predicate tests are passing, but some other test cases are not. That's okay - we'll keep iterating over the next few videos until we have all green tests here.

In our snapshots directory, we can also see that we're returning the correct data for some simple predicate queries. This query searches for albums for artist with ID `5`, and we can see that the response contains the correct rows.

Now let's deploy to Hasura and see how the GraphQL schema looks.

Let's add a `where` clause to fetch the albums for artist ID `1`.

We can see that the generated SQL is correct and that we're correctly parameterizing the query as well.

Let's try a query which uses a logical operator:

```graphql
query MyQuery {
  albums(where: {
    _or: [
      {artist_id: {_eq: 1}}, 
      {artist_id: {_eq: 2}}, 
      {artist_id: {_eq: 5}}
    ]
  }) {
    title
  }
}
```

Again, we generate valid SQL and parameters, although we do have too many parentheses here. That's something we can improve later, but it's better to err on the safe side for now.

That's all for this video. We've added support for basic where clauses, and we'll come back and fill in some of the missing expression types later, but next time, we'll take a look at order by clauses.

Thanks for watching!
