---
title: "Create Relationships"
metaTitle: "Create Relationships | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Create connections across your supergraph using relationships."
---

Now that we've created our subgraphs, we can start to model the relationships between them. While each of these
subgraphs can function independently, we can also model relationships between them to create a single, unified API. This
unlocks powerful queries and mutations that span across multiple data sources.

We'll use three examples to demonstrate how to create relationships between subgraphs:

- **Users to Orders**: connecting our `app` and `fulfillment_services` subgraphs.
- **Orders to Products**: connecting our `fulfillment_services` and `product_management` subgraphs.
- **Users to Transactions**: connecting our `app` and `payment_processing` subgraphs.

We can create these relationships using the same metadata structure we used to create relationships within a single
subgraph. All we need to do is specify the subgraph name in the `target` field.

## Create a relationship between users and orders {#users-to-orders}

Open `Users.hml` and add the following relationship at the bottom of the file:

```yaml
---
kind: Relationship
version: v1
definition:
  name: orders
  source: Users
  target:
    model:
      name: Orders
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

In this example, we're creating an **array** relationship between the `Users` and `Orders` models. This means that a
single user can have multiple orders. We're also specifying the `fulfillment_services` subgraph as the target of this
relationship.

## Create a relationship between orders and products {#orders-to-products}

Open `Orders.hml` and add the following relationship at the bottom of the file:

```yaml
---
kind: Relationship
version: v1
definition:
  name: products
  source: Orders
  target:
    model:
      subgraph: product_management
      name: Products
      relationshipType: Array
  mapping:
    - source:
        fieldPath:
          - fieldName: productId
      target:
        modelField:
          - fieldName: id
```

In this example, we're creating an **object** relationship between the `Orders` and `Products` models. This means that a
single order can have a single product. We're also specifying the `product_management` subgraph as the target of this
relationship.

## Create a relationship between users and transactions {#transactions-to-users}

Open `Users.hml` again and add the following relationship at the bottom of the file:

```yaml
---
kind: Relationship
version: v1
definition:
  name: payments
  source: Users
  target:
    model:
      subgraph: payment_processing
      name: Transactions
      relationshipType: Array
  mapping:
    - source:
        fieldPath:
          - fieldName: id
      target:
        modelField:
          - fieldName: userId
```

In this example, we're creating an **array** relationship between the `Users` and `Transactions` models. This means that
a single user can have multiple transactions. We're also specifying the `payment_processing` subgraph as the target of
this relationship.

## Test it out {#test-it-out}

We can now head to our project's console and see the visualization of our supergraph 🎉

![Supergraph Visualization](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/supergraph-visualization-with-relationships.png)

We can also execute a query that spans across multiple subgraphs. For example, we can query for a user's orders, its
associated products, and any payment transactions associated with the user:

```graphql
query SupergraphQuery {
  app_users {
    id
    email
    orders {
      id
      orderDate
      products {
        id
        name
      }
    }
    payments {
      id
      amount
      transactionDate
      status
    }
  }
}
```
