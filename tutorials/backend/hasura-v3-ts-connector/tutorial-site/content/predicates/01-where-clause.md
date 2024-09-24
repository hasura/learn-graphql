---
title: "Where Clause"
metaTitle: 'Ordering | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

So now we've set up a basic data connector for a SQLite database running locally. Now we'll start to implement
predicates by turning them into where clauses in the generated SQL.

Predicates in GraphQL are expressions which determine the conditions under which data is retrieved or manipulated.
For example: a `where` clause.

## Where Clause

Let's pick up from where we left off. We can modify our SQL template in our `fetch_rows` function to now include a 
`WHERE` clause:

```typescript
const sql = `SELECT ${fields.length ? fields.join(", ") : '1 AS __empty'} FROM ${request.collection} ${where_clause} ${limit_clause} ${offset_clause}`;
```

To generate our `WHERE` clause, we will need to interpret the contents of the `where` property of the query request. To
see what this will look like, we can find some examples in the query snapshots we generated last time:

```JSON
{
  "collection": "albums",
  "query": {
    "fields": {
      "id": {
        "type": "column",
        "column": "id",
        "fields": null
      },
      "title": {
        "type": "column",
        "column": "title",
        "fields": null
      }
    },
    "limit": 10,
    "predicate": {
      "type": "binary_comparison_operator",
      "column": {
        "type": "column",
        "name": "artist_id",
        "path": []
      },
      "operator": "eq",
      "value": {
        "type": "scalar",
        "value": 5
      }
    }
  },
  "arguments": {},
  "collection_relationships": {}
}
```

This predicate expression has type `binary_comparison_operator`, which means it is a predicate which compares a column
to a value using an operator, in this case, the equality operator - this predicate asserts that the `artist_id` column
equals the literal value `5`.

Let's look at other expression types in the next section.