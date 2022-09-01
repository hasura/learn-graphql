---
title: 'Authorizer'
metaTitle: 'Authorizer | Hasura Authentication Tutorial'
metaDescription: 'Learn how to integrate Authorizer with Hasura to add sign-up, sign-in, and role based authorization into your applications using JWT'
---

## What is Authorizer

[Authorizer](https://authorizer.dev) is database independent open-source authentication and authorization solution.

In this section you will learn how to integrate [Authorizer](https://authorizer.dev) with your Hasura instance and have authorized GraphQL API ready for your application.

## How to integrate Authorizer

### Step 1: Deploy Authorizer Instance

To integrate Authorizer with Hasura, you will need an Authorizer instance deployed on your infrastructure or 3rd party cloud services. You can deploy authorizer instance using following one click deployment options:

| **Infra provider** |                                                                                           **One-click link**                                                                                            |               **Additional information**               |
| :----------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------: |
|    Railway.app     |                      <a target="_blank" href="https://railway.app/new/template/nwXp1C?referralCode=FEF4uT"><img src="https://railway.app/button.svg" alt="Deploy on Railway"/></a>                      | [docs](https://docs.authorizer.dev/deployment/railway) |
|       Heroku       |  <a target="_blank" href="https://heroku.com/deploy?template=https://github.com/authorizerdev/authorizer-heroku"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" /></a>   | [docs](https://docs.authorizer.dev/deployment/heroku)  |
|       Render       | <a target="_blank" href="https://render.com/deploy?repo=https://github.com/authorizerdev/authorizer-render"><img alt="render button" src="https://render.com/images/deploy-to-render-button.svg" /></a> | [docs](https://docs.authorizer.dev/deployment/render)  |

OR

You can also deploy Authorizer instance using

- [Docker Image + Kubernetes](https://docs.authorizer.dev/deployment/kubernetes)
- [Kubernetes HelmChart](github.com/authorizerdev/authorizer-helm-chart)
- [Binanry](https://docs.authorizer.dev/deployment/binary)
- [fly.io](https://docs.authorizer.dev/deployment/flydotio)

> **Note:** If you are trying out with one click deployment options like railway then template is configured in a way that it will also deploy postgres + redis for you. But if you are going with other deployment options required environment variables are `DATABASE_TYPE` & `DATABASE_URL`. You can also configure `REDIS_URL` to have persisted sessions. For more information check [docs](https://docs.authorizer.dev/core/env).

In case of Hasura, we need to have database type as one of `postgres`, `sqlserver` or `yugabyte` and connect that database with Authorizer instance via Database Environment Variables. As more databases are supported by Hasura, this list could change.

### Step 2: Configure Authorizer instance

You can configure authorizer instance by opening the URL or IP address of the deployed instance. Recommended way is to configure sub-domain for your authorizer instance example, `auth.yourdomain.com`. You will see an authorizer dashboard where you can configure

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

Also, you can invite the users and manage them from the dashboard itself.

### Step 3: Setup Hasura Instance

- Create a project on [Hasura Cloud](https://cloud.hasura.io)

### Step 4: Configure Database with Hasura Instance

- Open the dashboard of Hasura Cloud and navigate to your project
- Click on `Launch Console` on top right corner
- Go to `Data` section and connect to your database

  Example
  ![hasura_db_conenction](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661837009/Authorizer/hasura_db_setting_ckdsqu.png)

Check the [hasura docs](https://hasura.io/docs/latest/graphql/cloud/getting-started/index/) for more information.

> **Note:** If you have used one click deployment option for authorizer you can get database URL from respective platform's env sections.

## Step 5: Configure JWT token with Hasura

- Open Authorizer Dashboard
- Get the JWT Type and Secret / Public Key from `JWT Secrets` section
  ![authorizer_jwt_config](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836501/Authorizer/configure_jwt_uyrvoc.png)
- Open the Hasura dashboard and navigate to your project
- Open settings and go to `Env vars` section
- Add the following env variable to configure the JWT token

  ```
  HASURA_GRAPHQL_JWT_SECRET: {"type": <JWT_TYPE>, "key": <JWT_KEY>}
  ```

  Example
  ![image](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661837310/Authorizer/hasura_jwt_ttuqp2.png)

> **Note:** In case of RSA and ECDSA JWT types only provide the public key in PEM encoded string format. You can get the JWT type and key from the authorizer dashboard under env variables section.

Check the [Hasura Docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/) for more information.

## Step 6: Configure JWT token Authorization Script

In order for Hasura to authorize a user, JWT token needs to have specific keys, you can add those keys by modifying JWT token script in your Authorizer Dashboard.

Example:

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

![script-image](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836293/Authorizer/configure_id_token_yrwb6z.png)

Once user logs in, they will get a `id_token` in the response, this token should be used with Hasura queries as `Authorization: Bearer ID_TOKEN`. This will help in making `Authorized` requests.

You can configure access control for the various roles that your application needs from Hasura + Add / Update those roles from Authorizer dashboard

![authorizer_roles](https://res.cloudinary.com/dcfpom7fo/image/upload/v1661836262/Authorizer/configure_roles_tfxfyq.png)

For more information on access control check [Hasura docs](https://hasura.io/docs/latest/graphql/core/auth/authorization/basics/)

You can also stitch Authorizer GraphQL Endpoint with Hasura Remote Schema, that way you can have a single endpoint for all your GraphQL queries / mutations.
