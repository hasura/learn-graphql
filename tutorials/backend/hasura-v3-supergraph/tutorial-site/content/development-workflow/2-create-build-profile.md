---
title: 'Create a Build Profile'
metaTitle: 'Create a Build Profile | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Create a build profile to deploy your supergraph to Hasura Cloud.'
---

We'll create a build profile for the `fulfillment_services` subgraph so that we can test our changes to the subgraph
with the production metadata from the other subgraphs.

## Create a build profile for the Fulfillment Services team {#create-fulfillment-build-profile}

In the root of the project, we'll create a build profile called `build-profile_fulfillment-dev.yaml`:

```yaml
version: 2
spec:
  environment: fulfillment-dev
  # TODO: optimistic this will change to patch 👇
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

Here, we're using the `fulfillment-dev` environment and `mode: patch` to test our changes to the `fulfillment_services`
subgraph with the production metadata from the other subgraphs.

### Add the build profile to the project {#add-build-profile}

In your `hasura.yaml` in the project's root, add the build profile to the `buildProfiles` section:

```yaml
buildProfiles:
  - build-profile.yaml
  - build-profile_fulfillment-dev.yaml
```

### Watch the build

If watch is still running, kill it with `Ctrl+C` and start it again with the new build profile:

```bash
hasura3 watch --profile build-profile_fulfillment-dev.yaml
```

This will ensure that as changes are made to the subgraph, the supergraph is rebuilt on the `fulfillment-dev`
environment.
