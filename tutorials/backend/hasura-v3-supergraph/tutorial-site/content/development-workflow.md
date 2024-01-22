---
title: 'Development Workflow'
metaTitle: 'Development Workflow | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Everything you need to know to get started with building your supergraph.'
---

Next, we'll walk through the development workflow for building a supergraph. While we've created a functioning graph, we
need to know the best practices for developing and deploying our graph. We do that using two concepts: **environments**
and **build profiles**.

## What is an environment? {#what-is-an-environment}

An environment is a way to organize your project metadata and test your changes before deploying them to production.
When you created your project, Hasura created a `default` environment for you. You can see a list of all your
environments by running the following command:

```bash
hasura3 environments list
```

You're probably familiar with the concept of environments from other development tools. For example, you might have a
`development` environment for testing your code locally, a `staging` environment for testing your code in a
production-like environment, and a `production` environment for your live application. You can create as many
environments as you need for your project.

However, we recommend creating environments for each of your subgraphs. This allows you to test your changes in
isolation before deploying them to production. For example, if you're working on a new feature for your `products`
subgraph, you can create a `products` environment and test your changes there. Once you're satisfied with your changes,
you can deploy them to `staging` and `production`.

Each environment has an endpoint associated with it that serves the applied build.

## What is a build profile? {#what-is-a-build-profile}

A build profile tells Hasura DDN how to build your supergraph. You do this by specifying which subgraphs to include in
your build, and which environment and mode to use. You can create as many build profiles as you need for your project.

Currently, our `build-profile.yaml` file looks like this:

```yaml
version: 2
spec:
  environment: default
  mode: replace
  supergraph:
    resources:
      - supergraph/*
  subgraphs:
    - name: default
      resources:
        - subgraphs/default/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/default/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
    - name: fulfillment_services
      resources:
        - subgraphs/fulfillment_services/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/fulfillment_services/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
    - name: payment_processing
      resources:
        - subgraphs/payment_processing/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/payment_processing/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
    - name: product_management
      resources:
        - subgraphs/product_management/**/*.hml
      connectors:
        pg_db:
          path: subgraphs/product_management/dataconnectors/pg_db
          connectorConfigFile: pg_db.hml
```

While a production build profile may include all of your subgraphs like what we have above, a development build profile
for the `fulfillment_services` subgraph may only include the `fulfillment_services` subgraph as resources and use
`mode: patch` to allow you to test production metadata from other subgraphs with your development changes to the
`fulfillment_services` subgraph.

In the next lesson, we'll take a look at how to create an environment and build profile for our `fulfillment_services`
subgraph.
