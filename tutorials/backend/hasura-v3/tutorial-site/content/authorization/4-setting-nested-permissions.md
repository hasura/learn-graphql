---
title: 'Create Nested Permissions'
metaTitle: 'Create nested permissions for models | Hasura v3 Tutorial'
metaDescription:
  "In this section, we'll cover how to set up permissions for the models called by the user model for select operations."
---

One of the greatest benefits of GraphQL is the ability to perform nested queries across types — all from a single query!
For this, you can also implement permissions.

Imagine wanting to execute the following query:

```graphql
query GetUsers {
  users {
    id
    name
    email
    orders {
      id
      created_at
      status
      delivery_date
    }
    notifications {
      id
      message
      created_at
      updated_at
    }
  }
}
```

In order to do this, we'll need to set up permissions for the `orders` and `notifications` models.

## Orders

### ModelSelectPermissions

Begin by finding the `ModelSelectPermissions` for your `orders` table:

```yaml
kind: ModelSelectPermissions
modelName: orders
permissions:
  admin:
    filter: null
```

We'll add a filter to compare the `x-hasura-user-id` session variable to the `user_id` field on the `orders` table.

The complete `ModelSelectPermissions` for `orders` should look like this:

```yaml
kind: ModelSelectPermissions
modelName: orders
permissions:
  admin:
    filter: null
  user:
    filter:
      fieldComparison:
        field: user_id
        operator: _eq
        value:
          sessionVariable: x-hasura-user-id
```

### TypeOutputPermissions

You can search for the `TypeOutputPermissions` for your `orders` table:

```yaml
kind: TypeOutputPermissions
typeName: orders
```

We'll let the user see all fields for their orders, so our final `TypeOutputPermissions` for `orders` should look like
this:

```yaml
kind: TypeOutputPermissions
typeName: orders
permissions:
  admin:
    fields:
      - created_at
      - delivery_date
      - id
      - is_reviewed
      - product_id
      - status
      - updated_at
      - user_id
  user:
    fields:
      - created_at
      - delivery_date
      - id
      - is_reviewed
      - product_id
      - status
      - updated_at
      - user_id
```

## Notifications

We'll repeat the process for our `notifications` table:

## ModelSelectPermissions

After modifying the `ModelSelectPermissions` for your `notifications` table, it should look like this:

```yaml
kind: ModelSelectPermissions
modelName: notifications
permissions:
  admin:
    filter: null
  user:
    filter:
      fieldComparison:
        field: user_id
        operator: _eq
        value:
          sessionVariable: x-hasura-user-id
```

## TypeOutputPermissions

Finally, we'll modify the `TypeOutputPermissions` for our `notifications` table:

```yaml
kind: TypeOutputPermissions
typeName: notifications
permissions:
  admin:
    fields:
      - created_at
      - id
      - message
      - updated_at
      - user_id
  user:
    fields:
      - created_at
      - id
      - message
      - updated_at
      - user_id
```

## Test the new permissions

You guessed it: create a new build 🚀

```bash
hasura3 cloud build create --project-id <PROJECT_ID> --metadata-file metadata.hml
```

Then, run the query in the Console, ensuring that you have the `x-hasura-role` and `x-hasura-user-id` headers set:

```graphql
query GetUsers {
  users {
    id
    name
    email
    orders {
      id
      created_at
      status
      delivery_date
    }
    notifications {
      id
      message
      created_at
      updated_at
    }
  }
}
```

You'll see that you can only see the orders and notifications for the user you're logged in as. 🎉
