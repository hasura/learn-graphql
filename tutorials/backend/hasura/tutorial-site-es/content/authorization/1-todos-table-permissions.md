---
title: "Configuración de los permisos de la tabla de tareas pendientes"
metaTitle: "Configuración de los permisos de la tabla de tareas pendientes | Tutorial de GraphQL de Hasura"
metaDescription: "Este tutorial trata sobre cómo configurar los permisos de la tabla de tareas pendientes para insertar, seleccionar, actualizar y eliminar las operaciones mediante el uso de la consola de Hasura"
---

Diríjase a la pestaña Permissions en la tabla `todos` para agregar los permisos pertinentes.

## Insertar el permiso {#insert-permission}

Daremos permiso a los usuarios registrados, mediante la creación de una nueva entrada de tarea pendiente, para especificar solo las columnas is_public y title.

- En el cuadro de texto Enter new role, escriba «user»
- Haga clic en el icono de editar (lápiz) para ver los permisos de «insert». Esto abriría abajo una sección que le permite configurar las comprobaciones personalizadas y permitir las columnas.
- En custom check, elija la siguiente condición

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![Inserción del permiso de la fila de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

Ahora, en Column insert permissions, seleccione las columnas `is_public` y `title`.

![Permiso de la columna para insertar tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

Finalmente, en Column presets, seleccione `user_id` desde `from session variable` asignando a `X-HASURA-USER-ID`.

**Nota:** las variables de sesión son pares clave-valor devueltos por el servicio de autenticación para cada solicitud. Cuando un usuario hace una solicitud, el token de la sesión se asigna a una `USER-ID`. Esta `USER-ID` puede utilizarse en el permiso para mostrar que las inserciones en una tabla solo se permiten si la columna `user_id` tiene un valor igual al de `USER-ID`, la variable de la sesión.

Haga clic en `Save Permissions`.

## Seleccione el permiso {#select-permission}

Permitiremos a los usuarios ver una entrada de tareas pendientes si es pública o si son usuarios registrados.

Ahora, haga clic en el icono de editar para ver los permisos «select». En custom check, elija la siguiente condición

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![Fila de permiso de selección de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

En Column select permissions, seleccione todas las columnas.

![Permiso de la columna de selección de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

Haga clic en `Save Permissions`

## Permiso de actualización {#update-permission}

Permitiremos que un usuario actualice solo la columna is_completed.

Ahora, haga clic en el icono de edición para ver los permisos de «update». En custom check de pre-update elija `With same custom checks as insert`.

Y en Column update permissions, seleccione la columna `is_completed`.

![Permiso de actualización de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

Haga clic en `Save Permissions` cuando haya terminado.

## Eliminación del permiso {#delete-permission}

Solo los usuarios registrados pueden eliminar una entrada de tarea pendiente.

Finalmente, para eliminar el permiso, debajo de custom check, elija `With same custom checks as insert, update`.

![Permiso de eliminación de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

Haga clic en `Save Permissions` y ya ha finalizado con el control de acceso para la tabla `todos`.
