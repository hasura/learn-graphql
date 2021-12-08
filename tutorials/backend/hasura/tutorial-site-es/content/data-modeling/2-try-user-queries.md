---
title: "Explorar usuarios en la API de GraphQL"
metaTitle: Explorar usuarios en API  Tutorial de Hasura de la API de GraphQL"
metaDescription: "Explorar la API de GraphQL para la tabla de usuarios donde las consultas, la mutación y las suscripciones fueron generadas automáticamente por Hasura GraphQL Engine"
---

Hasura te ofrece API Instant GraphQL sobre [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/), entre otras bases de datos. Por lo tanto, se puede probar en [la mesa que acabamos](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/) de crear.

Vamos a seguir y empezar a explorar la API de GraphQL para la `users`tabla. Vamos a utilizar GraphiQL para explorar la API. GraphiQL es el entorno de desarrollo integrado GraphQL (IDE). Es una herramienta poderosa que utilizaremos para interactuar con la API.

Puede acceder a GraphiQL dirigiéndose a la pestaña Consola -> API -> GraphiQL.

## Mutación

Vamos a añadir un usuario usando una Mutación GraphQL. Copie el siguiente código en la interfaz de GraphiQL.

```graphql
mutation {
  insert_users(objects:[{id: "1", name:"Praveen"}]) {
    affected_rows
  }
}
```

Haga clic en el `Play`botón de la interfaz de GraphiQL para ejecutar la consulta.

Deberías recibir una respuesta que se vea como esto:

![Mutación de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-user.png)

¡Genial! Ahora has consumido la consulta de mutación para la `users`tabla que acabas de crear.

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

Inicialmente, la consulta de suscripción devolverá los resultados existentes en la respuesta.

Ahora insertamos nuevos datos en la `users`tabla y veremos los cambios que aparecen en la respuesta.

En una nueva pestaña del navegador, vaya a la pestaña Consola -> `DATA`pestaña -> predeterminado -> público -> usuarios -> Insertar fila e insertar otra fila.

![Insertar nuevo usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-insert-new-row.png)

Y cambie a la `GRAPHIQL`pestaña anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Suscripción de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

Una consulta de suscripción activa seguirá devolviendo el último conjunto de resultados dependiendo de la consulta.
