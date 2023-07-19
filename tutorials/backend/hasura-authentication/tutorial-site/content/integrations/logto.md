---
title: "Logto"
metaTitle: "Logto | Hasura Authentication Tutorial"
metaDescription: "Logto is an open source identity solution that helps build the sign-in experience and user authentication service within minutes"
---

## What is Logto?

Logto is an open source identity solution that helps you build the sign-in experience and user authentication service within minutes.

## How to integrate Logto?

> This guide assumes you already have Hasura instance running on your local environment.
> 

Hasura supports two ways of authentication: Webhooks and JWT. In this guide, we are using a webhook to authenticate all incoming requests to the Hasura server. Check [Hasura official docs](https://hasura.io/docs/latest/auth/authentication/webhook/) for more information about Webhooks.

### Set auth hook endpoint via environment variables:

```bash
# Assuming Logto is running at 'http://localhost:3001',
# and we are also going to create an API resource named 'https://hasura.api' in the next few steps
HASURA_GRAPHQL_AUTH_HOOK=http://localhost:3001/api/authn/hasura?resource=https://hasura.api
```

> 💡 In case your Hasura instance operates within a docker container, accessing Logto via "localhost:3001" might not be feasible since it's located in another container. Normally, you can substitute 'localhost' with 'host.docker.internal', however, for detailed guidance, refer the [official Docker documentation](https://docs.docker.com/desktop/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host). 
>

### Self-host Logto instance on your own server:

- Prepare a PostgreSQL instance, and use Logto CLI to seed a database for Logto:

```bash
npx @logto/cli db seed
```

- Pull the Logto docker image:

```bash
# ghcr
docker pull ghcr.io/logto-io/logto
# DockerHub
docker pull svhd/logto
```

- Run docker container with the following environment variables

```bash
docker run \
--name logto \
-p 3001:3001 \
-p 3002:3002 \
-e TRUST_PROXY_HEADER=1 \
-e ENDPOINT=https://your-logto-domain-url \
-e DB_URL=postgres://username:password@your_postgres_url:port/db_name \
svhd/logto
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


### Create Role for Hasura

- In order to take advantage of Hasura's permission management, we are going to create roles in Logto, those roles will map to Hasura's roles.
    
    ![image](https://user-images.githubusercontent.com/5717882/226831392-f1e3e194-8c82-4435-b117-9fedfad3a05d.png)
    
    > 💡 The role name must equal to the role name in Hasura's "Premissions" page.


- Remember to assign the role to users.

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
