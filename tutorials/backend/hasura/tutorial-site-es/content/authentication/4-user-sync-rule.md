---
title: "Sincronizar usuarios con reglas"
metaTitle: "Sincronizar usuarios con reglas | Tutorial de Hasura"
metaDescription: "En esta parte, aprenderás a configurar una regla en Auth0 que permite a los usuarios de Auth0 sincronizar con los usuarios de nuestra base de datos"
---

Auth0 tiene reglas que se pueden configurar para ser llamadas en cada solicitud de inicio de sesión. Si recuerda el segundo paso de la configuración de Auth0, habíamos creado una regla para aplicar las reclamaciones JWT personalizadas antes. Ahora necesitamos configurar una regla en Auth0 que permita a los usuarios de Auth0 sincronizar con los usuarios de nuestra base de datos. El siguiente fragmento de código nos permite hacer lo mismo. Una vez más, con la función Reglas, cree una nueva regla vacía y péguelo en el siguiente fragmento de código:

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

![Regla de inserción Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-sync-rule.png)

**Nota**: Modificar `x-hasura-admin-secret`y `url`parámetros apropiadamente según su aplicación. Aquí estamos haciendo una solicitud para hacer una mutación en la `users`tabla.

¡Eso es todo! Esta regla se activará ahora en cada registro o inicio de sesión exitoso, e insertamos o actualizamos los datos de usuario en nuestra base de datos mediante una mutación Hasura GraphQL.

La solicitud anterior realiza una mutación en la tabla de usuarios con los valores `id`y los `name`valores.
