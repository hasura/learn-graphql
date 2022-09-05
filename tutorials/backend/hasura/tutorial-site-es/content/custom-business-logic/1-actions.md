---
title: "Creación de acciones"
metaTitle: "Extensión de gráfico de Hasura con acciones | Tutorial de Hasura GraphQL"
metaDescription: "En esta parte, analizaremos cómo escribir una acción para extender el gráfico y hacer la lógica de negocios personalizada"
---

Tomemos el primer caso de uso de la búsqueda de la información del perfil de Auth0.

Lo ideal sería mantener un único punto de conexión de GraphQL para todos los requerimientos de datos.

Para manejar el caso de uso de la búsqueda de la información del perfil de Auth0, escribiremos una API de REST en un servidor de Node.js personalizado. Esto podría escribirse en cualquier idioma/marco, pero nos ceñiremos a Node.js para este ejemplo.

Hasura puede fusionar esta API de REST con el esquema de GraphQL autogenerado existente y el cliente podrá consultar todo utilizando el punto de conexión de GraphQL único.

## Creación de una acción {#creating-an-action}

En la Consola de Hasura, diríjase a la pestaña `Actions` y haga clic en `Create` para crear una nueva acción.

![Definición de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-definition.png)

### Definición de acción {#action-definition}

Necesitaremos definir nuestra acción y el tipo de acción. Puesto que solo estamos leyendo datos de una API, usaremos el tipo Consulta para esta acción. La definición tendrá el nombre de la acción (auth0 en este caso), los argumentos de entrada (ninguno en este caso) y el tipo de respuesta de la acción (en este caso `auth0_profile`).

```graphql
type Query {
  auth0 : auth0_profile
}
```

### Definición de tipos {#types-definition}

Definimos que el tipo de respuesta de la acción es `auth0_profile`. Entonces, ¿qué queremos como respuesta de la API de Auth0? Queremos los campos `id`, `email` y `picture`, que no están almacenados en nuestra base de datos hasta el momento.

```graphql
type auth0_profile {
  id : String
  email : String
  picture : String
}
```

Los tres campos son de tipo String. Tenga en cuenta que `auth0_profile` es un tipo de objeto que tiene 3 claves (id, correo electrónico e imagen) y estamos devolviendo este objeto en la respuesta.

Cambiaremos la URL del controlador más adelante, una vez que hayamos escrito la API de REST y la hayamos implementado en un punto de conexión público.

![Crear acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-action.png)

Haga clic en `Create` una vez que haya terminado de configurar los campos anteriores.

## Escriba una API de REST {#write-rest-api}

Ahora que se ha creado la acción, escribamos una API de REST en una aplicación Node.js Express que puede configurarse más adelante para esta acción.

Diríjase a la pestaña `Codegen` para comenzar rápidamente con el código reutilizable :)

Haga clic en `Try on Glitch` para implementar un servidor. Glitch es una plataforma para construir e implementar aplicaciones (Node.js) y es una manera rápida de probar e iterar el código en la nube.

![Codegen de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-codegen-tab.png)

Ahora reemplace el contenido de `src/server.js` por el siguiente:

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const getProfileInfo = (user_id) => {
    const headers = {'Authorization': 'Bearer '+process.env.AUTH0_MANAGEMENT_API_TOKEN};
    console.log(headers);
    return fetch('https://' + process.env.AUTH0_DOMAIN + '/api/v2/users/'+user_id,{ headers: headers})
        .then(response => response.json())
}

app.post('/auth0', async (req, res) => {

  // get request input
  const { session_variables } = req.body;

  const user_id = session_variables['x-hasura-user-id'];
  // make a rest api call to auth0
  return getProfileInfo(user_id).then( function(resp) {
    console.log(resp);
    if (!resp) {
      return res.status(400).json({
        message: "error happened"
      })
    }
    return res.json({
      email: resp.email,
      picture: resp.picture
    })
  });

});

app.listen(PORT);
```

En el servidor anterior, desglosemos lo que está sucediendo:

- Recibimos la carga `session_variables` como el cuerpo de la solicitud de la acción.
- Hacemos una solicitud a la [API de administración de Auth0](https://auth0.com/docs/api/management/v2/create-m2m-app), pasando la `user_id` para obtener detalles sobre este usuario.
- Una vez que obtengamos una respuesta de la API de Auth0 en el servidor, formamos el siguiente objeto `{email: resp.email, picture: resp.picture}` y lo enviamos de vuelta al cliente. Si no, devolvemos un caso de error.

En caso de haberse ceñido a código anterior, utilice el siguiente [servidor listo](https://glitch.com/~auth0-hasura-action) en Glitch para clonarlo.
También necesita volver a mezclar el proyecto de Glitch para comenzar a modificar cualquier código.

### variables del entorno {#environment-variables}

En el código de origen de la aplicación de Glitch, modifique el archivo `.env` para introducir los valores

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

adecuadamente. AUTH0_MANAGEMENT_API_TOKEN se puede obtener del proyecto Auth0.

![API de administración de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-management-api.png)

¡Felicidades! Ha escrito e implementado su primera acción de Hasura para extender el gráfico.

## Permiso {#permission}

Ahora, para consultar el nuevo tipo agregado, necesitamos dar permisos al rol `user` para este tipo de consulta. Diríjase a la pestaña `Permissions` de la acción recién creada y configure el acceso para el usuario de rol.

![Permiso de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-permission.png)

Muy bien, ahora ¿cómo consultamos esta API recientemente agregada?

Primero, necesitamos actualizar la URL de webhook para la acción. Copie la URL de la aplicación desplegada de Glitch y agréguela como controlador de webhook. No olvide agregar la ruta `/auth0` junto con la URL de la aplicación de Glitch.

![Controlador de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-handler-update.png)

Ahora, diríjase a GraphiQL y pruebe la siguiente consulta:

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

¿Recuerda el token de JWT que obtuvimos después de [configurar y probar Auth0](https://hasura.io/learn/graphql/hasura/authentication/5-test-with-headers/)? Aquí también necesita pasar el encabezado `Authorization` con el mismo token de JWT para obtener los datos adecuados.

En GraphiQL, desactive el encabezado `x-hasura-admin-secret`, cree uno nuevo llamado `Authorization` y péguelo en el valor `Bearer eyJhb.....`.

**Nota**: necesita pasar los valores de encabezado correctos. Puede pasar el encabezado de autorización con el token correcto y el servidor de Node.js recibirá el valor de `x-hasura-user-id` apropiado de las variables de sesión para que la API funcione como se esperaba.

¡Eso es todo! Ahora ha extendido la API de GraphQL integrada con el código personalizado.
