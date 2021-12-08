---
title: "Crear Llave Extranjera"
metaTitle: "Crear una clave extranjera | tutorial de Hasura"
metaDescription: "Esta parte del tutorial cubre cómo crear una clave de la columna de tabla usando la consola Hasura"
---

En la `todos`tabla, el valor de la `user_id`columna debe estar idealmente presente en la `id`columna de la `users`tabla. De lo contrario, daría lugar a datos inconsistentes.

[Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) le permite definir la restricción de clave extranjera para hacer cumplir esta condición.

Definamos uno para la `user_id`columna en la `todos`tabla.

Dirígete a Consola -> DATA -> todos -> Modificar página.

Debe parecer algo como esto:

![Todos Modificar Página](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

Desplácese hacia abajo hasta la `Foreign Keys`sección en la parte inferior y haga clic en .`Add`

![user_id clave extranjera](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- Seleccione la tabla de referencia como`users`
- Elija la columna Desde como `user_id`y A la columna como`id`

Estamos haciendo cumplir que la columna user_id de todos tabla debe ser uno de los valores de id en la tabla usuarios.

Haga clic en `Save`para crear la clave extranjera.

¡Genial! Ahora usted ha asegurado la consistencia de los datos.
