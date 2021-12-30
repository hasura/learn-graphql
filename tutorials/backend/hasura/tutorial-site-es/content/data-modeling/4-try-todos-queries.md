---
title: "Explorar las tareas pendientes en la API de GraphQL"
metaTitle: "Explorar las tareas pendientes en la API de GraphQL | Tutorial de GraphQL de Hasura"
metaDescription: "Explore la API de GraphQL para la tabla de tareas pendientes, donde el motor de GraphQL de Hasura genera automáticamente las consultas, las mutaciones y las suscripciones"
---

Similar a la tabla `users`, la tabla `todos` que se creó en el paso anterior tendría una API de GraphQL autogenerada para que la exploremos.

Sigamos adelante y empecemos a explorar la API de GraphQL para la tabla `todos`.

## Mutación  {#mutation}

Diríjase a la pestaña Console -> API -> pestaña GraphiQL e inserte una tarea pendiente utilizando las mutaciones de GraphQL.

```graphql
mutation {
  insert_todos(objects:[{title: "My First Todo", user_id: "1"}]) {
    affected_rows
  }
}
```

Haga clic en el botón `Play` en la interfaz de GraphiQL para ejecutar la consulta.

Debería obtener una respuesta parecida a esto:

![Mutación de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-todo.png)

## Consulta {#query}

Ahora vamos a seguir y consultaremos los datos que acabamos de insertar.

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

Debería obtener una respuesta parecida a esto:

![Consulta de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-todo.png)

Tenga en cuenta que algunas columnas como `is_public` y `is_completed` tienen valores predeterminados, incluso aunque no las haya insertado durante la mutación.

## Suscripción {#subscription}

Ejecutemos una consulta de suscripción sobre la tabla `todos` para ver los cambios en la tabla. En la consulta de GraphQL anterior, reemplace `query` por `subscription`

```graphql
subscription {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

Al inicio, la consulta de suscripción devolverá los resultados existentes en la respuesta.

Ahora, insertaremos nuevos datos en la tabla de tareas pendientes y veamos los cambios que aparecen en la respuesta.

En una nueva pestaña, diríjase a Console -> pestaña `DATA` -> todos -> Insert Row e inserte otra fila.

![Inserte nuevas tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todo-insert-new-row.png)

Y cambie a la pestaña `API` anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Suscripción de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-todo.png)
