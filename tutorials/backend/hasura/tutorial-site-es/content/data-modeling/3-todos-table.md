---
title: "Crear la tabla de tareas pendientes"
metaTitle: "Crear la tabla de tareas pendientes | Tutorial de GraphQL de Hasura"
metaDescription: "Creemos la tabla de tareas pendientes con la consola de Hasura yendo a la pestaña Data y haciendo clic en la tabla Create"
---

Ahora vamos a pasar a crear el otro modelo: `todos`

La tabla `todos` tendrá las siguientes columnas:

- `id` (tipo entero (incremento automático)),
- `title` (tipo texto),
- `is_completed` (tipo booleano y por defecto falso)
- `is_public` (tipo booleano y por defecto falso)
- `created_at`  (tipo marca de tiempo y now() como valor predeterminado)
- `user_id` (tipo texto)

Las columnas están asociadas con las propiedades de los elementos de tareas pendientes.

Recuerde establecer la columna de ID a la clave principal.

En la consola de Hasura, diríjase a la sección de la pestaña `DATA` y haga clic en `Create Table`. Ingrese los valores para crear la tabla como se mencionó anteriormente.

![Cree usuarios de la tabla](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

Una vez que haya terminado, haga clic en el botón `Add Table` para crear la tabla.
