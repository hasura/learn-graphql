---
title: 'Supergraph Modeling'
metaTitle: 'Supergraph Modeling | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Everything you need to know to get started with building your supergraph.'
---

In our first section, we'll take a look at how to model a supergraph. We believe strongly that by simply modeling your
data and relationships, you should easily be able to produce an API that is both powerful and easy to use. We'll see
that Hasura DDN allows for just that!

We'll begin by introducing two important concepts: **subgraphs** and **supergraphs**.

## What is a subgraph? {#what-is-a-subgraph}

A subgraph is composed of related data sources — be that as traditional databases, or as custom business logic — and is
connected to your data layer using [data connectors](https://hasura.io/connectors).

Hasura DDN utilizes a number of data connectors that work with popular databases, services, and APIs out-of-the-box; you
can also build your own. These subgraphs can even include your own custom business logic as TypeScript functions that
return or mutate data directly via your GraphQL API. This saves you the time and effort of building and maintaining your
own APIs to manage data sources and existing microservices.

You can easily model these subgraphs using the new [Hasura CLI](https://hasura.io/docs/3.0/cli/installation/) and our
[LSP-enabled VS Code extension](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## What is a supergraph? {#what-is-a-supergraph}

A supergraph is a framework that brings together all of your data sources and relationships into a single graph. This
graph can then be used to generate a single API that can be used to query and mutate data across all of your data
sources. Below, you can see an example of what we'll build:

![Supergraph Visualization](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/final-visualization.png)

Hasura DDN automatically generates your supergraph based on subgraphs while giving you the freedom and flexibility to
define relationships across your data sources.
