---
title: "Configurar todos permisos de tabla"
metaTitle: "Configuración de permisos de tabla | Tutorial de Hasura"
metaDescription: "Este tutorial cubre cómo configurar permisos para todos tabla para insertar, seleccionar, actualizar y eliminar operaciones usando la consola Hasura"
---

Dirígete a la pestaña Permisos debajo de la `todos`tabla para agregar permisos relevantes.

## Insertar permiso

Permitiremos que los usuarios de inicio de sesión creen una nueva entrada todo solo especifiquen las columnas is_public y title (título).

- En el cuadro de texto de la nueva función, escriba “usuario”
- Haga clic en el icono de edición (lápiz) para "insertar" permisos. Esto abriría una sección a continuación, que le permite configurar controles personalizados y permitir columnas.
- En la comprobación personalizada, elija la siguiente condición

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![Todos row permiso insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

`title`Ahora en permisos de inserción de columna, seleccione y `is_public`columnas.

![Todos insert column permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

Por último, en preajustes de columna, seleccione `user_id`desde el `from session variable`mapeo a .`X-HASURA-USER-ID`

**Nota:** Las variables de sesión son pares de valor clave devueltos del servicio de autenticación para cada solicitud. Cuando un usuario realiza una solicitud, el token de sesión se asigna a una `USER-ID`. `USER-ID`Esto se `USER-ID`puede usar con permiso para mostrar que los insertos en una tabla solo se permiten si la `user_id`columna tiene un valor igual al de la variable de sesión.

Haga clic en `Save Permissions`.

## Seleccionar permiso

Permitiremos que los usuarios vean una entrada todo si es pública o si son usuarios que han iniciado sesión.

Ahora haga clic en el icono de edición para "seleccionar" permisos. En la comprobación personalizada, elija la siguiente condición

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![Todos select permiso row](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

En la columna seleccione permisos, seleccione todas las columnas.

![Todos select column permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

Haga clic en`Save Permissions`

## Licencia de actualización

Solo permitiremos que la columna is_completed sea actualizada por un usuario.

Ahora haga clic en el icono de edición para "actualizar". En la verificación personalizada de pre-update elija `With same custom checks as insert`.

Y en permisos de actualización de columna, seleccione la `is_completed`columna.

![Todos update permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

Haga clic en una `Save Permissions`vez terminado.

## Eliminar permiso

Solo los usuarios registrados pueden eliminar una entrada de todo.

Por último, para eliminar permiso, en la verificación personalizada, elija `With same custom checks as insert, update`.

![Todos borrar permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

Haga clic en `Save Permissions`y se ha terminado con el control de acceso para la `todos`tabla.
