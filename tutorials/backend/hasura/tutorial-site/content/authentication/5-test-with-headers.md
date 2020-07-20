---
title: "Test with Auth0 Token"
metaTitle: "Test Auth0 JWT Token | Hasura GraphQL Tutorial"
metaDescription: "In this part, you will learn to test the Auth0 setup with Hasura by getting the token from Auth0 and making GraphQL queries with the Authorization headers"
---



Hasura is configured to be used with Auth0. Now let's test this setup by getting the token from Auth0 and making GraphQL queries with the Authorization headers to see if the permissions are applied.

To get a JWT token for testing,

1. Copy this URL - `https://auth0-domain.auth0.com/login?client=client_id&protocol=oauth2&response_type=token%20id_token&redirect_uri=callback_uri&scope=openid%20profile` and update the URL as given below:

- Replace auth0-domain with the one we created in the previous steps.
- Replace client_id with Auth0 application's client_id.
- Replace callback_uri with `http://localhost:3000/callback` for testing. You don't need anything to run on localhost:3000 for this to work.

Make sure http://localhost:3000/callback has been added under Allowed Callback URLs in the Auth0 app settings.

2. Now try entering the updated URL in the browser. It should take you to the Auth0 login screen.

**Note**: In case logging in gives an error mentioning OIDC-conformant clients, try disabling OIDC Conformant setting (https://auth0.com/docs/api-auth/tutorials/adoption/oidc-conformant) under Advanced Settings -> OAuth.

2. After successfully logging in, you will be redirected to https://localhost:3000/callback#xxxxxxxx&id_token=yyyyyyy. This page will be a 404, unless you are running some other server on that port locally.

3. We care only about the URL parameters. Extract the `id_token` value from this URL. This is the JWT.

![jwt-token-auth0-url](https://graphql-engine-cdn.hasura.io/img/id_token-jwt-url.png)

4. Test this JWT in [jwt.io](https://jwt.io) debugger.

The debugger should give you the decoded payload that contains the JWT claims that have been configured for Hasura under the key `https://hasura.io/jwt/claims`. Now inside this object, the role information will be available under `x-hasura-role` key and the user-id information will be available under `x-hasura-user-id` key.



