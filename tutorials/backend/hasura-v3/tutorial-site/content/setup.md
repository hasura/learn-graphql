---
title: "Prerequisites"
metaTitle: "Prerequisites | Hasura v3 Tutorial"
metaDescription: "We'll cover everything you need to know to get started with Hasura."
---

After getting this page sorted, you'll be off to the races. This set of one-time setup steps will get you ready to start
building your Hasura project.

## Install the Hasura CLI {#hasura-cli}

We've redesigned the Hasura CLI from the ground up to make it easier to use and more powerful. Follow the
[install instructions from the docs](https://hasura.io/docs/3.0/cli/installation/) for your platform. **Please note,
this is a new CLI and is not the same as the previous version.**

## Install the VS Code extension {#vs-code-extensions}

We recommend using [VS Code](https://code.visualstudio.com/) and installing the Hasura VS Code extension. It allows you
to instantly scaffold out your metadata 🚀

You can download the extension from the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura).

## Authenticate your CLI {#cli-auth}

To authenticate your CLI to our network, run the following command:

```bash
ddn login
```

This will open a browser window where you can log in with your Hasura account. Once you've logged in, you can close the
browser window and return to your terminal.

## Our data model

In this tutorial, we'll be building the data layer for an e-commerce application. We'll use the following data model,
which we'll connect to our project in the next section:

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
