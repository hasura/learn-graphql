---
title: "Crear una clave extranjera"
metaTitle: "Crear una clave extranjera | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo crear la clave extranjera para una columna de la tabla utilizando la consola de Hasura"
---

En la tabla `todos`, el valor de la columna `user_id` debe estar presente idealmente en la columna `id` de la tabla `users`. De lo contrario, daría como resultado datos inconsistentes.

[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) le permite definir la restricción de clave extranjera para hacer cumplir esta condición.

Definamos una para la columna `user_id` en la tabla `todos`.

Diríjase a Console -> DATA -> todos -> página Modify

Debería parecerse a esto:

![Página Todos Modify](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

Desplácese hasta la sección `Foreign Keys` en la parte inferior y haga clic en `Add`.

![Clave extranjera de user_id](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- Seleccione como tabla de referencia `users`
- Elija la columna From como `user_id` y To Column como `id`

Estamos haciendo cumplir que la columna user_id de la tabla de tareas pendientes deba ser uno de los valores de ID en la tabla de usuarios.

Haga clic en `Save` para crear la clave extranjera.

¡Genial! Ahora ya aseguró la consistencia de los datos.
