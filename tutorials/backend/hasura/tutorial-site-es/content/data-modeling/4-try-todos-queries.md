---
title: "Explore todos en la API de GraphQL"
metaTitle: "Explorar todos en la API de Graph de Hasura"
metaDescription: "Explore la API de GraphQL para la tabla todos donde las consultas, la mutación y las suscripciones son generadas automáticamente por Hasura GraphQL Engine"
---

Similar a la `users`tabla, la `todos`tabla creada en el paso anterior tendría una API GraphQL auto-generada para que exploremos.

Vamos a seguir y empezar a explorar la API de GraphQL para la `todos`tabla.

## Mutación

Dirígete a la pestaña de la consola -> API -> GraphiQL e inserte un todo usando las Mutaciones GraphQL.

```graphql
mutation {
  insert_todos(objects:[{title: "My First Todo", user_id: "1"}]) {
    affected_rows
  }
}
```

Haga clic en el `Play`botón de la interfaz de GraphiQL para ejecutar la consulta.

Deberías recibir una respuesta que se vea como esto:

![Todo Mutación](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-todo.png)

## Consulta

Ahora vamos a seguir adelante y consultar los datos que acabamos de insertar.

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

Deberías recibir una respuesta que se vea como esto:

![Todo Query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-todo.png)

Tenga en cuenta que algunas columnas les gustan `is_public`y `is_completed`tienen valores predeterminados, aunque no las insertó durante la mutación.

## Suscripción

Vamos a ejecutar una consulta de suscripción sobre la `todos`tabla para ver los cambios en la tabla. En la consulta de GraphQL anterior, reemplazar `query`con`subscription`

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

Inicialmente, la consulta de suscripción devolverá los resultados existentes en la respuesta.

Ahora insertamos nuevos datos en la tabla de todos y veremos los cambios que aparecen en la respuesta.

En una nueva pestaña, vaya a la pestaña -> `DATA`> pestaña -> todos -> Insertar fila e insertar otra fila.

![Insertar nuevo todo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todo-insert-new-row.png)

Y cambie a la `API`pestaña anterior y vea la respuesta de suscripción que devuelve 2 resultados.

![Suscripción Todo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-todo.png)
