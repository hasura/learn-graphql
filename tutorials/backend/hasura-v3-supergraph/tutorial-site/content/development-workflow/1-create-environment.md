---
title: 'Create an Environment'
metaTitle: 'Modeling a Supergraph | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Everything you need to know to get started with building your supergraph.'
---

## Create a set of environments

Using the CLI, we can create a new environment for our `fulfillment_services` subgraph:

```bash
hasura3 environments create --name fulfillment-dev
```

This will create an environment called `fulfillment-dev`. Environment names must be unique and between 3 and 23
characters long.

<!-- We'll also create an environment called `production` that we'll use after we've tested our changes to the
`fulfillment_services` subgraph:

```bash
hasura3 environments create --name production
``` -->

In the next step, we'll use this newly created environment to create a build profile for our `fulfillment_services`
subgraph.
