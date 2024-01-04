---
title: 'Create Subgraphs'
metaTitle: 'Create Subgraphs | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Create subgraphs and connect them to your supergraph.'
---

With our `default` subgraph taken care of, we can now create subgraphs for each of the remaining teams in our
organization. We'll start by creating a subgraph for the `product_management` team.

The pattern we'll use for each of these teams is to:

- [ ] create the new subgraph on Hasura DDN using the CLI.
- [ ] connect the data source using the CLI.
- [ ] add the subgraph to our `default` build profile.
- [ ] scaffold the metadata using LSP.

## Create the product_management subgraph {#create-product-management}

Create a new subgraph for the `product_management` team by running the following command:

### Create the product_management subgraph on DDN

```bash
hasura3 subgraph create --name product_management
```

### Connect the data source

We can then connect the data source using the PostgreSQL connector:

```bash
hasura3 metadata add-hub-connector pg_db --dir . --subgraph product_management --id hasura/postgres --url "postgres://user:password@localhost:5432/product_management"
```

### Add the subgraph to the default build profile

Make the `subgraphs` section of our `build-profile.yaml` in the root of the project look like this:

```yaml
# other configuration above
subgraphs:
  - name: default
    resources:
      - subgraphs/default/**/*.hml
    connectors:
      pg_db:
        path: subgraphs/default/dataconnectors/pg_db
        connectorConfigFile: pg_db.hml
  - name: product_management
    resources:
      - subgraphs/product_management/**/*.hml
    connectors:
      pg_db:
        path: subgraphs/product_management/dataconnectors/pg_db
        connectorConfigFile: pg_db.hml
```

This adds a new subgraph named `product_management` and tells the build process to look for metadata in the
`subgraphs/product_management` directory. When we connected the data source, the CLI created a new directory
`subgraphs/product_management/dataconnectors/pg_db` and added a `pg_db.hml` file to it. This file contains the
configuration for the PostgreSQL connector. However, we still need to scaffold the metadata for the subgraph.

### Scaffold the metadata

As we did with the `default` subgraph, we'll use the LSP to scaffold the metadata for the `product_management` subgraph.
Bring up the command palette and type `Hasura track all`, then select the command. You'll be asked which subgraph and
data source to use. Select `pg_db` for the data source and `product_management` for the subgraph and your models will be
automatically created along with a new build on the default environment.

We can now navigate to our project's Console and query data in our `product_management` subgraph using our API:

```graphql
query ProductsAndSupplierQuery {
  products {
    id
    name
    price
    supplier {
      id
      name
    }
  }
}
```

Below, you'll find the abbreviated steps for adding our remaining subgraphs.

## Create the payment_processing subgraph on DDN {#create-payment-processing}

Create a new subgraph for the `payment_processing` team by running the following command:

```bash
hasura3 subgraph create --name payment_processing
```

Add the data source:

```bash
hasura3 metadata add-hub-connector pg_db --dir . --subgraph payment_processing --id hasura/postgres --url "postgres://user:password@localhost:5434/payment_processing"
```

Add the subgraph to the build profile:

```yaml
- name: payment_processing
      resources:
        - subgraphs/payment_processing/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/payment_processing/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
```

Scaffold the metadata:

Remember, you can use the LSP to scaffold the metadata for the `payment_processing` subgraph. Bring up the command
palette and type `Hasura track all`, then select the command. You'll be asked which subgraph and data source to use.
Select `pg_db` for the data source and `payment_processing` for the subgraph and your models will be automatically
created along with a new build on the default environment.

## Create the fulfillment_services subgraph {#create-fulfillment-services}

Finally, create a new subgraph for the `fulfillment_services` team by running the following command:

```bash
hasura3 subgraph create --name fulfillment_services
```

Add the data source:

```bash
hasura3 metadata add-hub-connector pg_db --dir . --subgraph fulfillment_services --id hasura/postgres --url "postgres://user:password@localhost:5435/fulfillment_services"
```

Add the subgraph to the build profile:

```yaml
- name: fulfillment_services
      resources:
        - subgraphs/fulfillment_services/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/fulfillment_services/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
```

Scaffold the metadata:

After bringing up the command palette and typing `Hasura track all`, you'll be asked which subgraph and data source to
use. Select `pg_db` for the data source and `fulfillment_services` for the subgraph.

## Next steps {#next-steps}

At this point, your supergraph should look like this:

![Supergraph without relationships](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/supegraph-without-relationships.png)

In the next section, we'll create relationships between our subgraphs.
