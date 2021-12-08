---
title: "Añadir Esquema Remoto"
metaTitle: "Añadir un esquema remoto | Tutorial de Hasura"
metaDescription: "En esta parte, veremos cómo agregar un esquema remoto en Hasura GraphQL Engine usando la consola"
---

Hemos escrito el resolver, y lo hemos implementado en Glitch. Tenemos el punto final de GraphQL listo. Vamos a añadirlo a Hasura como un esquema remoto.

## Añadir

Dirígete a la `Remote Schemas`pestaña de la consola y haz clic en el `Add`botón.

![Añadir esquema remoto](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-remote-schema.png)

Dar un nombre para el esquema remoto (digamos auth0). En la URL de GraphQL Server, ingrese la URL de la aplicación glitch que acaba de implementar en el paso anterior.

Seleccione `Forward all headers from the client`y haga clic en .`Add Remote Schema`

## Pruébalo

Dirígete a la pestaña Console GraphiQL y explore la siguiente consulta de GraphQL.

```graphql
query {
  auth0 {
    email
    picture
  }
}
```

¿Recuerdas el token JWT que conseguimos después de configurar Auth0 y probarlo? Aquí también es necesario pasar en el `Authorization`encabezado con el mismo token JWT para obtener los datos adecuados.

![Consulta de esquemas remotas](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/query-remote-schema.png)

Como puede ver, Hasura ha fusionado el esquema personalizado GraphQL con las API auto-generadas ya existentes sobre [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/).
