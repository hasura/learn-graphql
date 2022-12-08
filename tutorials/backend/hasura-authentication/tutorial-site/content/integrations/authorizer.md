---
title: "Authorizer"
metaTitle: "Authorizer | Hasura Authentication Tutorial"
metaDescription: "Learn how to integrate Authorizer with Hasura to add sign-up, sign-in, and role-based authorization into your applications using JWT"
---

## What is Authorizer

[Authorizer](https://authorizer.dev) is a database-independent open-source authentication and authorization solution.

In this section, you will learn how to integrate [Authorizer](https://authorizer.dev) with your Hasura instance and have authorized GraphQL API ready for your application.

## How to integrate Authorizer

### Step 1: Deploy Authorizer Instance

To integrate Authorizer with Hasura, you need to deploy an Authorizer instance on your infrastructure or a third-party cloud service. You can deploy an Authorizer instance using the following one-click deployment options:

| **Infra provider** |                                                                                           **One-click link**                                                                                            |               **Additional information**               |
| :----------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------: |
|    Railway.app     |                      <a target="_blank" href="https://railway.app/new/template/nwXp1C?referralCode=FEF4uT"><img src="https://railway.app/button.svg" alt="Deploy on Railway"/></a>                      | [docs](https://docs.authorizer.dev/deployment/railway) |
|       Heroku       |  <a target="_blank" href="https://heroku.com/deploy?template=https://github.com/authorizerdev/authorizer-heroku"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" /></a>   | [docs](https://docs.authorizer.dev/deployment/heroku)  |
|       Render       | <a target="_blank" href="https://render.com/deploy?repo=https://github.com/authorizerdev/authorizer-render"><img alt="render button" src="https://render.com/images/deploy-to-render-button.svg" /></a> | [docs](https://docs.authorizer.dev/deployment/render)  |

You can also deploy an Authorizer instance using:
- [Docker Image + Kubernetes](https://docs.authorizer.dev/deployment/kubernetes)
- [Kubernetes HelmChart](https://github.com/authorizerdev/authorizer-helm-chart)
- [Binanry](https://docs.authorizer.dev/deployment/binary)
- [fly.io](https://docs.authorizer.dev/deployment/flydotio)

> **Note:** With a one-click deployment option like Railway, the template configuration also deploys Postgres + Redis for you. If you use other deployment options, the required environment variables are `DATABASE_TYPE` & `DATABASE_URL`. You can also configure `REDIS_URL` to have persisted sessions. For more information check [docs](https://docs.authorizer.dev/core/env).

With Hasura, the database type needs to be either `Postgres`, `SQL Server`, or `Yugabyte`. Then you connect the database with the Authorizer instance via Database Environment Variables. As Hasura supports more databases, this list could change.

### Step 2: Configure Authorizer instance

It's recommended to configure a sub-domain for your Authorizer instance. For example, `auth.yourdomain.com`.

After deploying the Authorizer instance, open the dashboard to start the configuration process. In the Authorizer dashboard, you can configure:
- Social media logins
- JWT key & secrets
- User roles
- Whitelist domains
- Company information
- Features
- Access Token data
- SMTP server
- Webhooks
- Email templates

Additionally, you can invite and manage users in the dashboard itself.

### Step 3: Set up Hasura instance

The quickest way to set up a Hasura instance is via Hasura Cloud.

[![Deploy to Hasura button](https://camo.githubusercontent.com/949a2db267b00f49757865d585f16687118d796d41064e21c3d933d21884d533/68747470733a2f2f6772617068716c2d656e67696e652d63646e2e6861737572612e696f2f696d672f6465706c6f795f746f5f6861737572612e706e67)](https://cloud.hasura.io/signup)

### Step 4: Configure Database with Hasura Instance

After creating the Hasura instance, you need to connect it to a database. Open the Hasura project console, navigate to the `Data` section and add a database.

 ![Hasura database connection](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661837009/Authorizer/hasura_db_setting_ckdsqu.png)

Check the [Hasura docs](https://hasura.io/docs/latest/graphql/cloud/getting-started/index/) for more information on how to get started with Hasura Cloud.

> **Note:** If you chose a one-click deployment option for Authorizer, you can get the database URL from the respective platform's env section.

## Step 5: Configure JWT token with Hasura

Open the Authorizer dashboard, navigate to the `JWT Secrets` section, and retrieve the "JWT Type" and "Secret/Public Key".

![Authorizer JWT Secrets section](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836501/Authorizer/configure_jwt_uyrvoc.png)

After that, open the Hasura dashboard and navigate to the `Env vars` section in your project's settings.

Add the following env variable to configure the JWT token:

  ```
  HASURA_GRAPHQL_JWT_SECRET: {"type": <JWT_TYPE>, "key": <JWT_KEY>}
  ```

The image illustrates the process of adding the JWT token in Hasura.

![Add env var in Hasura](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661837310/Authorizer/hasura_jwt_ttuqp2.png)

> **Note:** In the case of RSA and ECDSA JWT types, the public key comes only in the PEM encoded string format. You can get the JWT type and key from the env variables section in the Authorizer dashboard.

Check the [Hasura Docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/) to learn more about JWT authentication.

## Step 6: Configure JWT token Authorization Script

For Hasura to authorize a user, the JWT token must have specific keys. You can add those keys by modifying the JWT token in your Authorizer Dashboard.

```js
function(user,tokenPayload) {
  var data = tokenPayload;
  data['https://hasura.io/jwt/claims'] = {
    'x-hasura-user-id': user.id,
    'x-hasura-default-role': tokenPayload.allowed_roles[0],
    'x-hasura-allowed-roles': user.roles
  }

  return data;
}
```

![Access token from Authorizer dashboard](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836293/Authorizer/configure_id_token_yrwb6z.png)

The response of a successful login will contain an `id_token`. That id token is sent via the `Authorization: Bearer ID_TOKEN` header to make authorized requests.

You can configure access control for the various roles that your application needs from the Hasura console. Additionally, you can also add/update roles from the Authorizer dashboard.

![The roles feature in Authorizer](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836262/Authorizer/configure_roles_tfxfyq.png)

For more information on access control basics, check the [Hasura documentation](https://hasura.io/docs/latest/graphql/core/auth/authorization/basics/).

Also, you can add the Authorizer GraphQL endpoint to Hasura as a [remote schema](https://hasura.io/docs/latest/remote-schemas/index/). That way, you have a unified GraphQL API and single endpoint for all your GraphQL queries/mutations.
