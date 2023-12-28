---
title: 'Create Relationships'
metaTitle: 'Create Relationships | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Create connections across your supergraph using relationships.'
---

Now that we've created our subgraphs, we can start to model the relationships between them. While each of these
subgraphs can function independently, we can also model relationships between them to create a single, unified API. This
unlocks powerful queries and mutations that span across multiple data sources.

We'll use three examples to demonstrate how to create relationships between subgraphs:

- **Users to Orders**: connecting our `default` and `fulfillment_services` subgraphs.
- **Orders to Products**: connecting our `fulfillment_services` and `products` subgraphs.
- **Users to Transactions**: connecting our `default` and `payment_processing` subgraphs.

We can create these relationships using the same metadata structure we used to create relationships within a single
subgraph. All we need to do is specify the subgraph name in the `target` field.

## Create a relationship between users and orders {#users-to-orders}

Open `users.hml` and add the following relationship at the bottom of the file:

```yaml
kind: Relationship
version: v1
definition:
  name: orders
  source: users
  target:
    model:
      name: orders
      relationshipType: Array
      subgraph: fulfillment_services
  mapping:
    - source:
        fieldPath:
          - fieldName: id
      target:
        modelField:
          - fieldName: customer_id
```

In this example, we're creating an **array** relationship between the `users` and `orders` models. This means that a
single user can have multiple orders. We're also specifying the `fulfillment_services` subgraph as the target of this
relationship.

## Create a relationship between orders and products {#orders-to-products}

Open `orders.hml` and add the following relationship at the bottom of the file:

```yaml
kind: Relationship
version: v1
definition:
  name: product_info
  source: orders
  target:
    model:
      name: products
      relationshipType: Object
      subgraph: product_management
  mapping:
    - source:
        fieldPath:
          - fieldName: product_id
      target:
        modelField:
          - fieldName: id
```

In this example, we're creating an **object** relationship between the `orders` and `products` models. This means that a
single order can have a single product. We're also specifying the `product_management` subgraph as the target of this
relationship.

## Create a relationship between users and transactions {#transactions-to-users}

Open `users.hml` again and add the following relationship at the bottom of the file:

```yaml
kind: Relationship
version: v1
definition:
  name: payments
  source: users
  target:
    model:
      name: transactions
      relationshipType: Array
      subgraph: payment_processing
  mapping:
    - source:
        fieldPath:
          - fieldName: id
      target:
        modelField:
          - fieldName: user_id
```

In this example, we're creating an **array** relationship between the `users` and `transactions` models. This means that
a single user can have multiple transactions. We're also specifying the `payment_processing` subgraph as the target of
this relationship.

## Next steps {#next-steps}

We can now head to our `Explorer` and see the visualization of our supergraph 🎉

<!-- TODO: Add screenshot -->

We can also execute a query that spans across multiple subgraphs. For example, we can query for a user's orders, its
associated products, and any payment transactions associated with the user:

```graphql
query SupergraphQuery {
  users {
    id
    email
    orders {
      id
      order_date
      product_info {
        id
        name
      }
    }
    payments {
      id
      amount
      transaction_date
      status
    }
  }
}
```
