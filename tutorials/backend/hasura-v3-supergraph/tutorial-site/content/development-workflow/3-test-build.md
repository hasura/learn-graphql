---
title: 'Test a Build'
metaTitle: 'Test a Build | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Test a build of your supergraph using one of your build profiles.'
---

## Add permissions to your metadata

We'll create a new role called `user` and add permissions to the `orders` model. We'll make it so that only a user can
see their own orders.

Open the `orders.hml` file in the `subgraphs/fulfillment_services/models` directory and add the following permissions:

```yaml
kind: ModelPermissions
version: v1
definition:
  modelName: orders
  permissions:
    - role: admin
      select:
        filter: null
    - role: user
      select:
        filter:
          fieldComparison:
            field: customer_id
            operator: _eq
            value:
              sessionVariable: x-hasura-user-id
```

Then, lets add some type permissions to the `orders` model to determine which fields a user can see:

```yaml
kind: TypePermissions
version: v1
definition:
  typeName: orders
  permissions:
    - role: admin
      output:
        allowedFields:
          - id
          - product_id
          - quantity
          - order_date
          - customer_id
          - customer_address
    - role: user
      output:
        allowedFields:
          - customer_id
          - product_id
          - order_date
```

## Test your build

As Hasura is in watch mode, it will automatically build your supergraph when you save your changes. You can see the
build logs in your terminal and access the Console to see how the build works in the UI.

You can add the following headers to your request to test your build:

| Header             | Value                                  |
| ------------------ | -------------------------------------- |
| `x-hasura-role`    | `user`                                 |
| `x-hasura-user-id` | `9d7097a7-234b-47a8-9f02-5c089aefa8a4` |

And use the following query:

```graphql
query OrdersQuery {
  fulfillmentServicesOrders {
    customer_id
    product_id
    order_date
  }
}
```

![Supergraph Visualization](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/orders-query.png)

While this query's authorization logic will succeed in the `fulfillment-dev` environment, it won't be acknowledged in
the `default` environment because the `user` role doesn't exist there.

In our next lesson, we'll examine how to deploy our changes to production.
