---
title: "Model a Supergraph"
metaTitle: "Model a Supergraph | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Everything you need to know to get started with building your supergraph."
---

## How to model a supergraph {#modeling}

When modeling your supergraph, it's important to think about how your teams are organized and how your data is
structured. This will help you determine how to best organize your subgraphs.

Typically, we see teams organized around a specific domain or business function. For example, you might have a team that
is responsible for managing your users and another team that is responsible for managing your products. In this case,
you might want to create two subgraphs: one for users and one for products.

As we said in the introduction for the course, we'll use a simple e-commerce application as an example with four main
teams:

- **User Experience (UX)**: responsible for the user experience of the application.
- **Product Management**: responsible for managing products and inventory.
- **Payment Processing**: responsible for managing payments.
- **Fulfillment Services**: responsible for managing orders and shipping.

This approach works better than identifying subgraphs based on a single data source. For example, a team may have a
relational database that contains all the data and schema which they own. However, they may also have custom business
logic that is used to manage that data. In this case, it would be better to create a subgraph that contains both the
database and the custom business logic.

This enables teams to own their data and business logic while still being able to share that data with other teams
through the supergraph. This unblocks other teams from having to wait for the owning team to make changes and empowers
the owning team to make changes without having to worry about breaking other teams.

## Identify subgraphs {#identify-subgraphs}

We recommend that you start by identifying the subgraphs that you'll need to create. This will help you determine how to
organize your data and relationships.

For this course, we'll use the examples above to create four subgraphs:

- `app`\*
- `product_management`
- `payment_processing`
- `fulfillment_services`

\*The `app` subgraph was created automatically when you created a new Hasura project. We'll use this for our `ux`
team and model it in the next lesson.
