---
title: "Query Data with GraphQL"
metaTitle: "Query Data with GraphQL Queries | YugabyteDB Tutorial"
metaDescription: "In this section, we will learn how to query the Yugabyte database using Hasura's GraphQL query API"
---

After loading the sample database to YugabyteDB, you can benefit from the GraphQL API layer provided by Hasura. In this and the following final sections, you will use GraphQL queries and mutations to process the data stored in the YugabyteDB cluster.

## Expose Tables to GraphQL Layer

Even though Hasura automatically detects structural changes on the database side, you still need to specify explicitly what tables can be queried with GraphQL APIs.

Expose the Users and Todos tables to the GraphQL layer:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/expose-tables-graphql.gif)

- Open the Data & Schema Management tab of the Hasura Console.
- Click the Track All button to be able to work with both Users and Todos via GraphQL APIs. 

## Query Users

Next, read records of the Users table with GraphQL:

1. Open the API Explorer tab of the Hasura Console:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-api-explorer.png)

2. Execute the GraphQL query below:

```graphql
query {
  users {
    id
    name
    created_at
    last_seen
  }
}
```

3. Confirm the output is as follows:

```json
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Mark",
        "created_at": "2022-02-02T18:49:45.092247",
        "last_seen": null
      },
      {
        "id": 2,
        "name": "Jenny",
        "created_at": "2022-02-02T18:49:45.092247",
        "last_seen": null
      }
    ]
  }
}
```

As you see, your Hasura instance successfully receives the query, translates it to a Postgres-compliant SQL request, and executes over YugabyteDB data.
