---
title: "Reglas para reclamos JWT personalizados"
metaTitle: "Reglas para las reclamaciones de JWT personalizadas | Tutorial de Hasura"
metaDescription: "Las reclamaciones personalizadas dentro de la JWT se utilizan para informar a Hasura sobre el papel del llamante, de modo que Hasura pueda hacer cumplir las reglas de autorización necesarias para decidir lo que el llamante puede y no puede hacer."
---

[Las reclamaciones personalizadas](https://auth0.com/docs/scopes/current/custom-claims) dentro del JWT se utilizan para informar a Hasura sobre el papel del llamante, de modo que Hasura pueda hacer cumplir las reglas de autorización necesarias para decidir lo que el llamante puede y no puede hacer. En el panel de control de Auth0, vaya a [Reglas](https://manage.auth0.com/#/rules).

Haga clic en el botón `+ Create Rule`. En la pantalla siguiente, seleccione la `Empty rule`plantilla.

Nombra la regla como `hasura-jwt-claims`.

Agrega el siguiente script a la regla.

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

![Regla de reclamos JWT personalizada](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/custom-jwt-claims-rule-accessToken.png)
