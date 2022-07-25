---
title: "Sincronización de nuevas tareas pendientes"
metaTitle: "Sincronización de nuevas tareas pendientes en el feed público | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Aprenderá a sincronizar las nuevas tareas pendientes agregadas por otras personas en el feed público, obteniendo datos nuevos y antiguos mediante consultas de GraphQL"
---

Una vez se ha introducido una nueva tarea pendiente en una lista pública, necesita aparecer en la interfaz de usuario. En lugar de mostrar automáticamente la tarea pendiente en la interfaz de usuario, utilizamos un banner de notificación tipo Feed, que aparece cada vez que se recibe una nueva tarea pendiente.

Recuerde que, anteriormente, actualizamos la caché utilizando la API de caché y que la interfaz de usuario se actualizó de forma automática, porque la actualización de la caché desencadenó un re-renderizado para aquellos componentes suscritos a este almacén.

No vamos a utilizar aquí ese mismo enfoque, pues no queremos que la interfaz de usuario de la lista pública se actualice de forma automática.

En el componente `TodoPublicListSubscription` del paso anterior, solo obtenemos la última tarea pendiente y no la lista existente. Ahora vamos a componer una consulta para obtener la lista de las tareas pendientes públicas existentes.

Comience por importar `useEffect` desde `react` y `useApolloClient` desde `@apollo/client`

```javascript
- import React, { Fragment } from "react";
+ import React, { Fragment, useState, useEffect } from "react";
- import { useSubscription, gql } from "@apollo/client";
+ import { useSubscription, useApolloClient, gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

Ahora que ya tenemos acceso al cliente, vamos a actualizar el componente `TodoPublicList`

```javascript
const TodoPublicList = props => {
-    const state = {
+    const [state, setState] = useState({
-     olderTodosAvailable: true,
+     olderTodosAvailable: props.latestTodo ? true : false,
-     newTodosCount: 1,
+     newTodosCount: 0,
      todos: [
-       {
-         id: "1",
-         title: "This is public todo 1",
-         user: {
-           name: "someUser1"
-         }
-       },
-       {
-         id: "2",
-         title: "This is public todo 2",
-         is_completed: false,
-         is_public: true,
-         user: {
-           name: "someUser2"
-         }
-       },
-       {
-         id: "3",
-         title: "This is public todo 3",
-         user: {
-           name: "someUser3"
-         }
-       },
-       {
-         id: "4",
-         title: "This is public todo 4",
-         user: {
-           name: "someUser4"
-         }
-       }
      ],
+     error: false
-   };
+   });

+  let numTodos = state.todos.length;
+  let oldestTodoId = numTodos
+    ? state.todos[numTodos - 1].id
+    : props.latestTodo
+      ? props.latestTodo.id + 1
+      : 0;
+  let newestTodoId = numTodos
+    ? state.todos[0].id
+    : props.latestTodo
+      ? props.latestTodo.id
+      : 0;
+
+  const client = useApolloClient();

  }

  const loadNew = () => {};

  const loadOlder = () => {};

  ...
}
```

Vamos a rellenar el estado inicial obteniendo la lista de tareas pendientes existentes en `useEffect`

```javascript
const TodoPublicList = props => {
  ...

  const client = useApolloClient();

+  useEffect(() => {
+    loadOlder();
+  }, []);

  const loadNew = () => {};

  const loadOlder = () => {}

  ...
}
```

Actualice el método `loadOlder` a lo siguiente:

```javascript
  const loadOlder = async () => {
+    const GET_OLD_PUBLIC_TODOS = gql`
+      query getOldPublicTodos ($oldestTodoId: Int!) {
+        todos (where: { is_public: { _eq: true}, id: {_lt: $oldestTodoId}}, limit: 7, order_by: { created_at: desc }) {
+          id
+          title
+          created_at
+          user {
+            name
+          }
+        }
+      }`;
+
+   const { error, data } = await client.query({
+      query: GET_OLD_PUBLIC_TODOS,
+      variables: { oldestTodoId: oldestTodoId }
+    });
+
+    if (data.todos.length) {
+      setState(prevState => {
+        return { ...prevState, todos: [...prevState.todos, ...data.todos] };
+      });
+      oldestTodoId = data.todos[data.todos.length - 1].id;
+    } else {
+      setState(prevState => {
+        return { ...prevState, olderTodosAvailable: false };
+      });
+    }
+    if (error) {
+      console.error(error);
+      setState(prevState => {
+        return { ...prevState, error: true };
+      });
+    }
+ }
```

Estamos definiendo una consulta para obtener tareas pendientes públicas más antiguas y haciendo una llamada `client.query` para obtener los datos de la base de datos. Una vez obtenemos los datos, actualizamos el estado `todos` para re-renderizar la interfaz de usuario con el listado disponible de las tareas pendientes.

Pruebe a agregar una nueva tarea pendiente en el feed público y fíjese en cómo no va a aparecer en la interfaz de usuario. Ahora, refresque la página para ver la tarea pendiente añadida.

Esto ocurre porque no hemos implementado todavía ninguna manera de mostrar la tarea recién añadida al feed.

Vamos a solucionarlo en `useEffect` para que se actualice

```javascript
  useEffect(() => {
    loadOlder();
  }, []);

+  useEffect(
+    () => {
+      if (props.latestTodo && props.latestTodo.id > newestTodoId) {
+        setState(prevState => {
+          return { ...prevState, newTodosCount: prevState.newTodosCount + 1 };
+        });
+        newestTodoId = props.latestTodo.id;
+      }
+    },
+    [props.latestTodo]
+  );
```

Ahora pruebe a añadir una nueva tarea pendiente al feed público y verá la notificación emergente que informa de la llegada de una nueva tarea.

¡Genial! Todavía nos queda una funcionalidad pendiente. Cuando llega una nueva tarea al feed público y cuando el usuario hace clic en la sección Nuevas tareas, debemos hacer una consulta para recuperar las tareas pendientes que no estén presentes en nuestro feed público activo.

Actualice el método `loadNew()` con el siguiente código

```javascript
  const loadNew = async () => {
+   const GET_NEW_PUBLIC_TODOS = gql`
+     query getNewPublicTodos ($latestVisibleId: Int!) {
+       todos(where: { is_public: { _eq: true}, id: {_gt: $latestVisibleId}}, order_by: { created_at: desc }) {
+         id
+         title
+         created_at
+         user {
+           name
+         }
+       }
+     }
+   `;
+
+   const { error, data } = await client.query({
+      query: GET_NEW_PUBLIC_TODOS,
+      variables: {
+        latestVisibleId: state.todos.length ? state.todos[0].id : null
+      }
+    });

+    if (data) {
+      setState(prevState => {
+        return {
+          ...prevState,
+          todos: [...data.todos, ...prevState.todos],
+          newTodosCount: 0
+        };
+      });
+      newestTodoId = data.todos[0].id;
+    }
+    if (error) {
+      console.error(error);
+      setState(prevState => {
+        return { ...prevState, error: true };
+      });
+    }
  }
```
