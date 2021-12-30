---
title: "Crear una Suscripción y Resultado de la Renderización"
metaTitle: "Crear una Suscripción y Resultado de la Renderización | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Incorporar el hook useSubscription de Apollo con React para buscar cambios en los datos en tiempo real. Utilizamos las suscripciones de GraphQL como ejemplo para obtener datos en vivo en la aplicación React"
---

import GithubLink from "../../src/GithubLink.js";

Vamos entonces a definir la suscripción de Graphql que vamos a utilizar.

Abra `src/components/OnlineUsers/OnlineUsersWrapper.js` y agregue el código siguiente, bajo las demás importaciones

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React, { useEffect, useState } from "react";
+ import React, { useEffect, Fragment, useState } from "react";
- import { useMutation, gql } from "@apollo/client";
+ import { useMutation, useSubscription, gql } from "@apollo/client";
```

Estamos importando el hook React `useSubscription` de `@apollo/client` y la consulta de suscripción de Graphql que hemos definido anteriormente para obtener los datos de los usuarios en línea.

Ahora, utilizaremos el hook React `useSubscription` que pasa la consulta de suscripción:

```javascript
+ const { loading, error, data } = useSubscription(
+     gql`
+       subscription getOnlineUsers {
+         online_users(order_by: { user: { name: asc } }) {
+           id
+           user {
+             name
+           }
+         }
+       }
+     `
+   );
+
+   if (loading) {
+     return <span>Loading...</span>;
+   }
+   if (error) {
+     console.error(error);
+     return <span>Error!</span>;
+   }
+   if (data) {
+     onlineUsersList = data.online_users.map(u => (
+       <OnlineUser key={u.id} user={u.user} />
+     ));
+   }
+
+   return (
+     <div className="onlineUsersWrapper">
+       <Fragment>
+         <div className="sliderHeader">
+           Online users - {onlineUsersList.length}
+         </div>
+         {onlineUsersList}
+       </Fragment>
+     </div>
+   );
+ };

export default OnlineUsersWrapper;

```

Una vez dispongamos de los datos reales, vamos a eliminar el simulacro en línea del estado del usuario

```javascript
const OnlineUsersWrapper = () => {
-  const onlineUsers = [{ name: "someUser1" }, { name: "someUser2" }];
-
-  const onlineUsersList = [];
-  onlineUsers.forEach((user, index) => {
-    onlineUsersList.push(<OnlineUser key={index} index={index} user={user} />);
-  });
-
-  return (
-    <div className="onlineUsersWrapper">
-      <div className="sliderHeader">Online users - {onlineUsers.length}</div>
-      {onlineUsersList}
-    </div>
-  );
};
```

¿Cómo funciona?
-------------------

Utilizamos el hook React `useSubscription`, que nos devuelve propiedades (de forma parecida a los hooks React `useQuery` y `useMutation`). La propiedad `data` da como resultado los datos en tiempo real para la consulta que acabamos de realizar.

Refresque su aplicación React y podrá verse a sí mismo en línea. No se sorprenda si también ve a otros usuarios en línea.

¡Maravilloso! Ha completado las implementaciones de una Consulta, Mutación y Suscripciones de GraphQL.
