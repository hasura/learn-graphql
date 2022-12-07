---
title: "Logto"
metaTitle: "Logto | Hasura Authentication Tutorial"
metaDescription: "Logto is an open source identity solution that helps build the sign-in experience and user authentication service within minutes"
---

## What is Logto?

Logto is an open source identity solution that helps you build the sign-in experience and user authentication service within minutes.

Main features:

- An OIDC-based identity service
- Multi-platform user sign-in/up experience with dark mode and SDKs (Web, iOS, and Android)
- Sign-in/up with dynamic SMS/Email passcode
- Out-of-box social sign-in integration (GitHub, Google, WeChat, Alipay, etc.)
- A web UI to control all above (Admin Console)
- Extendable multi-language support

## How to integrate Logto?

> This guide assumes you already have Hasura instance running on your local cloud environment.
> 

Hasura supports two ways of authentication: Webhooks and JWT. In this guide, we are using a webhook to authenticate all incoming requests to the Hasura server. Check [Hasura official docs](https://hasura.io/docs/latest/auth/authentication/webhook/) for more information about Webhooks.

### Set admin secret, auth hook endpoint and default roles via environment variables:

```bash
# Replace with your own secret
HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey

# Assuming Logto is running at 'http://localhost:3001',
# and we are also going to create an API resource named 'https://hasura.api' in the next few steps
HASURA_GRAPHQL_AUTH_HOOK=http://localhost:3001/api/authn/hasura?resource=https://hasura.api

USER_DEFAULT_ROLE_NAMES=user,good_user
```

### Self-host Logto instance on your own server:

- Prepare a PostgreSQL instance, and use Logto CLI to seed a database for Logto:

```bash
npx @logto/cli db seed
```

- Pull the Logto docker image:

```bash
# ghcr
docker pull ghcr.io/logto-io/logto:prerelease
# DockerHub
docker pull svhd/logto:prerelease
```

- Run docker container with the following environment variables

```bash
docker run \
--name logto \
-p 3001:3001 \
-e TRUST_PROXY_HEADER=1 \
-e ENDPOINT=https://your-logto-domain-url \
-e DB_URL=postgres://username:password@your_postgres_url:port/db_name \
-e HASURA_GRAPHQL_ADMIN_SECRET=myadminsecretkey \
-e HASURA_GRAPHQL_AUTH_HOOK=http://localhost:3001/api/authn/hasura?resource=https://hasura.api
-e USER_DEFAULT_ROLE_NAMES=user,good_user
ghcr.io/logto-io/logto:prerelease
```

For more details on how to self-host a Logto instance, please check Logto official "[Get Started](https://docs.logto.io/docs/tutorials/get-started/)" documentation.

### Sign-in to Logto Admin Console

- Open browser, and navigates to the Logto domain URL. You will see this welcome page once the above deployment is successful.
    
    ![image](https://user-images.githubusercontent.com/12833674/204700000-a3073c8e-191e-486a-b93c-f99c28a1eeec.png)
    
- Create an admin account, and sign in.

### Create Hasura API resource

- In order to protect your HASURA GraphQL requests, we are going to create an API resource for HASURA in Logto. Once signed-in to Logto admin console, go to “API Resources” page, and click “Create API Resource” button.
    
    ![image](https://user-images.githubusercontent.com/12833674/204700041-16f30fe8-7c6c-498c-a716-7d4394e09eb0.png)
    
    > 💡 The API resource identifier can be any absolute URI format. In this guide, we use `https://hasura.api` as the identifier.
    >

### Create Application and Integrate Logto SDK

- Go to “Applications” in admin console, and click “Create Application” button.
    
    ![image](https://user-images.githubusercontent.com/12833674/204700098-eeecbf84-faa3-4724-a8df-35e3b4a9e4d4.png)
    
    In this guide, let’s assume your application is an SPA built with React framework.
    
- Follow the guide step by step, and integrate Logto React SDK into your application.
    
    ![image](https://user-images.githubusercontent.com/12833674/204700117-c1cda4fa-4c3e-4e3c-a87e-cb38a42253ab.png)
    
    For now, you are having your user authentication ready and secured by Logto. 
        
    > 💡 Check “Sign-in Experience” in admin console if you want to customize your sign-in page and workflow.
    >

    
- Once you complete the integration above, we need one tiny modification to the code in `Step 2: Init LogtoClient`. Add the Hasura API identifier in `LogtoConfig` as `resources` when initializing LogtoClient.

```tsx
const config: LogtoConfig = {
  endpoint: 'http://localhost:3001',
  appId: '<your-application-id>',
  resources: ['https://hasura.api'], // Add this line
};
```

### Issue Access Token and Protect Your Hasura API Requests

- Finally! We are almost there. In your code, after a user is successfully signed-in, call `getAccessToken()` in Logto SDK with the above identifier to issue an access token for your Hasura API resource.

```tsx
const accessToken = await logto.getAccessToken('https://hasura.api');
```

- The access token issued will be a standard JWT format token. Set it to your request header before calling the Hasura GraphQL requests.

```tsx
// Before sending the request
request.headers.set('Authorization', `Bearer ${accessToken}`);
request.headers.set('Expected-Role', 'user');
```

Congratulations! For now, you are having not only the ability to generate a valid Access Token for GraphQL requests, but also a smooth sign-in experience for your end-users. 👏

## Recap

With the effort above, we successfully implemented all the non-skippable things in the intro:

- A database-schema-driven GraphQL API endpoint
- An auth and identity service on top of OIDC protocol
- The complete end-user sign-in flow and auth state management
- Secured API access based on user identity and roles

Not that hard, right? If you meet any issues, feel free to join the [Logto](https://discord.gg/vRvwuwgpVX) or [Hasura](https://discord.gg/hasura) discord server to have a live chat with the team.
