---
title: "Suscripciones para mostrar los usuarios en línea"
metaTitle: "Actualizar el visto por última vez del usuario con Mutación | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Mutación de GraphQL para actualizar el visto por última vez del usuario para que esté disponible en línea. Utilice setInterval para desencadenar la mutación cada pocos segundos"
---

import GithubLink from "../src/GithubLink.js";

Hemos explorado las consultas y mutaciones de GraphQL. Hemos consultado en busca de tareas pendientes, añadido una nueva tarea pendiente, actualizado una existente y eliminado una tarea pendiente existente.

Ahora nos vamos a poner con la parte interesante.

Suscripciones de GraphQL
---------------------

Disponemos de una sección en la interfaz de usuario que muestra el listado de los usuarios en línea. Hasta ahora, hemos realizado consultas para obtener datos y mostrarlos en la interfaz de usuario. Pero lo normal es que los datos de los usuarios en línea sean dinámicos.

Podemos aprovechar la API de suscripciones de GraphQL para obtener datos en tiempo real del servidor de graphql para gestionarlo de forma eficiente.

Pero, pero, pero...

Necesitamos comunicarle al servidor que el usuario registrado está en línea. Tenemos que consultar a nuestro servidor para hacer una mutación que actualice el valor `last_seen` de marca de tiempo del usuario.

Tenemos que realizar este cambio para, lo primero, vernos en línea a nosotros mismos. ¿Recuerda que ya ha iniciado sesión, ha registrado sus datos en el servidor, pero que no ha actualizado su valor `last_seen`?

El objetivo es actualizarse cada pocos segundos en el cliente para que sepa que estamos en línea. Lo ideal sería hacerlo tras haberse autenticado con éxito mediante Auth0. Así que vamos a actualizar algo de código para que lo gestione.

Abra `src/components/OnlineUsers/OnlineUsersWrapper.js` y agregue las siguientes importaciones

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React from "react";
+ import React, { useEffect, useState } from "react";
+ import { useMutation, gql } from "@apollo/client";
```

En `useEffect`, crearemos una `setInterval` para actualizar el visto por última vez del usuario cada 30 segundos.

```javascript
const OnlineUsersWrapper = () => {
+  const [onlineIndicator, setOnlineIndicator] = useState(0);
+  let onlineUsersList;
+  useEffect(() => {
+     // Every 20s, run a mutation to tell the backend that you're online
+     updateLastSeen();
+     setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));
+
+     return () => {
+       // Clean up
+       clearInterval(onlineIndicator);
+     };
+ }, []);
```

Ahora vamos a escribir la definición de la `updateLastSeen`.

```javascript
const OnlineUsersWrapper = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;

  useEffect(() => {
    // Every 20s, run a mutation to tell the backend that you're online
    updateLastSeen();
    setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));

    return () => {
      // Clean up
      clearInterval(onlineIndicator);
    };
  }, []);

+ const UPDATE_LASTSEEN_MUTATION = gql`
+   mutation updateLastSeen($now: timestamptz!) {
+     update_users(where: {}, _set: { last_seen: $now }) {
+       affected_rows
+     }
+   }
+ `;
+ const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);

+ const updateLastSeen = () => {
+   // Use the apollo client to run a mutation to update the last_seen value
+   updateLastSeenMutation({
+     variables: { now: new Date().toISOString() }
+   });
+ };
```

Una vez más, estamos utilizando el hook `useMutation` React para actualizar la tabla `users` de la base de datos.

¡Genial! Ahora, los metadatos sobre si el usuario está en línea estarán disponibles en el backend. A continuación, hagamos la integración para mostrar los datos en tiempo real de los usuarios en línea.
