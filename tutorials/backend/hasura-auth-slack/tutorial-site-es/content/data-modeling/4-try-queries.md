---
title: "Prueba de las API de GraphQL"
metaTitle: "Prueba de las API de GraphQL | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Explore las API de GraphQL para los usuarios de la tabla donde las consultas, la mutación y las suscripciones las genera automáticamente el motor de GraphQL de Hasura"
---

Como sabe que Hasura le ofrece API de GraphQL instantáneas sobre [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/), puede probarse en [la tabla que acabamos de crear](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/).

Sigamos adelante y empecemos a explorar las API de GraphQL para la tabla `users`.

## Mutación {#mutation}

Diríjase a la pestaña Consola -> GRAPHIQL e inserte un usuario utilizando mutaciones de GraphQL.

```graphql
mutation {
  insert_users(objects:[{name:"Praveen", email: "myemail@example.com", password: "password123"}]) {
    affected_rows
  }
}
```

Haga clic en el botón `Play` en la interfaz de GraphiQL para ejecutar la consulta.

Debería obtener una respuesta parecida a esto:

```graphql
{
  "data": {
    "insert_users": {
      "affected_rows": 1
    }
  }
}
```

¡Genial! Ahora ha consumido la consulta de mutación para la tabla `users` que acaba de crear. Es fácil, ¿verdad?

**Consejo**: puede utilizar `Explorer` en la interfaz de GraphiQL para generar la mutación en unos pocos clics.

## Consulta {#query}

Ahora vamos a seguir y consultaremos los datos que acabamos de insertar.

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

Debería obtener una respuesta parecida a esto:

![Consulta de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-user.png)

Tenga en cuenta que algunas columnas como `created_at` tienen valores predeterminados, incluso aunque no las haya insertado durante la mutación.

## Suscripción {#subscription}

Ejecutemos una consulta de suscripción sobre la tabla `users` para ver los cambios en la tabla.

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

Al inicio, la consulta de suscripción devolverá los resultados existentes en la respuesta.

Ahora, insertaremos nuevos datos en la tabla de usuarios y veremos los cambios que aparecen en la respuesta.

En una pestaña nueva, diríjase a Consola -> pestaña DATOS -> usuarios -> Insertar fila e inserte otra fila.

Y cambie a la pestaña `GRAPHIQL` anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Suscripción de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

Una consulta de suscripción activa seguirá devolviendo el último conjunto de resultados según la consulta.
