---
title: "Expression Types"
metaTitle: 'Expression Types | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

In the SDK, these predicate expressions are given the TypeScript type `Expression`, and we can see that there are
several different types of expression.

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

There are logical expressions like `and`, `or`, and `not`, which combine other simpler expressions.

There are unary and binary comparison operator expressions.

And there are `exists` expressions, which are expressed using a subquery against another collection.

For now, we'll concentrate on logical expressions and comparison operator expressions.