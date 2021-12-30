---
title: "Agregar esquema remoto"
metaTitle: "Agregar esquema remoto | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, analizaremos cómo agregar un esquema remoto en el motor de GraphQL de Hasura utilizando la consola"
---

Hemos escrito las resoluciones personalizadas y las desplegamos en Glitch. Tenemos el punto de conexión de GraphQL listo. Vamos a agregarlo a Hasura como esquema remoto.

## Agregue {#add}

Diríjase a la pestaña `Remote Schemas` de la consola y haga clic en el botón `Add`.

![Agregue el esquema remoto](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-remote-schema.png)

Ponga un nombre para el esquema remoto (digamos auth0). Debajo de la URL del servidor de GraphQL, introduzca la URL de la aplicación de glitch que acaba de desplegar en el paso anterior.

Seleccione `Forward all headers from the client` y haga clic en `Add Remote Schema`.

## Pruébelo {#try-it-out}

Diríjase a la pestaña GraphiQL de la consola y explore la siguiente consulta de GraphQL.

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

¿Recuerda el token de JWT que obtuvimos después de configurar y probar Auth0? Aquí también necesita pasar el encabezado `Authorization` con el mismo token de JWT para obtener los datos adecuados.

![Consulta de esquema remoto](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/query-remote-schema.png)

Como puede ver, Hasura ha fusionado el esquema de GraphQL personalizado con las API autogeneradas ya existentes en [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/).
