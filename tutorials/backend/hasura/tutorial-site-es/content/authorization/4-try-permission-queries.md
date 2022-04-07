---
title: "Prueba de los permisos"
metaTitle: "Prueba de los permisos | Tutorial de GraphQL de Hasura"
metaDescription: "Explore los permisos para la API de GraphQL para la tabla de tareas pendientes y vea cómo está restringido el acceso a los datos"
---

Sigamos adelante y empecemos a probar los permisos a través de la API de GraphQL para la tabla `todos`.

## Consulta {#query}

Ahora vamos a seguir y consultar los datos agregando dos encabezados de solicitud:

- `x-hasura-role`: `user`
- `x-hasura-user-id`: `1`

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

![Consulta de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-permission-testing.png)

Tenga en cuenta que la respuesta recibida se filtra para el ID de usuario `1`. Si cambia el valor de `x-hasura-user-id` a `2`, se devolverían los datos solo para el ID de usuario `2`. Esto confirma los permisos que configuramos en los pasos anteriores.

También puede probar la configuración de permiso de forma similar para la tabla `users`.
