---
title: "Setup Hasura JWT Parsing"
metaTitle: "Setup Hasura JWT Parsing | Remix Fullstack GraphQL Tutorial"
metaDescription: "For Hasura to read our JWT cookies we need to do some setup"
---

Usually with Firebase Auth and Hasura we can use the [standard JWK url as described here](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#firebase).

However, with Firebase Session cookies they need a different format which we'll have to add manually. Hopefully in the future this can improve.

1. In `login.tsx` add `console.log(cookie)` after `const cookie = await admin.auth().createSessionCookie(idToken, { expiresIn });` and go through the login process to get the cookie JWT token

1. Open [jwt.io](https://jwt.io/) and paste your JWT in.

1. In the decoded headers section, note the `kid:` property. Take the value of that, open [https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys](https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys), and find the public certificate that matches.

1. We now build our [Hasura JWT secret config](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#configuring-jwt-mode)

`{"type":"RS256", "key": "<Firebase public cert from previous step>", "audience": "<firebase project id>", "issuer": "https://session.firebase.google.com/<firebase project id>", "claims_map": {"x-hasura-allowed-roles": ["user"], "x-hasura-default-role": "user", "x-hasura-user-id": {"path":"$.sub"} }}`

By default, we assign a logged-in user the role of user using the [claims map feature](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#claims-map).

Save this config for an upcoming step.
