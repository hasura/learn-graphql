---
title: "Course Introduction"
metaTitle: "Course Introduction | Hasura v3 Supergraph Modeling Tutorial"
metaDescription:
  "A powerful and comprehensive tutorial that will introduce you Hasura v3 supergraph modeling and its core concepts."
---

Delve into the world of supergraphs with our comprehensive course designed for modern API developers. Supergraphs
represent a breakthrough in API design, offering a unified, interconnected data layer from various subgraphs. In this
course, you will learn the intricacies of building subgraphs, connecting them to your data supergraph using Hasura’s
versatile data connectors, and create relationships to work seamlessly across teams.

## What will I learn? {#what-will-i-learn}

This tutorial is designed to give you a complete overview of how to model and architect a data supergraph using Hasura
v3. By the end of this tutorial, you will have a working supergraph — complete with separate subgraphs that include
relational data sources — deployed to [Hasura DDN](https://console.hasura.io), our global and near-instant data delivery
network.

You'll learn:

**Conceptual Understanding**

- Understand the concept of a supergraph.

**Subgraph and Supergraph Management**

- Identify subgraphs in an organization.
- Create relationships across models in subgraphs.
- Test changes to a subgraph with other production supergraph metadata.

**Development and Customization**

- Use dev mode to get instant feedback on your API's changes.
- Create relationships with the aid of LSP.

**Deployment and Integration**

- Deploy a custom connector to Hasura DDN.

## What will we be building? {#what-will-we-be-building}

We'll build an e-commerce supergraph that mimics the real world by simulating a series of development teams that must
work collaboratively to build their subgraphs independently. Each team will be responsible for a subgraph that
represents a different part of the e-commerce application. Our teams are:

- User Experience
- Product Management
- Payment Processing
- Fulfillment Services

## What do I need to take this tutorial? {#what-do-i-need-to-take-this-tutorial}

We'll go into more detail in the next section, but you'll need:

- The new [Hasura CLI](https://hasura.io/docs/3.0/cli/overview/)
- The [Hasura VS Code extension](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura) (optional, but
  recommended)
- A [Hasura DDN](https://console.hasura.io) account
- Completion of the [Hasura Basics v3 course](https://hasura.io/learn/graphql/hasura-v3/introduction/)
- [ngrok](https://ngrok.com/) (for tunneling locally-running databases) or a cloud-hosted PostgreSQL provider

## How long will this tutorial take? {#how-long-will-this-tutorial-take}

About 90 mins.

## Additional Resources {#additional-resources}

We'll link to the docs throughout this tutorial, but if you feel like opening them up in a new tab,
[here](https://hasura.io/docs/3.0/) they are.
