---
title: "Authentication and Authorization"
metaTitle: "Authentication and Authorization | Hasura GraphQL Advanced Tutorial"
metaDescription: "Authentication with Hasura can be implemented using JWT, webhooks, and unauthenticated public access. Authorization with Hasura can be implemented using role-based permissions."
---

Authentication with Hasura can be implemented using the following:
- [JWT](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/)
- [Webhooks](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook/)
- [Unauthenticated public access](https://hasura.io/docs/latest/graphql/core/auth/authentication/unauthenticated-access/)

In all of these cases, it is important to configure an `admin secret` first.

Authorization with Hasura can be implemented using the following:
- Role-based permissions: per role, per schema, per table, per operation type
- Set role access rules (records and fields) for Insert, Select, Update, and Delete

Both [Authentication](https://hasura.io/learn/graphql/hasura/authentication/) and [Authorization](https://hasura.io/learn/graphql/hasura/authorization/) have been covered in our Hasura Basics tutorial. Do check that out.

Also, for the Slack model in this tutorial, we have the [Slack Authorization tutorial](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/) talking about setting up role-based permissions from scratch.
