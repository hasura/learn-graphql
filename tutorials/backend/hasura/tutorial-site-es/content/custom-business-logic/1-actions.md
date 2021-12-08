---
title: "Creación de acciones"
metaTitle: "Extender el gráfico de Hasura con acciones | Tutorial de Hasura"
metaDescription: "En esta parte, vamos a ver cómo escribir una acción para extender el gráfico y hacer la lógica de negocio personalizada"
---

Tomemos el primer caso de uso de la información de perfil de Auth0.

Idealmente, querría mantener un único punto final GraphQL para todos sus requisitos de datos.

Para manejar el caso de uso de la obtención de información de perfil Auth0, escribiremos una API REST en un servidor Node.js personalizado. Esto podría ser escrito en cualquier idioma/framework, pero nos estamos pegando a Node.js para este ejemplo.

Hasura puede fusionar esta API REST con el esquema gráfico generado automáticamente y el cliente podrá consultar todo con el único punto final GraphQL.

## Crear una acción

En la Consola de Hasura, dirígete a la `Actions`pestaña y haz clic en `Create`para crear una nueva acción.

![Definición de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-definition.png)

### Definición de acción

Necesitaremos definir nuestra acción y el tipo de acción. Dado que solo estamos leyendo datos de una API, usaremos el tipo de consulta para esta Acción. La definición tendrá el nombre de la acción (auth0 en este caso), argumentos de entrada (ninguno en este caso), y el tipo de respuesta de la acción `auth0_profile`(en este caso).

```graphql
type Query {
  auth0 : auth0_profile
}
```

### Definición de tipos

Definimos que el tipo de respuesta de la acción es `auth0_profile`. ¿Qué queremos a cambio de la API Auth0? `email`Queremos los `picture`campos `id`, y que no se almacenan en nuestra base de datos hasta ahora.

```graphql
type auth0_profile {
  id : String
  email : String
  picture : String
}
```

Los tres campos son de tipo String. Tenga en cuenta que `auth0_profile`es un tipo de objeto que tiene 3 claves (id, correo electrónico y imagen) y estamos devolviendo este objeto en nuestra respuesta.

Más tarde cambiaremos la URL de Handler una vez que escribamos nuestra API REST y la implementaremos en un punto final público.

![Crear Acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-action.png)

Haga clic en una `Create`vez que haya terminado de configurar los campos anteriores.

## Escribir una API REST

Ahora que se ha creado la acción, escribamos una API REST en una aplicación Node.js Express que más tarde se puede configurar para esta acción.

Dirígete a la `Codegen`pestaña para comenzar rápidamente con el código de la placa de caldera :)

Haga clic en `Try on Glitch`para desplegar un servidor. Glitch es una plataforma para crear e implementar aplicaciones (Node.js) y es una forma rápida de probar e iterar código en la nube.

![Codigo de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-codegen-tab.png)

`src/server.js`Ahora reemplaza el contenido de los siguientes elementos:

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

En el servidor anterior, desglosemos lo que está pasando:

- Recibimos la carga útil `session_variables`como el órgano de la solicitud de la Acción.
- Hacemos una solicitud a la [API de administración de Auth0](https://auth0.com/docs/api/management/v2/create-m2m-app), pasando en la `user_id`para obtener detalles sobre este usuario.
- Una vez que recibimos una respuesta de la API Auth0 en nuestro servidor, formamos el siguiente objeto `{email: resp.email, picture: resp.picture}`y lo enviamos de vuelta al cliente. Por otra parte, devolvemos un caso de error.

En caso de que esté pegado con el código anterior, utilice el siguiente [servidor listo](https://glitch.com/~auth0-hasura-action) en Glitch para clonarlo. También necesita remezclar el proyecto Glitch para comenzar a modificar cualquier código.

### Variables de medio ambiente

En el código fuente de la aplicación Glitch, modifique el `.env`archivo para ingresar

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

valores apropiadamente. El AUTH0_MANAGEMENT_API_TOKEN se puede obtener del proyecto Auth0.

![API de administración de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-management-api.png)

¡Felicidades! Has escrito y desplegado tu primera acción Hasura para extender el Gráfico.

## Permiso

Ahora para consultar el tipo de nueva agregación, necesitamos dar permisos al `user`rol de este tipo de consulta. Dirígete a la `Permissions`pestaña de la acción recién creada y configura el acceso para el usuario de la función.

![Permiso de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-permission.png)

Bien, ahora ¿cómo consultaremos esta nueva API añadida?

Primero, necesitamos actualizar la URL de webhook para la acción. Copie la URL de la aplicación desplegada desde Glitch y añádela como el controlador de webhook. `/auth0`No olvides añadir la ruta junto con la URL de la aplicación Glitch.

![Manejador de acción](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/action-handler-update.png)

Ahora dirígete a GraphiQL y prueba la siguiente consulta:

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

¿Recuerdas el token JWT que conseguimos después de [configurar Auth0 y probarlo](https://hasura.io/learn/graphql/hasura/authentication/5-test-with-headers/)? Aquí también es necesario pasar en el `Authorization`encabezado con el mismo token JWT para obtener los datos adecuados.

En GraphiQL, desmarca la `x-hasura-admin-secret`cabecera, crea una nueva llamada `Authorization`y péguelo en el valor.`Bearer eyJhb.....`

**Nota**: Debe pasar los valores de encabezado correctos. Puede pasar en el encabezado de Autorización con el token correcto y su servidor Node.js recibirá el `x-hasura-user-id`valor apropiado de las variables de sesión para que la API funcione como se esperaba.

¡Eso es! Ahora ha extendido la API integrada de GraphQL con su código personalizado.
