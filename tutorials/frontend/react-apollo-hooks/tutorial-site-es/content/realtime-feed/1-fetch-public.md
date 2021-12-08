---
title: "Fetch public todos - suscripción"
metaTitle: "Cómo crear todos los archivos usando la suscripción |"
metaDescription: "Aprenderá cómo hacer uso de las suscripciones GraphQL para recibir notificaciones cada vez que un nuevo todo viene en la aplicación React"
---

import GithubLink from "../../src/GithubLink.js";

Definamos la consulta graphql que se utilizará:

Abre `src/components/Todo/TodoPublicList.js`y añade las siguientes importaciones.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPublicList.js" text="src/components/Todo/TodoPublicList.js" />

```javascript
import React, { useState, Fragment } from 'react';
+ import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

Ahora definamos la consulta de suscripción para recibir notificaciones sobre nuevos públicos todos

```javascript
import React, { useState, Fragment } from 'react';
import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";

const TodoPublicList = props => {
  ...
}

+ // Run a subscription to get the latest public todo
+ const NOTIFY_NEW_PUBLIC_TODOS = gql`
+  subscription notifyNewPublicTodos {
+    todos (where: { is_public: { _eq: true}}, limit: 1, order_by: {created_at: desc }) {
+      id
+      created_at
+    }
+  }
+ `;

export default TodoPublicList;
```

También permite añadir un componente funcional que utiliza esta consulta de suscripción. Importar `useSubscription`desde `@apollo/client`para empezar.

```javascript
import React, { Component, Fragment } from 'react';
- import { gql } from "@apollo/client";
+ import { useSubscription, gql } from "@apollo/client";

import TaskItem from "./TaskItem";

const TodoPublicList = props => {
  ...
}

// Run a subscription to get the latest public todo
const NOTIFY_NEW_PUBLIC_TODOS = gql`
 subscription notifyNewPublicTodos {
   todos (where: { is_public: { _eq: true}}, limit: 1, order_by: {created_at: desc }) {
     id
     created_at
   }
 }
`;

+ const TodoPublicListSubscription = () => {
+   const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
+   if (loading) {
+     return <span>Loading...</span>;
+   }
+   if (error) {
+     return <span>Error</span>;
+   }
+   return {};
+ };

export default TodoPublicList;
```

¿Qué hace la Suscripción?
-----------------------------

La consulta se encuentra `todos`con una condición simple; `is_public`debe ser verdad. También limitamos el número de todos a 1, ya que nos gustaría recibir una notificación cada vez que un nuevo todo se presente. Clasificamos los todos por su último momento created_at de acuerdo con el esquema. Especificamos qué campos necesitamos para el nodo de todos .

Ahora mismo no devolvemos nada cuando se introducen nuevos datos. Ya tenemos el componente TodoPublicList que hace la lista de todos públicos. Así que devolvámoslo a ese componente.

```javascript
 const TodoPublicListSubscription = () => {
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error</span>;
  }
-  return {};
+  return (<TodoPublicList latestTodo={data.todos.length ? data.todos[0] : null} />);
};
```

Nos gustaría ahora devolver el nuevo componente TodoPublicListSubscription que tiene el gancho de `useSubscription`React integrado.

```javascript
- export default TodoPublicList;
+ export default TodoPublicListSubscription;
```
