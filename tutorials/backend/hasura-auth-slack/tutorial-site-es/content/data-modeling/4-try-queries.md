---
title: "Pruebe las API de GraphQL"
metaTitle: "Prueba las API de Graph Hasura Tutorial de la cartulina de la autora"
metaDescription: "Explorar las API de GraphQL para los usuarios de la tabla donde las consultas, la mutación y las suscripciones son generadas automáticamente por Hasura GraphQL Engine"
---

Como usted es consciente de que Hasura le da API Instant GraphQL sobre [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/), se puede probar en [la tabla que acabamos](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/) de crear.

Vamos a seguir y empezar a explorar las API de GraphQL para la `users`tabla.

## Mutación

Dirígete a la pestaña de Consola -> GRAPHIQL e inserte un usuario usando GraphQL Mutations.

```graphql
mutation {
  insert_users(objects:[{name:"Praveen", email: "myemail@example.com", password: "password123"}]) {
    affected_rows
  }
}
```

Haga clic en el `Play`botón de la interfaz de GraphiQL para ejecutar la consulta.

Deberías recibir una respuesta que se vea como esto:

```graphql
{
  "data": {
    "insert_users": {
      "affected_rows": 1
    }
  }
}
```

¡Genial! Ahora has consumido la consulta de mutación para la `users`tabla que acabas de crear. ¿Es fácil?

**Consejo**: Puede usar la interfaz `Explorer`de GraphiQL para generar la mutación en unos pocos clics.

## Consulta

Ahora vamos a seguir adelante y consultar los datos que acabamos de insertar.

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

Deberías recibir una respuesta que se vea como esto:

![Consulta de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-user.png)

Tenga en cuenta que algunas columnas como `created_at`tienen valores predeterminados, aunque no las insertó durante la mutación.

## Suscripción

Vamos a ejecutar una consulta de suscripción sobre la `users`tabla para ver los cambios en la tabla.

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

Inicialmente la consulta de suscripción devolverá los resultados existentes en la respuesta.

Ahora insertamos nuevos datos en la tabla de usuarios y veremos los cambios que aparecen en la respuesta.

En una nueva pestaña, vaya a la pestaña de datos -> usuarios -> Insertar fila e insertar otra fila.

Y cambie a la `GRAPHIQL`pestaña anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Suscripción de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

Una consulta de suscripción activa seguirá devolviendo el último conjunto de resultados dependiendo de la consulta.
