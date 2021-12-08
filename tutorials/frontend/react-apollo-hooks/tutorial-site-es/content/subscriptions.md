---
title: "Suscripciones para mostrar usuarios en línea"
metaTitle: "Actualización vista por última vez de usuario con Mutación | Ganchos de Apollo de Reacción GraphQL"
metaDescription: "GraphQL Mutation para actualizar la última vista del usuario para ponerla a disposición en línea. Utilice setInterval para activar la mutación cada pocos segundos"
---

import GithubLink from "../src/GithubLink.js";

Hemos cruzado a través de nuestras consultas y mutaciones GraphQL. Buscamos todos, agregamos un nuevo todo, actualizamos un todo existente, eliminamos un todo existente.

Ahora vamos a la parte emocionante.

Suscripciones GraphQL
---------------------

Tenemos una sección de UI que muestra la lista de usuarios en línea. Hasta ahora hemos hecho consultas para obtener datos y mostrarlos en la interfaz de usuario. Pero los datos de los usuarios en línea suelen ser dinámicos.

Podemos hacer uso de la API de suscripción de GraphQL para obtener datos en tiempo real del servidor graphql para manejar de manera eficiente.

Pero pero...

Necesitamos decirle al servidor que el usuario que ha iniciado sesión está en línea. Tenemos que sonar nuestro servidor para hacer una mutación que actualiza el valor de marca de `last_seen`tiempo del usuario.

Tenemos que hacer este cambio para verte en línea primero. ¿Recuerdas que ya has iniciado sesión, registraste tus datos en el servidor, pero no has actualizado tu `last_seen`valor?

El objetivo es actualizar cada pocos segundos del cliente que está en línea. Lo ideal es que lo hagas después de que hayas autenticado con éxito con Auth0. Así que vamos a actualizar un código para manejar esto.

Abre `src/components/OnlineUsers/OnlineUsersWrapper.js`y añade las siguientes importaciones

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React from "react";
+ import React, { useEffect, useState } from "react";
+ import { useMutation, gql } from "@apollo/client";
```

En `useEffect`, crearemos a `setInterval`para actualizar el último last_seen del usuario cada 30 segundos.

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

`updateLastSeen`Ahora escribamos la definición de la .

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

Una vez más, estamos haciendo uso de `useMutation`React hook para actualizar la `users`tabla de la base de datos.

¡Genial! Ahora los metadatos sobre si el usuario está en línea estarán disponibles en el backend. Ahora hagamos la integración para mostrar datos en tiempo real de los usuarios en línea.
