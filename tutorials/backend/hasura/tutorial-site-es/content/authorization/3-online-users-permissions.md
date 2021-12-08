---
title: "Configurar online_users ver permisos"
metaTitle: "Configuración online_users ver permisos | Tutorial de Hasura"
metaDescription: "Este tutorial cubre cómo configurar permisos para la vista de usuarios online_users para una operación seleccionada usando la consola Hasura"
---

Dirígete a la pestaña Permisos bajo la `online_users`vista para agregar permisos relevantes.

## Seleccionar permiso

En esta vista solo queremos que el usuario pueda seleccionar datos y no hacer ninguna mutación. Por lo tanto, no definimos ningún permiso para insertar, actualizar o eliminar.

Para el permiso de selección de fila , elija `Without any checks`y en la columna de permiso seleccione, elija ambas columnas `id`y .`last_seen`

![permiso de usuarios en línea](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

Haga clic en `Save Permissions`. Ha completado todas las reglas de control de acceso requeridas para la aplicación de todo en tiempo real.
