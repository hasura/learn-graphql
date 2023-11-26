---
title: 'Scaffold metadata'
metaTitle: 'Scaffold metadata | Hasura v3 Tutorial'
metaDescription: "Let's add some metadata to our project."
---

From here, you can immediately track tables, views, relationships, and quickly scaffold out your metadata by using the
Hasura VS Code extension.

Models are a new way to represent your data in Hasura.

Models in the [OpenDD Spec](https://hasura.io/docs/3.0/data-domain-modeling/overview/) refer to a collection of objects
(such as rows in a relational database, or documents in a NoSQL database) of a given OpenDD Spec
[type](https://hasura.io/docs/3.0/data-domain-modeling/types/). Models are backed by a data source and can support CRUD
operations. You can learn more about models [here](https://hasura.io/docs/3.0/data-domain-modeling/models/).

## Instant-gratification route

Create a file in the `subgraphs/default/models` directory called `allModels.hml`.

Then, bring up the command palette again and type `hasura track all` and choose the option from the dropdown. Then,
select your data source's name and, viola — your metadata file will be populated with **models** and everything you need
to get started! 🎉

![Tracking all models, relationships, etc. in VS Code](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/0.0.1_vs-code-track-everything.png)

If you go this route, you can skip the next section and move on to [builds](/builds). **However, we recommend you break
apart your metadata into separate files for each model.** This will make it easier to manage your metadata as your
project grows.

This is part of the magic of Hasura's metadata system — you can break apart your metadata into as many files as you want
and Hasura will automatically merge them together for you.

## Disciplined route

By structuring your metadata in separate files, you can easily manage your metadata as your project grows. This gives
individual teams the ability to work on their own metadata files without worrying about affecting other teams' work.

As a reminder, here are our tables and views:

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

### Create a file for each model

Create a file for each of these tables in the `subgraphs/default/models` directory. For example, create a file called
`users.hml` and add then run the following command in the command palette by pressing `Command + Shift + P` (Mac) or
`Ctrl + Shift + P` (Windows):

```text
Hasura Track Collection from data connector
```

A menu will appear with a list of tables and views. Select `users` and your metadata will be generated for you.

Repeat this process for the remaining nine tables.

### Create relationships

While we've tracked our tables and views, we still need to create relationships between them. Relationships are a
powerful feature of Hasura that allow you to easily query data across tables.

Within each file, you can use the VS Code extension to create relationships between your tables. For example, in the
`users.hml` file, you can create a relationship between the `users` table and the `orders` table by pressing
`Command + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows) and typing `Hasura Track suggested Relationship`. Then, you
can select the `users / orders` relationship from the dropdown.

**For each file, you'll need to repeat this process for each relationship.**

Once you've completed this process, you'll have a fully scaffolded subgraph with all of your models and relationships
defined!
