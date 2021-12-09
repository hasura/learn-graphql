---
title: "Service Level Security"
metaTitle: "Service Level Security | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura allows access to be determined on a service level. There are various configurations that can be done to secure data access at multiple layers. We will look at each of them now."
---

Hasura allows access to be determined on a service level. There are various configurations that can be done to secure data access at multiple layers. We will look at each of them now.

## Configure an API secret {#configure-api-secret}

You might have configured an `admin secret` already to secure the GraphQL API initially. This will be followed up by role based permission system for data access. But if you are using custom code via `Actions`, `Remote Schemas` and `Events`, then you need a way to be able to restrict that custom code to be only called by Hasura and not from anywhere else.

This requires trust between the Hasura server and the custom code server. This trust is established through a shared API secret.

When creating an action/remote schema/events, you can add custom headers like the one below:

![Shared Secret through Headers](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/shared-secret.png)

## Set CORS policies {#set-cors-policies}

By default, Hasura allows all CORS requests. In a production scenario, you might want to restrict the queries to be made by few selected domains.

For example, if your application is hosted on a domain, say https://example.com, you can allow any requests to come from this and any of its subdomains by enabling the config HASURA_GRAPHQL_CORS_DOMAIN="http://*.example.com".

![Cors Domain](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cors-domain.png)

Of course this restriction applies only on the client side (browser). Since the API is publicly accessible in any case, these policies are useful only to restrict requests made from the browser. This still doesn't prevent anyone from making requests server side or from mobile apps for example and shouldn't be used as a means to restrict for such cases anyways.

## SSL and HTTPS {#ssl-https}

Hasura Cloud projects come with free SSL for all apps, including custom domains and hence the APIs are accessible over `https` regular queries and `wss` for realtime subscription queries.

Note that `wss` can be used for making all requests. (Not just subscriptions, but queries and mutations work too).

## Manage team members and their levels of access {#manage-team-access}

In Hasura Cloud, you can share console access to different team members with restricted access. You can do this by adding collaborators in the project settings page as given below:

![Team Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/collaborator.png)

There are two levels of access to the Hasura Cloud project:

- `admin` has access to perform API calls and view metrics and configure rules without any restrictions.
- `user` has limited access depending on whether permissions for executing GraphQL and Viewing metrics was provided.
