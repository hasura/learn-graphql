---
title: "Webhook Mode"
metaTitle: "Webhook Mode | Hasura Authentication Tutorial"
metaDescription: "You can configure the Hasura GraphQL engine to use a webhook to authenticate all incoming requests to the Hasura GraphQL engine server."
---

We have seen how to integrate JWT with Hasura using many of the popular providers. In case the Auth server you use cannot issue JWT tokens or doesn't have JWT integration at all to begin with, the webhook mode can be used. 

This is a more common use case with existing legacy auth systems. Do note that with a webhook mode, the webhook has to be deployed, maintained and everytime a request is made to Hasura, it will in turn make a request to the webhook to authorize the request. This could have a slight latency depending on where the webhook is deployed.

If you are co-locating the webhook and Hasura servers, then the latency would be minimal and shouldn't be a concern.

Here's the architecture of how Hasura handles webhook mode for authentication.

![Webhook Mode](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/webhook-mode-database.png)

To read more about using Webhook mode with Hasura, head to our docs on [Using Webhooks](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook/)