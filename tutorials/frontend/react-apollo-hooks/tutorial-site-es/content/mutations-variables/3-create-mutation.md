---
title: "Hook useMutation, Actualizar la caché"
metaTitle: "Hook useMutation de Apollo con React | Tutorial de Hooks Apollo con React en GraphQL"
metaDescription: "Utilizaremos la useMutation del cliente Apollo de @apollo/client en la aplicación React como ejemplo para insertar nuevos datos y actualizar la caché de forma local utilizando readQuery y writeQuery."
---

### Hook useMutation de Apollo con React
Ahora vamos a realizar la parte de la integración. Abra `src/components/Todo/TodoInput.js` y añada el siguiente código en las demás importaciones:

```javascript
import { useMutation } from "@apollo/client";
```

Estamos importando el hook React `useMutation` de `@apollo/client` y la consulta graphql que hemos definido antes para obtener los datos de las tareas pendientes.

Ahora, utilizaremos el hook React `useMutation` con la constante de mutación de graphql que hemos importado. Añada el siguiente código:

```javascript
const TodoInput = ({isPublic=false}) => {

+ const [addTodo] = useMutation(ADD_TODO);

return (
  ...
)

};
```

En el hook React `useMutation` definido anteriormente, el primer argumento de la tupla resultante es la función de mutación; en este caso (addTodo). Más información sobre la función de mutación [aquí](https://www.apollographql.com/docs/react/data/mutations/).

La función de mutación acepta, de forma opcional, variables optimisticResponse, refetchQueries y actualizar; utilizaremos la función `update` más adelante.

Necesitamos manejar el evento de cambio para que, cuando el usuario teclee algo en la caja de entrada, actualicemos el estado.

Para ello, vamos a utilizar el hook `useState`.

```javascript
- import React from 'react';
+ import React, {useState} from 'react';
```

Iniciaremos el estado y agregaremos un controlador `onChange` para actualizar el estado.

```javascript
const TodoInput = ({isPublic = false}) => {
+  const [todoInput, setTodoInput] = useState('');

   const [addTodo] = useMutation(ADD_TODO);

   return (
           <form className="formInput" onSubmit={(e) => {
             e.preventDefault();
           }}>
             <input
               className="input"
               placeholder="What needs to be done?"
+              value={todoInput}
+              onChange={e => (setTodoInput(e.target.value))}
             />
             <i className="inputMarker fa fa-angle-right" />
           </form>
         );
};
```

A continuación, gestionaremos el envío del formulario para invocar la mutación.

```javascript
      return (
        <form className="formInput" onSubmit={(e) => {
          e.preventDefault();
+         addTodo({variables: {todo: todoInput, isPublic }});
        }}>
          <input
            className="input"
            placeholder="What needs to be done?"
            value={todoInput}
            onChange={e => (setTodoInput(e.target.value))}
          />
          <i className="inputMarker fa fa-angle-right" />
        </form>
      );
```

Estamos pasando la función de mutación (`addTodo`) a nuestro controlador de envío de formularios.
 El primer argumento de la función de mutación serían las opciones de la consulta de mutación: variables, etc. Ahora estamos pasando las variables necesarias para la mutación.

La mutación ha sido incorporada y las nuevas tareas pendientes van a ser insertadas en la base de datos. Pero la interfaz de usuario desconoce que se haya agregado una nueva tarea pendiente. Necesitamos una manera de comunicarle al cliente Apollo que actualice la consulta para la lista de tareas pendientes.

### Actualización de la mutación de Apollo con React
La función `update` viene muy bien para actualizar la caché para esta mutación. Trae funciones de utilidad como `readQuery` y `writeQuery` que ayudan a leer y escribir en la caché.

Vamos a implementar `update` para la mutación anterior.

Pasamos la función de actualización como opción a `useMutation`.

```javascript
-    const [addTodo] = useMutation(ADD_TODO);
+    const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
```

Necesitamos obtener la lista actual de tareas pendientes de la caché. Así que vamos a importar la consulta que hemos utilizado en los pasos anteriores.

```javascript
import {GET_MY_TODOS} from './TodoPrivateList';
```

Vamos a definir la función updateCache para leer y escribir en la caché.

```javascript
const TodoInput = ({isPublic = false}) => {
  let input;

  const [todoInput, setTodoInput] = useState('');

+  const updateCache = (cache, {data}) => {
+    // If this is for the public feed, do nothing
+    if (isPublic) {
+      return null;
+    }
+
+    // Fetch the todos from the cache
+    const existingTodos = cache.readQuery({
+      query: GET_MY_TODOS
+    });
+
+    // Add the new todo to the cache
+    const newTodo = data.insert_todos.returning[0];
+    cache.writeQuery({
+      query: GET_MY_TODOS,
+      data: {todos: [newTodo, ...existingTodos.todos]}
+    });
+  };

  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});

   return (
    ...
   );
};
```

Vamos a examinar lo que está sucediendo en este fragmento de código.

Nuestros objetivos eran sencillos:

- Crear una mutación para insertar la nueva tarea pendiente en la base de datos.
- Una vez creada la mutación, necesitamos actualizar la caché para actualizar la interfaz de usuario.

La función de actualización se utiliza para actualizar la caché después de que se haya producido una mutación.
 Recibe el resultado de la mutación (datos) y la caché actual (almacén) en forma de argumentos. Entonces podremos utilizar estos argumentos para gestionar nuestra caché y que la interfaz de usuario se ponga al día.

### readQuery y writeQuery

cache.readQuery
---------------

A diferencia de `client.query`, readQuery nunca hará solicitudes a nuestro servidor GraphQL. Siempre hará sus lecturas desde la caché. Así que hacemos una solicitud de lectura a la caché para obtener la actual lista de tareas pendientes.

cache.writeQuery
----------------

Ya hemos realizado la mutación con el servidor graphql, utilizando la función de mutación. Nuestro objetivo era actualizar la interfaz de usuario. Aquí es donde writeQuery viene al rescate. writeQuery nos permitirá cambiar los datos en nuestra caché local, pero es importante recordar que no cambiará ningún dato en nuestro servidor (justo lo que necesitamos).

Cualquier suscriptor al almacén del cliente Apollo podrá ver esta actualización y generar una nueva interfaz de usuario en consecuencia.

Adoptamos nuestra nueva tarea pendiente a partir de nuestra mutación con la lista de tareas pendientes existentes y devolvemos la consulta a la caché con cache.writeQuery

Ahora, el componente TodoPrivateList que utiliza el hook  `useQuery`React recibirá la lista de tareas pendientes actualizada, ya que se suscribe automáticamente al almacén.

¡Genial! Ha resultado bastante fácil :)

Vamos a terminar con ello añadiendo una función para borrar el valor de entrada una vez la mutación haya tenido éxito.

```javascript
-  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
+  const [addTodo] = useMutation(ADD_TODO, {
+    update: updateCache,
+    onCompleted: resetInput
+  });
```

Pasamos una función llamada `resetInput` a la opción `onCompleted` que será llamada una vez se complete la mutación. La definición de la función tiene el siguiente aspecto:

```javascript
const TodoInput = ({isPublic = false}) => {
  const [todoInput, setTodoInput] = useState('');

  const updateCache = (cache, {data}) => {
    ...
  };

+  const resetInput = () => {
+    setTodoInput('');
+  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: resetInput
  });

  return (
    ...
  );
}
```

