---
title: "Rules for Custom JWT Claims"
metaTitle: "Rules for Custom JWT Claims | Hasura GraphQL Tutorial"
metaDescription: "Custom Claims inside the JWT are used to tell Hasura about the role of the caller, so that Hasura may enforce the necessary authorization rules to decide what the caller can and cannot do."
---

[Custom claims](https://auth0.com/docs/scopes/current/custom-claims) inside the JWT are used to tell Hasura about the role of the caller, so that Hasura may enforce the necessary authorization rules to decide what the caller can and cannot do.
In the Auth0 dashboard, click on the `Auth Pipeline` menu option on the left and then click the `Rules` link (or follow this [direct link](https://manage.auth0.com/#/rules)). 

Click on the `+ Create Rule` button. In the next screen, select the `Empty rule` template.

Name the rule as `hasura-jwt-claims`.

Add the following script to the rule.

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

![Custom JWT Claims Rule](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule-accessToken-updated.png)

After adding the script, click on the "SAVE CHANGES" button.
