---
title: "Configuración de los permisos de la tabla de usuarios"
metaTitle: "Configuración de los permisos de la tabla de usuarios | Tutorial de GraphQL de Hasura"
metaDescription: "Este tutorial cubre cómo configurar los permisos para la tabla de usuarios para insertar, seleccionar, actualizar y eliminar las operaciones mediante la consola de Hasura"
---

También necesitamos permitir las operaciones de selección y actualización en la tabla `users`.
 En la barra lateral izquierda, haga clic en la tabla `users` para navegar hasta la página de la tabla de usuarios y cambie a la pestaña Permissions.

## Seleccione el permiso {#select-permission}

Haga clic en el icono de edición (icono de lápiz) para modificar el permiso de selección para el usuario de rol. Esto abriría abajo una sección que le permite configurar sus permisos.

Aquí cada usuario debería poder acceder a los datos de `id` y `name` de los demás usuarios.

![Permiso de selección de los usuarios](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

Haga clic en `Save Permissions`

## Permiso de actualización {#update-permission}

El usuario que esté registrado debería poder modificar solo su propio registro. Así que vamos a establecer ese permiso ahora.

En el permiso de actualización de la fila, debajo de custom check, elija la siguiente condición.

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

En Column update permissions, seleccione la columna `last_seen`, ya que esto se actualizará desde la aplicación de frontend.

![Permiso de actualización de los usuarios](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-update-permission.png)

Haga clic en `Save Permissions` y con eso termina con las reglas de control de acceso para la tabla `users`.



