---
title: "Configuración de los permisos de vista de online_users"
metaTitle: "Configuración de los permisos de vista de online_users | Tutorial de GraphQL de Hasura"
metaDescription: "Este tutorial cubre cómo configurar los permisos para la vista de online_users para la operación seleccionada utilizando la consola de Hasura"
---

Diríjase a la pestaña Permissions en la vista `online_users` para agregar los permisos pertinentes.

## Seleccione el permiso {#select-permission}

Aquí en esta vista solo queremos que el usuario pueda seleccionar los datos y que no haga ninguna mutación. Por lo tanto, no definimos ningún permiso para insertar, actualizar ni eliminar.

Para el permiso de selección de Row, elija `Without any checks` y en Column select permission, elija las columnas `id` y `last_seen`.

![Permiso de los usuarios en línea](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

Haga clic en `Save Permissions`. Ha completado todas las reglas de control de acceso necesarias para la aplicación de tareas pendientes en tiempo real.
