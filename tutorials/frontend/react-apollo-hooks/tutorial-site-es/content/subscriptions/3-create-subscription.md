---
title: "Crear Suscripción y Render Resultado"
metaTitle: "Crear suscripción y Renderizar resultados | de la reacción de GraphQL Ganchos de Apollo Tutorial"
metaDescription: "Integrar React Apollo useSubscription hook para ver los cambios en los datos en tiempo real. Utilizamos las suscripciones GraphQL como un ejemplo para obtener datos en vivo en la aplicación React"
---

import GithubLink from "../../src/GithubLink.js";

Así que definamos la suscripción a graphql que se utilizará.

Abre `src/components/OnlineUsers/OnlineUsersWrapper.js`y añade el siguiente código, debajo de las otras importaciones

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React, { useEffect, useState } from "react";
+ import React, { useEffect, Fragment, useState } from "react";
- import { useMutation, gql } from "@apollo/client";
+ import { useMutation, useSubscription, gql } from "@apollo/client";
```

`@apollo/client`Estamos importando el gancho `useSubscription`React y la consulta de suscripción de graphql que hemos definido anteriormente para obtener los datos de usuario en línea.

Ahora, usaremos el gancho `useSubscription`React pasando la consulta de suscripción:

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

Ahora que tenemos los datos reales, vamos a eliminar el estado de usuario en línea

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

¿Cómo funciona esto?
-------------------

Estamos usando el gancho `useSubscription`React que devuelve propiedades (similares a `useQuery`los ganchos `useMutation`React). La `data`propiedad da el resultado de los datos en tiempo real para la consulta que hemos realizado.

¡Refresca tu aplicación de reaccionar y verte en línea! No se sorprenda; También podría haber otros usuarios en línea.

¡Impresionante! Ha completado las implementaciones de una consulta, mutación y suscripciones de GraphQL.
