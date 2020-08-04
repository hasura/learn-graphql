---
title: "Auth0 Setup"
metaTitle: "Auth0 Setup | Next.js GraphQL Serverless Tutorial"
metaDescription: "The Auth integration will be done with Auth0. In this step we will create a new application with Auth0, configure Hasura with JWT secret and create necessary rules in Auth0"
---

## Create Auth0 Application

1. Navigate to the [Auth0 Dashboard](https://manage.auth0.com/)
2. Signup / Login to the account
3. Create a new tenant.
4. Click on the `Applications` menu option on the left and then click the `+ Create Application` button.
5. In the Create Application window, set a name for your application and select `Regular Web Applications`, since we will be using Next.js SSR

![Create Auth0 App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

6. In the settings of the application, we will add appropriate (e.g: http://localhost:3000/callback) URLs as Allowed Callback URLs and Allowed Web Origins. We can also add domain specific URLs as well for the app to work. (e.g: https://myapp.com/callback). 

This would be the URL of the frontend app which you will deploy later. You can ignore this, for now. You can always come back later and add the necessary URLs.

## Create Auth0 API

We need to create an API on Auth0 so that we can make the accessToken a valid JWT.

![Create Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

Now in the pop-up that appears, give the name of the API and the identifier. We can technically give any value. 

Let's say the name is `hasura` and the identifier is `https://hasura.io/learn`.

![Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

We can let the signing algorithm to be as it is. (RS256)

Click on Create once you are done.

## Add Callback URL

We will need to add a callback URL to the Application Settings to be able to allow the Next.js API route to be called.

Add `http://localhost:3000/api/callback` to the list of Allowed Callback URLs.

![Add callback URL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-nextjs/add-callback-url.png).

Also make sure to add `http://localhost:3000` to the list of Allowed Logout URLs.
