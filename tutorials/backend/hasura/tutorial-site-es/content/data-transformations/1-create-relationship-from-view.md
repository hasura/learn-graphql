---
title: "Crear una relación con el usuario"
metaTitle: "Crear relaciones manuales desde la vista | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, aprendemos a crear una relación manual desde la vista a la tabla utilizando la consola de Hasura"
---

Ahora que se cerró la vista, necesitamos una manera de poder buscar la información de usuario según la columna `id` de la vista. Cree una relación manual desde la vista `online_users` a la tabla `users` mediante `id column` de la vista.

Diríjase a Console -> Datos -> online_users -> página Relationships.

Agregue una nueva relación manualmente mediante la elección del tipo de relación para que sea `Object Relationship`. Ingrese el nombre de la relación como `user`. Seleccione la configuración para la columna actual como `id` y la tabla remota sería `users` y la columna remota sería `id` nuevamente.

Estamos asignando la columna de ID de la vista actual a la columna de ID de la tabla de usuarios para crear la relación.

![cree relaciones desde la vista](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

Exploremos las API de GraphQL para la relación creada.

```graphql
query {
  online_users {
    id
    last_seen
    user {
      id
      name
    }
  }
}
```

¡Genial! Terminamos completamente con el modelado de datos para la aplicación.
