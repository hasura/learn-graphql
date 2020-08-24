---
title: "Connect Hasura with Auth0"
metaTitle: "Connect Hasura with Auth0 | Hasura GraphQL Tutorial"
metaDescription: "In this part, you will learn how to connect Hasura with the Auth0 application and secure your app with HASURA_GRAPHQL_JWT_SECRET"
---

In this part, you will learn how to connect Hasura with the Auth0 application that you just created in the previous step.

Before we do that, we need to secure our endpoint with an admin secret. Right now, the GraphQL endpoint is open and anybody can query and manage the data. [Read docs](https://hasura.io/docs/cloud/1.0/manual/projects/secure.html#adding-an-admin-secret) on how to add an admin secret to a Hasura Cloud project.

Once an admin secret is added, we need to configure Hasura to use the JWK URL of Auth0.

The format for `jwk_url` will look like `https://<auth0-domain>/.well-known/jwks.json`. Replace the `<auth0-domain>` with your Application domain. This should be available in the Settings tab.

The final value for the env will look like:

```
{
    "jwk_url": "https://<auth0-domain>/.well-known/jwks.json"
}
```

This config can be used as the value for environment variable `HASURA_GRAPHQL_JWT_SECRET`.

Open the Hasura Cloud dashboard and head to the "Env vars" page for your Hasura Cloud project:

![Hasura ENV Config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

Click on `+ New Env Var` to add a new environment variable.

Add a new Config Var called `HASURA_GRAPHQL_JWT_SECRET`, and copy and paste the above object (with the right auth0 domain).

You should end up with something like the following:

![Add new env Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-jwt-secret-env-cloud.png)

Click on `Add` and your environment variable will be applied to the project.

Great! Now your Hasura instance is secured using Auth0.
