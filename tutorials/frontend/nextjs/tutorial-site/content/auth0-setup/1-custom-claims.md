---
title: "Custom Claims in Auth0 Rules"
metaTitle: "Custom Claims in Auth0 Rules | Next.js GraphQL Serverless Tutorial"
metaDescription: "In this step we will configure Auth0 rules to specify Hasura specific custom claims."
---

## Custom Claims

[Custom claims](https://auth0.com/docs/scopes/current/custom-claims) inside the JWT are used to tell Hasura about the role of the caller, so that Hasura may enforce the necessary authorization rules to decide what the caller can and cannot do.
In the Auth0 dashboard, navigate to [Rules](https://manage.auth0.com/#/rules). 

Add the following rule to add our custom JWT claims under `hasura-jwt-claim`:

```javascript
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.accessToken[namespace] = 
    { 
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

![Custom JWT Claims Rule](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-rules-access-token.png)