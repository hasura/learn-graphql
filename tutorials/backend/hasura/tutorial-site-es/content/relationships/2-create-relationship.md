---
title: "Crear relaciones"
metaTitle: "Crear relaciones | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo crear una relación entre dos tablas utilizando la consola de Hasura"
---

Ahora que se ha creado la restricción de clave extranjera, la consola de Hasura sugiere automáticamente relaciones según eso.

Diríjase a la pestaña `Relationships` en la tabla `todos` y debería ver una relación sugerida como a continuación:

![Página de relaciones de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-page.png)

Haga clic en `Add` en la relación de objetos sugeridos.

Ingrese el nombre de la relación como `user` (ya completado) y haga clic en `Save`.

![Relaciones de objetos de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-user.png)

Ahora se ha establecido una relación entre la tabla de usuarios y tareas pendientes.
