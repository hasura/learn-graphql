---
title: "Update Data with GraphQL"
metaTitle: "Update Data with GraphQL Mutations | YugabyteDB Tutorial"
metaDescription: "In this section, we will learn how to update data in Yugabyte database using Hasura's GraphQL mutation API"
---

GraphQL mutations let you update and insert data through a compact and powerful syntax. 

## Insert Todo

Insert a Todo for one of the Users:

1. Make sure you are still on the Api Explorer screen
2. Execute the following mutation via the GraphQL editor:

```graphql
mutation {
  insert_todos(objects: [{user_id: 1, title: "Complete Hasura & YugabyteDB Tutorial"}]) {
    affected_rows
  }
}
```

Confirm the output is as follows:

```json
{
  "data": {
    "insert_todos": {
      "affected_rows": 1
    }
  }
}
```

Hasura translated your GraphQL mutation into a SQL INSERT statement and added the first todo to your YugabyteDB instance.

## Query Todos

Imagine that your application needs a list of all Todos with detailed information about corresponding Users. You can retrieve this information with the GraphQL query below:

```graphql
query {
  todos {
    id
    title
    created_at
    user {
      id
      name
    }
  }
}
```

However, if you attempt to execute this query right now, you’ll receive an error message saying the "user" field is unknown. This happens because GraphQL doesn’t track foreign-key relationships by default. But it’s easy to address!

Follow these steps to start tracking the foreign-key relationships between the tables and execute the query above:

1. Return to the Data & Schema Management tab of the Hasura Console.
2. Click the Track button for the todos->users foreign-key relation.

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/todos-foreign-key.gif)

3. Return to the API Explorer tab and execute the aforementioned query:

```graphql
query {
  todos {
    id
    title
    created_at
    user {
      id
      name
    }
  }
}
```

4. Confirm the output is as follows:

```json
{
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Complete Hasura & YugabyteDB Tutorial",
        "created_at": "2022-02-02T20:19:42.93121",
        "user": {
          "id": 1,
          "name": "Mark"
        }
      }
    ]
  }
}
```
