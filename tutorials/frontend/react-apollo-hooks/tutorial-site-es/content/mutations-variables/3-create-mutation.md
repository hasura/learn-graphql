---
title: "useMutation de useMutation caché de actualización"
metaTitle: "Uso de Apollo de reacción de la ut GraphQL React Ganchos de Apolo Tutorial"
metaDescription: "Utilizaremos la Apollo Client useMutation de @apollo/client en la aplicación React como ejemplo para insertar nuevos datos y actualizar la caché localmente usando readQuery y writeQuery."
---

### Apolo useMutation de la reaccion
Ahora vamos a hacer la parte de integración. Abra `src/components/Todo/TodoInput.js`y agregue el siguiente código debajo de las otras importaciones:

```javascript
import { useMutation } from "@apollo/client";
```

`@apollo/client`Estamos importando el gancho `useMutation`React y la consulta graphql que hemos definido anteriormente para obtener los datos de todo.

Ahora, usaremos el gancho `useMutation`React pasando nuestra constante de mutación graphql que importamos. Añadir el siguiente código:

```javascript
const TodoInput = ({isPublic=false}) => {

+ const [addTodo] = useMutation(ADD_TODO);

return (
  ...
)

};
```

En el gancho de `useMutation`reacción definido anteriormente, el primer argumento del tuple de resultado es la función mutada; (addTodo) en este caso. Lea más sobre la función de mutar [aquí](https://www.apollographql.com/docs/react/data/mutations/).

La función de mutar opcionalmente toma variables, optimisticResponse, refetchQueries, y actualizar; Usted va a hacer uso de la `update`función más tarde.

Necesitamos manejar el evento de cambio para que cuando el usuario escriba algo en el cuadro de entrada, actualicemos el estado.

Vamos a hacer uso de `useState`gancho para esto.

```javascript
- import React from 'react';
+ import React, {useState} from 'react';
```

Iniciaremos el estado y agregaremos un `onChange`controlador para actualizar el estado.

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

Ahora vamos a manejar el formulario para invocar la mutación.

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

Estamos pasando la función de mutar `addTodo`() a nuestro formulario de manejo de envíos. El primer argumento de la función mutar sería las opciones de la consulta de mutación, como las variables, etc. Ahora estamos pasando las variables requeridas para la mutación.

La mutación se ha integrado y los nuevos todos se insertarán en la base de datos. Pero la interfaz de usuario no sabe que se ha añadido un nuevo todo. Necesitamos una manera de decirle a Apollo Client que actualice la consulta de la lista de todos.

### Actualización de la mutación de reaccionar Apollo
La `update`función es útil para actualizar la caché de esta mutación. Viene con funciones de utilidad tales como `readQuery`y `writeQuery`que ayuda en la lectura y escritura de la caché.

Implementemos `update`para la mutación anterior.

Pasamos la función de actualización como una opción a `useMutation`.

```javascript
-    const [addTodo] = useMutation(ADD_TODO);
+    const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
```

Necesitamos buscar la lista actual de todos de la caché. Así que importemos la consulta que usamos en los pasos anteriores.

```javascript
import {GET_MY_TODOS} from './TodoPrivateList';
```

Definamos la función updateCache para leer y escribir en caché.

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

Vamos a diseccionar lo que está sucediendo en este fragmento de código.

Nuestros objetivos fueron simples:

- Haga una mutación para insertar el nuevo todo en la base de datos.
- Una vez que se realiza la mutación, necesitamos actualizar la caché para actualizar la interfaz de usuario.

La función de actualización se utiliza para actualizar la caché después de que se produzca una mutación. Recibe el resultado de la mutación (datos) y la caché actual (almacenamiento) como argumentos. A continuación, utilizará estos argumentos para administrar su caché de modo que la interfaz de usuario esté actualizada.

### readQuery y writeQuery

cache.readQuery
---------------

A diferencia de `client.query`, readQuery nunca hará una solicitud a su servidor GraphQL. Siempre se leerá desde la caché. Así que hacemos una solicitud de lectura a la caché para obtener la lista actual de todos.

cache.writeQuery
----------------

Ya hemos hecho la mutación al servidor graphql usando la función de mutación. Nuestro objetivo era actualizar la IU. Aquí es donde writeQuery llega al rescate. writeQuery le permitirá cambiar los datos en su caché local, pero es importante recordar que no cambiarán ningún dato en su servidor (exactamente lo que necesitamos).

Cualquier suscriptor a la tienda de Apollo Client verá instantáneamente esta actualización y renderizará nueva interfaz de usuario en consecuencia.

Concatenamos nuestro nuevo todo de nuestra mutación con la lista de todos existentes y escribimos la consulta de nuevo a la caché con cache.writeQuery

Ahora, el componente TodoPrivateList usando el gancho `useQuery`React obtendrá la lista todo actualizada ya que está automáticamente suscrito a la tienda.

¡Genial! Eso fue realmente fácil :)

Vamos a envolver esto agregando una función para borrar el valor de entrada una vez que la mutación tenga éxito.

```javascript
-  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
+  const [addTodo] = useMutation(ADD_TODO, {
+    update: updateCache,
+    onCompleted: resetInput
+  });
```

Pasamos una función llamada `resetInput`a la `onCompleted`opción que se llamará una vez que se complete la mutación. La definición de función se ve así:

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

