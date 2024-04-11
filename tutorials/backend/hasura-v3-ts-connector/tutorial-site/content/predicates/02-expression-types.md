---
title: "Expression Types"
metaTitle: 'Expression Types | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

In the SDK, these predicate expressions are given the TypeScript type `Expression`, and we can see that there are
several different types of expression. These are all expression types which can be used in the `where` clause of a
query our `query` function will need to handle them via the `fetch_rows` function.

```typescript
export type Expression = {
    expressions: Expression[];
    type: "and";
} | {
    expressions: Expression[];
    type: "or";
} | {
    expression: Expression;
    type: "not";
} | {
    column: ComparisonTarget;
    operator: UnaryComparisonOperator;
    type: "unary_comparison_operator";
} | {
    column: ComparisonTarget;
    operator: BinaryComparisonOperator;
    type: "binary_comparison_operator";
    value: ComparisonValue;
} | {
    column: ComparisonTarget;
    operator: BinaryArrayComparisonOperator;
    type: "binary_array_comparison_operator";
    values: ComparisonValue[];
} | {
    in_collection: ExistsInCollection;
    type: "exists";
    where: Expression;
};
```

There are logical expressions like `and`, `or`, and `not`, which serve to combine other simpler expressions.

There are unary (eg: `NULL`, `IS NOT NULL`, etc...) and binary (eg: `=` (equal), `!=` (not-equal), `>` (greater-than), 
`<` (less-than), `>=` (greater-or-equal)) comparison operator expressions.

And there are `exists` expressions, which are expressed using a sub-query against another collection.

For now, we'll concentrate on logical expressions and comparison operator expressions.

Let's begin to construct the where clause in the next section.