---
title: "JWT Basics"
metaTitle: "JWT Basics | Hasura Authentication Tutorial"
metaDescription: "JWT or JSON Web Token is one of the standards to create data with payload that holds JSON that asserts the claims given. The tokens are also signed using a private secret or a public/private key."
---

## What is a JWT?

JWT or JSON Web Token is one of the standards to create data with payload that holds JSON that asserts the claims given. The tokens are also signed using a private secret or a public/private key.

For the purposes of auth, a JWT is a token that is issued by the server. The token has a JSON payload that contains information specific to the user. This token can be used by clients when talking to APIs (by sending it along as an HTTP header) so that the APIs can identify the user represented by the token, and take user specific action.

## Structure of JWT

Let's look at what a typical JWT looks like:

In its serialised form (base64), it might look something like:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlByYXZlZW4gRHVyYWlyYWp1IiwiaWF0IjoxNTE2MjM5MDIyfQ.5hffgKYLre_YU4Cdgv7FUo4-LKiKooGKf3QnOMbM2gs`

If you decode the base64, you'll get JSON in 3 important parts: header, payload and signature.

![Base64 Decoded JWT](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/decoded-jwt.png)

It has the header, which says what type of token is this, the payload which contains the actual data and claims and finally the signature to verify.

## JWT with Hasura

You can configure Hasura to use JWT authorization mode to authorize all incoming requests to the Hasura GraphQL engine server.

The idea is that your auth server will return JWT tokens, which are decoded and verified by the GraphQL engine, to authorize and get metadata about the request (x-hasura-* values).

The metadata about the request should have custom claims that can be read by Hasura.

Let's look at the following decoded token which contains the Hasura JWT Claims.

![JWT Decoded](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/jwt-decoded.png)

You can see that in the Payload, there's a custom claim under `https://hasura.io/jwt/claims` object containing metadata about the request.

Some of the values include:

- `x-hasura-default-role`
- `x-hasura-allowed-roles`
- `x-hasura-user-id`

And many more custom objects that user can configure. Anything that starts with `x-hasura-` prefix in this custom claim can be used in the permission layer of Hasura.

Read our [in-depth guide on JWT](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/) and its usage with Hasura / GraphQL.
