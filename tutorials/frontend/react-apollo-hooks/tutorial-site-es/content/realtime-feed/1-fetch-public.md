---
title: "Obtener tareas pendientes públicas - suscripción"
metaTitle: "Obtener tareas pendientes públicas mediante Suscripción | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Aprenderá a utilizar las suscripciones de GraphQL para recibir notificaciones cada vez que aparezca una nueva tarea pendiente en la aplicación React"
---

import GithubLink from "../../src/GithubLink.js";

Vamos a definir la consulta de graphql que se va a utilizar:

Abra `src/components/Todo/TodoPublicList.js` y agregue las siguientes importaciones.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPublicList.js" text="src/components/Todo/TodoPublicList.js" />

```javascript
import React, { useState, Fragment } from 'react';
+ import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

Ahora vamos a definir la consulta de suscripción para recibir notificaciones sobre las nuevas tareas pendientes públicas

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

Además, vamos a añadir un componente funcional que utilice esta consulta de suscripción.
 Importar `useSubscription` desde `@apollo/client` para comenzar.

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

¿Qué hace la suscripción?
-----------------------------

La consulta obtiene `todos` con una simple condición; `is_public` ha de ser verdadero. También limitamos el número de tareas pendientes a 1, ya que solo queremos ser notificados cuando aparezca una nueva tarea pendiente.
 Ordenamos las tareas pendientes según su created_at más reciente, de acuerdo al esquema. Especificamos qué campos necesitamos para el nodo de tareas pendientes.

Ahora mismo no devolvemos nada cuando aparecen nuevos datos. Ya disponemos del componente TodoPublicList, que renderiza el listado de tareas pendientes públicas. Así que vamos a devolver ese componente.

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

Ahora nos gustaría devolver el nuevo componente TodoPublicListSubscription, que lleva integrado el hook React `useSubscription`.

```javascript
- export default TodoPublicList;
+ export default TodoPublicListSubscription;
```
