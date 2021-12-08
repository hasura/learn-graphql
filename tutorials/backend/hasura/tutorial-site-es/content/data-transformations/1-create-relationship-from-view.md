---
title: "Crear relación con el usuario"
metaTitle: "Crear relación manual desde Ver | Tutorial de Hasura"
metaDescription: "En esta parte, aprendemos cómo crear una relación manual desde la vista a la tabla usando la Consola Hasura"
---

Ahora que se ha creado la vista, necesitamos una manera de obtener información del usuario basada en la `id`columna de la vista. `id column`Vamos a crear una relación manual desde la vista `online_users`a la tabla `users`usando la vista.

Dirígete a la Consola -> Datos -> online_users -> Página de relaciones.

Añadir una nueva relación manualmente eligiendo el tipo de relación para `Object Relationship`ser. Introduzca el nombre de la relación como `user`. Seleccione la configuración de la columna actual como `id`y la tabla remota sería `users`y la columna remota volvería a `id`estar.

Estamos asignando la columna de identificación de la vista actual a la columna de identificación de los usuarios para crear la relación.

![crear relación desde la vista](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

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

¡Genial! Hemos terminado completamente con el modelado de datos para la aplicación.
