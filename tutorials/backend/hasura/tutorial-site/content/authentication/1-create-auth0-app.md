---
title: "Create Auth0 App"
metaTitle: "Create Auth0 App | Hasura GraphQL Tutorial"
metaDescription: "In this part, we will learn how to create an Auth0 app using the dashboard for a Single Page Web Application."
---

1. Navigate to the [Auth0 Dashboard](https://manage.auth0.com/)
2. Signup / Login to the account
3. Create a new tenant.
4. Click on the `Applications` menu option on the left and then click the `+ Create Application` button.
5. In the Create Application window, set a name for your application and select `Single Page Web Applications`. (Assuming the frontend app will be a SPA built on react/vue etc)

![Create Auth0 App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app-updated.png)

## Create Auth0 API {#create-auth0-api}

We need to create an API on Auth0 so that we can make the `accessToken` a valid JWT. Click on the `APIs` section on the left sidebar and click on the `+ Create API` button.

![Create Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create-updated.png)

Now in the pop-up that appears, give the name of the API and the identifier. We can technically give any value.

Let's say the name is `hasura` and the identifier is `https://hasura.io/learn`.

![Auth0 API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience-updated.png)

We can let the signing algorithm to be as it is. (RS256)

Click on Create once you are done.
