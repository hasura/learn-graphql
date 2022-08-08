---
title: "Crear el desencadenador de eventos"
metaTitle: "Agregar el desencadenador de eventos | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, analizaremos cómo agregar un desencadenador de eventos en el motor de GraphQL de Hasura utilizando la consola"
---

Pueden crearse desencadenadores de eventos utilizando la consola de Hasura.

Abra la consola de Hasura, diríjase a la pestaña Events y haga clic en el botón Create trigger para abrir la interfaz a continuación para crear un desencadenador de eventos:

## Agregue el desencadenador de eventos {#add-event-trigger}

Dé un nombre para el desencadenador de eventos (digamos send_email) y seleccione la tabla `users`, y la operación `insert`.

Haga clic en `Create`.

![Cree el desencadenador de eventos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-event-trigger.png)

## Pruébelo {#try-it-out}

Para probar esto, necesitamos insertar una nueva fila en la tabla de usuarios.

Diríjase a Console -> Data -> users -> Insert Row e inserte una nueva fila.

Ahora diríjase a la pestaña Events y haga clic en el evento `send_email`para navegar por los eventos procesados.

![Pruebe el desencadenador de eventos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/test-event-trigger.png)

Ahora, cada vez que se inserta una nueva fila en la tabla `users`, se invocaría este evento.
