---
title: "Mutación y actualización de caché"
metaTitle: "Apollo client.mutate para la actualización de mutación de GraphQL | Tutorial de los ganchos de Apollo de Reacción GraphQL"
metaDescription: "Utilizaremos el gancho de Apollo useMutation React de @apollo/client como ejemplo para modificar los datos existentes y actualizar la caché localmente usando readQuery y writeQuery y manejar optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Ahora vamos a hacer la parte de integración. Abra `src/components/Todo/TodoItem.js`y agregue el siguiente código debajo de las otras importaciones:

```javascript
+ import { gql } from "@apollo/client";
```
Definamos la mutación graphql para actualizar el estado completo del todo

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

### Apolo useMutation de la reaccion
Necesitamos usar el gancho de `useMutation`React para hacer la mutación.

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

Ya tenemos el controlador de onChange toggleTodo para la entrada. Actualicemos la función para hacer un uso de la función de `toggleTodoMutation`mutar.

```javascript
  const toggleTodo = () => {
+    toggleTodoMutation({
+      variables: {id: todo.id, isCompleted: !todo.is_completed},
+      optimisticResponse: true,
+    });
  };
```

El código anterior solo hará una mutación, actualizando la propiedad is_completed de todo en la base de datos. Para actualizar la caché, volveremos a utilizar la `update`función para modificar la caché. Necesitamos buscar la lista actual de todos de la caché antes de modificarla. Así que importemos la consulta.

```javascript
+ import {GET_MY_TODOS} from './TodoPrivateList';
```
Ahora vamos a añadir el código para la `update`función.

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

Estamos obteniendo los todos existentes desde la caché usando `cache.readQuery`y actualizando el valor is_completed para todo lo que se ha actualizado.

Por último, estamos escribiendo la lista todo actualizada a la caché usando `cache.writeQuery`.
