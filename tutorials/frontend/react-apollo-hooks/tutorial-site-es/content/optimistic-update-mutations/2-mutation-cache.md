---
title: "Mutaciones y actualización de la caché"
metaTitle: "Actualización de mutaciones client.mutate de Apollo en GraphQL | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Vamos a utilizar el hook React useMutation de Apollo de @apollo/client como ejemplo, para modificar los datos existentes y actualizar la caché de forma local con readQuery y writeQuery, y para gestionar optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Ahora vamos a realizar la parte de la integración. Abra `src/components/Todo/TodoItem.js` y añada el siguiente código en las demás importaciones:

```javascript
+ import { gql } from "@apollo/client";
```
Vamos a definir la mutación de graphql para actualizar el estado completado de la tarea pendiente

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoItem.js" text="src/components/Todo/TodoItem.js" />

```javascript
const TodoItem = ({index, todo}) => {

  const removeTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

+  const TOGGLE_TODO = gql`
+    mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
+      update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
+        affected_rows
+      }
+    }
+  `;

  const toggleTodo = () => {};

  return (
    ...
  );
};

export default TodoItem;

```

### Hook useMutation de Apollo con React
Necesitaremos utilizar el hook React `useMutation` para realizar la mutación.

```javascript
  import React from 'react';
- import { gql } from "@apollo/client";
+ import { useMutation, gql } from "@apollo/client";

  const TodoItem = ({index, todo}) => {
    const removeTodo = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `;

+ const [toggleTodoMutation] = useMutation(TOGGLE_TODO);

  return (
    ...
  );
 };

 export default TodoItem;
```

Ya disponemos del controlador onChange toggleTodo para la entrada. Vamos a actualizar la función para hacer uso de la función de mutación `toggleTodoMutation`.

```javascript
  const toggleTodo = () => {
+    toggleTodoMutation({
+      variables: {id: todo.id, isCompleted: !todo.is_completed},
+      optimisticResponse: true,
+    });
  };
```

El código anterior solo realizará una mutación, actualizando la propiedad is_completed en la base de datos.
 Para actualizar la caché, volveremos a utilizar la función `update` para modificar la caché. Necesitaremos obtener el actual listado de tareas pendientes de la caché, antes de modificarlo. Así que vamos a importar la consulta.

```javascript
+ import {GET_MY_TODOS} from './TodoPrivateList';
```
Ahora vamos a añadir el código para la función `update`.

```javascript
  const toggleTodo = () => {
    toggleTodoMutation({
      variables: {id: todo.id, isCompleted: !todo.is_completed},
      optimisticResponse: true,
+      update: (cache) => {
+        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
+        const newTodos = existingTodos.todos.map(t => {
+          if (t.id === todo.id) {
+            return {...t, is_completed: !t.is_completed};
+          } else {
+            return t;
+          }
+        });
+        cache.writeQuery({
+          query: GET_MY_TODOS,
+          data: {todos: newTodos}
+        });
+      }
    });
  };

```

Estamos obteniendo las tareas pendientes existentes de la caché, utilizando `cache.readQuery` y actualizando el valor is_completed para la tarea pendiente que hemos actualizado.

Por último, estamos escribiendo el listado de tareas pendientes actualizado en la caché, utilizando `cache.writeQuery`.
