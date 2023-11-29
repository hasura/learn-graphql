---
title: 'Metadata'
metaTitle: 'Data Modeling with Hasura | Hasura GraphQL Tutorial'
metaDescription: 'This tutorial covers how to do data modeling in PostgreSQL and create tables'
---

Hasura allows you to define your entire data model using a declarative set of metadata files. This metadata is written
in HML (a Hasura-specific flavor of YAML) and is used to create tables, relationships, permissions, and more. This
metadata can be version controlled and modified iteratively, allowing you to easily collaborate with your team - and
across others - to keep track of changes to your data layer.

## The Open Data Domain (OpenDD) Specification

We designed the
[Open Data Domain specification (OpenDD spec)](https://hasura.io/docs/3.0/data-domain-modeling/introduction/) to be a
simple, authoritative, source-agnostic way to define your entire data layer. The OpenDD spec allows you to create a
supergraph of all your data sources, including databases, REST APIs, GraphQL APIs, and more. Within a metadata file
written according to this specification, you can also quickly and easily define relationships between your data sources,
create permissions, and more.

## Our data model

In this tutorial, we'll be building the data layer for an e-commerce application. We'll use the following data model, as
found in the `up.sql` from the [prerequisites](/setup) page:

| Table name    | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| users         | Stores information about users, including their name and email address.                                                           |
| categories    | Stores information about categories of products, including their name.                                                            |
| manufacturers | Stores information about manufacturers of products, including their name.                                                         |
| products      | Stores information about products, including their name and price.                                                                |
| reviews       | Stores information about reviews of products, including the user who wrote the review and the product that was reviewed.          |
| orders        | Stores information about orders, including the user who placed the order and the product that was ordered.                        |
| carts         | Stores information about carts, including the user who owns the cart.                                                             |
| cart_items    | Stores information about items in a user's cart, including the user who owns the cart and the product that was added to the cart. |
| notifications | Stores information about notifications, including the user who owns the notification.                                             |
| coupons       | Stores information about coupons, including the coupon code and the discount amount.                                              |

**Be sure to apply the `up.sql` and then the `table_seeds.sql` files from the [prerequisites](/setup) page before
continuing.**

If you're unsure how to apply these files, you can use the following commands with
[psql](https://www.postgresql.org/download/):

```bash
psql -h localhost -p <PORT> -U <USERNAME> -d <DATABASE_NAME> -a -f up.sql
psql -h localhost -p <PORT> -U <USERNAME> -d <DATABASE_NAME> -a -f table_seed.sql
```
