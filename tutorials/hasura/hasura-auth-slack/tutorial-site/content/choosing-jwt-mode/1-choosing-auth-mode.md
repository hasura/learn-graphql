---
title: "Choosing the right mode"
metaTitle: "Choosing the right mode | Hasura Auth Slack Tutorial"
metaDescription: "This part of the tutorial covers how to choose the right auth mode"
---

In this part, we will look at which mode is right for the Slack clone.

### Using JWT Mode {#using-jwt-mode}

JWT mode is a recommended solution with Hasura, if your Auth server can support it.

Our Slack app clone doesn't need to integrate with legacy auth systems or has complex custom rules which can only be processed via a webhook. The Auth server can be configured to inject the right hasura claims into every token it generates ensuring that the permission rules can be applied.

The Slack app has users that needs to be assigned roles. JWT mode is the recommended mode due to ease of integration and the benefits it brings for clients.

### When to use webhook mode? {#webhook-mode}

Webhook mode is generally required if the Auth server you use cannot issue JWT tokens in the format that Hasura expects it to be or doesn't have JWT integration at all to begin with. This is a more common use case with existing legacy auth systems. Do note that with a webhook mode, the webhook has to be deployed, maintained and everytime a request is made to Hasura, it will in turn make a request to the webhook to authorize the request. This could have a slight latency depending on where the webhook is deployed.
