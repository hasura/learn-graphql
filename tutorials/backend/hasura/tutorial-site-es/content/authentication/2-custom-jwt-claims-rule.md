---
title: "Reglas para los reclamos JWT personalizados"
metaTitle: "Reglas para los reclamos JWT personalizados | Tutorial de GraphQL de Hasura"
metaDescription: "Los reclamos personalizados dentro de JWT se utilizan para informar a Hasura sobre el rol del autor de la llamada, de modo que Hasura pueda hacer cumplir las reglas de autorización necesarias para decidir qué puede y no puede hacer el autor de la llamada."
---

[Los reclamos personalizados](https://auth0.com/docs/scopes/current/custom-claims) dentro de los JWT se utilizan para informar a Hasura sobre el rol del autor de la llamada para que Hasura pueda hacer cumplir las reglas de autorización necesarias para decidir qué puede y no puede hacer el autor de la llamada. En el panel de Auth0, desplácese a [Rules](https://manage.auth0.com/#/rules).

Haga clic en el botón `+ Create Rule`. En la siguiente pantalla, seleccione la plantilla `Empty rule`.

Nombre la regla como `hasura-jwt-claims`.

Agregue la siguiente secuencia de comandos a la regla.

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

![Regla de reclamos de JWT personalizados](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule-accessToken.png)
