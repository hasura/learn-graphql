---
title: "Crear activador de eventos"
metaTitle: "Añadir el activador del evento | Hasura"
metaDescription: "En esta parte, veremos cómo agregar un activador de eventos en Hasura GraphQL Engine usando la consola"
---

Se pueden crear activadores de eventos usando la consola Hasura.

Abra la consola de Hasura, diríjase a la pestaña Eventos y haga clic en el botón Crear disparador para abrir la interfaz de abajo para crear un disparador de eventos:

## Añadir Activador de Evento

Dar un nombre para el activador del evento (diga send_email) y seleccionar la tabla `users`y seleccionar la operación .`insert`

Haga clic en `Create`.

![Crear disparador de eventos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-event-trigger.png)

## Pruébalo

Para probar esto, necesitamos insertar una nueva fila en la tabla de usuarios.

Dirígete a Consola -> Datos -> usuarios -> Insertar fila e insertar una nueva fila.

Ahora dirígete a la pestaña Eventos y haz clic en el `send_email`evento para ver los eventos procesados.

![Prueba de activación de eventos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/test-event-trigger.png)

Ahora, cada vez que se inserta una nueva fila en la `users`tabla - este evento sería invocado.
