---
title: "Sincronizar nuevos todos"
metaTitle: "Sincronizar nuevos todos en alimentación pública | GraphQL React Apollo Hooks Tutorial"
metaDescription: "Aprenderá cómo sincronizar nuevos todos agregados por otras personas en el feed público mediante la obtención de datos más antiguos y nuevos utilizando las consultas GraphQL"
---

Una vez que un nuevo todo se introduce en una lista pública, debe aparecer en la IU. En lugar de mostrar automáticamente todo en la interfaz de usuario, usamos un banner de notificación de Feed como que aparece cada vez que se recibe un nuevo todo.

Recuerde que previamente hemos actualizado el caché usando la API de caché y la interfaz de usuario se actualizó automáticamente, porque la actualización de la caché desencadenó un re-render para aquellos componentes que estaban suscritos a esta tienda.

No vamos a utilizar ese enfoque aquí ya que no queremos que la interfaz de usuario de lista pública se actualice automáticamente.

En el `TodoPublicListSubscription`componente del paso anterior, solo obtenemos lo último todo y no la lista existente. Ahora escribiremos una consulta para buscar la lista de todos los públicos existentes.

Comience importando `useEffect`desde `react`y `useApolloClient`desde`@apollo/client`

```javascript
- import React, { Fragment } from "react";
+ import React, { Fragment, useState, useEffect } from "react";
- import { useSubscription, gql } from "@apollo/client";
+ import { useSubscription, useApolloClient, gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

Ahora que tenemos acceso al cliente, actualicemos el `TodoPublicList`componente

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

Vamos a poblar el estado inicial al buscar la lista existente de todos en`useEffect`

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

Actualiza el `loadOlder`método a lo siguiente:

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

Estamos definiendo una consulta para buscar todos los públicos más antiguos y hacer una `client.query`llamada para obtener los datos de la base de datos. Una vez que recibimos los datos, actualizamos el `todos`estado para volver a renderizar la interfaz de usuario con la lista disponible de todos públicos.

Intenta añadir un nuevo todo en el feed público y observa que no aparecerá en la interfaz de usuario. Actualiza la página para ver el contenido de la página.

Esto sucede porque aún no hemos implementado una manera de mostrar el todo recién añadido a la alimentación.

Vamos a manejar eso `useEffect`para la actualización

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

Ahora intenta agregar un nuevo todo al feed público y verás que aparece la notificación diciendo que una nueva tarea ha llegado.

¡Genial! Todavía tenemos una funcionalidad. Cuando una nueva tarea llega al feed público y cuando el usuario hace clic en la sección de tareas nuevas, debemos hacer una consulta para volver a buscar todos los que no están presentes en nuestro feed público actual.

Actualizar el `loadNew()`método con el siguiente código

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
