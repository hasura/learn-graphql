---
title: "Configurar permisos de tabla de usuarios"
metaTitle: "Configuración de usuarios permisos de tabla | Tutorial de Hasura"
metaDescription: "Este tutorial cubre cómo configurar permisos para la tabla de usuarios para insertar, seleccionar, actualizar y eliminar operaciones mediante la consola de Hasura"
---

También necesitamos permitir seleccionar y actualizar las operaciones en la `users`tabla. En la barra lateral izquierda, haga clic en la `users`tabla para navegar a la página de la tabla de usuarios y cambie a la pestaña Permisos.

## Seleccionar permiso

Haga clic en el icono Editar (icono de lápiz) para modificar el permiso seleccionado para el usuario de papel. Esto abriría una sección a continuación que le permite configurar sus permisos.

Aquí los usuarios deben poder acceder a todos los datos `id`y los demás `name`usuarios.

![usuarios seleccionar permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

Haga clic en`Save Permissions`

## Licencia de actualización

El usuario que haya iniciado sesión debe poder modificar solo su propio registro. Así que vamos a establecer ese permiso ahora.

En el permiso de actualización de fila en la verificación personalizada, elija la siguiente condición.

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

En permisos de actualización de columna, seleccione `last_seen`columna, ya que se actualizará desde la aplicación frontend.

![usuarios actualización de permiso](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-update-permission.png)

Haga clic en `Save Permissions`y se terminan con las reglas de control de acceso para la `users`tabla.



