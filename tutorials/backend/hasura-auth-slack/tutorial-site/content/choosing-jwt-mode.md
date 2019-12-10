---
title: "Authentication Modes"
metaTitle: "Authentication Modes | Hasura Auth Slack Tutorial"
metaDescription: "This part of the tutorial covers how to choose the right auth mode"
---

In this part, we will look at the different modes for Authentication. Authentication is handled outside of Hasura. You can bring in your own Auth server and integrate it with Hasura. There are broadly two options available.

- JWT Mode
- Webhook Mode

## JWT Mode

You can configure GraphQL Engine to use the JWT authorization mode to authorize all incoming requests. The auth server is expected to return a valid JWT token, which are decoded and verified by the GraphQL engine, to authorize and get metadata about the request.

A typical architecture with Auth server issuing JWT looks like the one below:

![JWT Mode](https://docs.hasura.io/1.0/_images/jwt-auth1.png)

The Auth Server issues JWT tokens with relevant `x-hasura-*` claims to the app which then sends the token to Hasura GraphQL Engine. Hasura then validates the claims to allow the request to go through.

## Webhook Mode

You can also configure GraphQL Engine to use the Webhook mode. Your auth server exposes a webhook that is used to authenticate all incoming requests to the Hasura GraphQL engine server and to get metadata about the request to evaluate access control rules.

The architecture with webhook looks like the one below:

![Webhook mode](https://docs.hasura.io/1.0/_images/webhook-auth1.png)

### Unauthenticated Mode

Sometimes you would like to allow access to data without a user being logged in. This is useful for public feed which is open to all users. Although our Slack app doesn't have this as a use case, it is good to know when this could be used.
