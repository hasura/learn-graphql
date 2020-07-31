---
title: "Next.js Boilerplate Setup"
metaTitle: "Next.js Boilerplate setup | Next.js GraphQL Serverless Tutorial"
metaDescription: "The GraphQL backend is already ready. The task is to convert the static UI into a working realtime app in Next.js"
---

For this tutorial, the GraphQL backend and the basic app UI is already ready.
Our task will be to convert the "static" UI into a working realtime app in Next.js

### Download and run the boilerplate

1. Download the boilerplate from https://hasura.io/learn/graphql/nextjs-fullstack-serverless/boilerplate.zip
2. Unzip and make sure you're in the `app-boilerplate` directory
3. Install dependencies and run the "static" app
    - `yarn install`
    - `yarn dev`

### Configure the environment variables

Copy the `.env.example` to `.env` and configure the values for Auth0.

The `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_SECRET` are available in your Auth0 application settings and `SESSION_COOKIE_SECRET` can be any random string of at least 32 characters and it is used to encrypt the cookie. Enter the Identifier found from your Auth0 API settings to `AUTH0_AUDIENCE`.

```
DOMAIN=http://localhost:3000
AUTH0_CLIENT_ID=
AUTH0_AUDIENCE=hasura
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
SESSION_COOKIE_SECRET=
```

This is what you should see after the steps above:

![Boilerplate after login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)
