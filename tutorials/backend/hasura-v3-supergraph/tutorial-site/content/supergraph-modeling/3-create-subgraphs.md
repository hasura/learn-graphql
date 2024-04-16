---
title: "Create Subgraphs"
metaTitle: "Create Subgraphs | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Create subgraphs and connect them to your supergraph."
---

With our `app` subgraph taken care of, we can now create subgraphs for each of the remaining teams in our organization.
We'll start by creating a subgraph for the `product_management` team.

The pattern we'll use for each of these teams is to:

- [ ] create the new subgraph on Hasura DDN using the CLI.
- [ ] connect the data source using the CLI.
- [ ] add the subgraph to our `base` supergraph manifest.
- [ ] scaffold the metadata using the CLI.
- [ ] create relationships across the supergraph using the LSP extension.

## Create the product_management subgraph {#create-product-management}

Let's start by killing dev mode by pressing `CTRL+C` in our terminal. Then, create a new subgraph for the
`product_management` team by running the following command:

### Create the product_management subgraph

```bash
ddn create subgraph product_management
```

And then add the connector manifest:

```bash
ddn add connector-manifest pg_db --subgraph product_management --hub-connector hasura/postgres --type cloud
```

This adds a new subgraph named `product_management` and tells the build process to look for metadata in this directory.
When we connected the data source, the CLI created a new directory `product_management/pg_db` and added a
`pg_db.build.hml` file to its `connectors` subdirectory. This file, along with the `configuration.json` contains the
configuration and metadata for the PostgreSQL connector.

### Connect the data source

We can then connect the data source using our environment variables and supergraph manifest:

```yaml
supergraph: {}
subgraphs:
  app:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/user_experience"
  product_management:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/product_management"
```

In your `/product_management/pg_db/connector/pg_db.build.hml` file, update the referenced value to match the new
environment variable:

```yaml
# other configuration above
CONNECTION_URI:
  valueFromEnv: PG_DB_CONNECTION_URI
```

## Scaffold the metadata

As we did with the `app` subgraph, we'll use the CLI to scaffold the metadata for the `product_management` subgraph.
Remember, when we run `ddn dev`, the CLI will automatically introspect our data source, track all tables as models, and
create relationships based on foreign keys.

Start dev mode:

```bash
ddn dev
```

We can now navigate to our project's Console and query data in our `product_management` subgraph using our API:

```graphql
query ProductsAndSupplierQuery {
  productManagement_products {
    id
    name
    price
    supplier {
      supplierId
      name
    }
  }
}
```

Below, you'll find the abbreviated steps for adding our remaining subgraphs.

## Create the payment_processing and fulfillment_services subgraphs {#create-remaining}

**As before, let's kill dev mode using `CTRL+C` before running the following commands.**

Create a new subgraph for the `payment_processing` and `fulfillment_services` teams by running the following commands:

```bash
ddn create subgraph payment_processing
ddn create subgraph fulfillment_services
```

And then add the connector manifests:

```bash
ddn add connector-manifest pg_db --subgraph payment_processing --hub-connector hasura/postgres --type cloud
ddn add connector-manifest pg_db --subgraph fulfillment_services --hub-connector hasura/postgres --type cloud
```

## Update the environment variables

```yaml
supergraph: {}
subgraphs:
  app:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/user_experience"
  product_management:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/product_management"
  payment_processing:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/payment_processing"
  fulfillment_services:
    PG_DB_CONNECTION_URI: "postgres://user:password@0.tcp.<REGION>.ngrok.io:<PORT>/fulfillment_services"
```

## Update the build manifests

For each of the new connectors, update its build manifest to include the new environment variable. You'll modify
**both** `payment_processing.build.hml` and `fulfillment_services.build.hml` to include their respective
`PG_DB_CONNECTION_URI`:

```yaml
# other configuration above
CONNECTION_URI:
  valueFromEnv: PG_DB_CONNECTION_URI
```

Now, re-start dev mode by running:

```bash
ddn dev
```

At this point, your supergraph should look like this:

![Supergraph without relationships](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/supegraph-without-relationships.png)

## Next steps {#next-steps}

In the next section, we'll create relationships between our subgraphs.
