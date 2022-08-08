---
title: "Explorar los usuarios en la API de GraphQL"
metaTitle: Explorar los usuarios en la API de GraphQL | Tutorial de GraphQL de Hasura
metaDescription: "Explore la API de GraphQL para la tabla de usuarios donde el motor de GraphQL de Hasura generó automáticamente las consultas, las mutaciones y las suscripciones"
---

Hasura le ofrece API de GraphQL instantáneas sobre [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/), entre otras bases de datos. Por lo tanto, puede probarse en [la tabla que acabamos de crear](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/).

Sigamos adelante y empecemos a explorar la API de GraphQL para la tabla `users`. Vamos a utilizar GraphiQL para explorar la API. GraphiQL es el entorno de desarrollo integrado de GraphQL (IDE, por sus siglas en inglés). Es una herramienta potente que utilizaremos para interactuar con la API.

Puede acceder a GraphiQL si se dirige a Console -> API -> pestaña GraphiQL.

## Mutación  {#mutation}

Agregemos un usuario utilizando una mutación de GraphQL. Copie el siguiente código en la interfaz de GraphiQL.

```graphql
mutation {
  insert_users(objects:[{id: "1", name:"Praveen"}]) {
    affected_rows
  }
}
```

Haga clic en el botón `Play` en la interfaz de GraphiQL para ejecutar la consulta.

Debería obtener una respuesta parecida a esto:

![Mutación del usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-user.png)

¡Genial! Ahora ha consumido la consulta de mutación para la tabla `users` que acaba de crear.

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

## Subscripción {#subscription}

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

Ahora insertemos nuevos datos en la tabla `users` y veremos los cambios que aparecen en la respuesta.

En una nueva pestaña del navegador, diríjase a Console -> pestaña `DATA` -> default -> public -> users -> Insert Row e inserte otra fila.

![Inserte un nuevo usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-insert-new-row.png)

Y cambie a la pestaña `GRAPHIQL` anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Subscripción de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

Una consulta de suscripción activa seguirá devolviendo el último conjunto de resultados según la consulta.
