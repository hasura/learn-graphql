---
title: "Sincronización de los usuarios con reglas"
metaTitle: "Sincronización de los usuarios de Auth0 con reglas | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, aprenderá a configurar una regla en Auth0 que permita a los usuarios de Auth0 estar en sincronización con los usuarios de nuestra base de datos"
---

Auth0 cuenta con reglas que pueden configurarse para que las llamen en cada solicitud de inicio de sesión. Si recuerda el segundo paso de la configuración de Auth0, ya creamos una regla para aplicar los reclamos de JWT personalizados. Ahora necesitamos configurar una regla en Auth0 que permita a los usuarios de Auth0 estar en sincronización con los usuarios de nuestra base de datos. El siguiente fragmento de código nos permite hacer lo mismo. Una vez más, utilizando la característica de reglas, cree una nueva regla vacía y péguele el siguiente fragmento de código:

```javascript
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;

  const admin_secret = "xxxx";
  const url = "https://ready-panda-91.hasura.app/v1/graphql";
  const query = `mutation($userId: String!, $nickname: String) {
    insert_users(objects: [{
      id: $userId, name: $nickname, last_seen: "now()"
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`;

  const variables = { "userId": userId, "nickname": nickname };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

![Regla de inserción de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-sync-rule.png)

**Nota**: modifique los parámetros `x-hasura-admin-secret` y `url` correctamente de acuerdo con la aplicación. Aquí estamos haciendo una solicitud para hacer una mutación en la tabla `users`.

¡Eso es todo! Ahora esta regla se desencadenará en cada registro o inicio de sesión correctos, e insertamos o actualizamos los datos de usuario en nuestra base de datos mediante una mutación de GraphQL de Hasura.

La solicitud anterior realiza una mutación en la tabla de usuarios con los valores `id` y `name`.
