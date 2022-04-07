---
title: "hook useQuery"
metaTitle: "Hook useQuery de Apollo con React | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Utilizaremos el hook useQuery de React del cliente Apollo desde @apollo/client para realizar consultas de GraphQL"
---

import GithubLink from "../../src/GithubLink.js";

En esta sección, implementaremos las consultas de GraphQL y las incorporaremos con la interfaz de usuario React.
 Con el cliente Apollo, podremos enviar consultas de 2 maneras distintas.

1. Utilizando el método `query` directamente y luego procesando la respuesta.
2. Nuevo hook `useQuery` de React con React. (Recomendado)

### Hook useQuery de React con Apollo
El método recomendado es utilizar el hook `useQuery` de React, en el que solo se pasará la consulta de GraphQL, y el hook `useQuery` de React obtendrá los datos de forma automática.

¡Genial! Ahora vamos a definir la consulta de graphql que vamos a utilizar:

Abra `src/components/Todo/TodoPrivateList.js` y añada el siguiente código:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPrivateList.js" text="src/components/Todo/TodoPrivateList.js" />

```javascript
import React, { useState, Fragment } from "react";
+ import { gql } from '@apollo/client';

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

+ const GET_MY_TODOS = gql`
+  query getMyTodos {
+    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
+      id
+      title
+      created_at
+      is_completed
+  }
+ }`;
```

Ya hemos escrito la consulta de graphql en forma de constante de javascript, utilizando la función `gql` de análisis. Esta función se utiliza para analizar la cadena simple como consulta de graphql.

¿Qué hace esta consulta?
------------------------
La consulta obtiene `todos` con una condición sencilla; `is_public` ha de ser falso. Clasificamos las tareas pendientes de forma descendente según su hora `created_at` de acuerdo al esquema. Especificamos qué campos necesitamos para el nodo de tareas pendientes.

La consulta ya está lista, ahora la incorporaremos con nuestro código React.

```javascript

+ import { useQuery } from '@apollo/client';

```

`useQuery`El hook de React se está importando desde `@apollo/client`

```javascript

import React, { Component, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
      id
      title
      created_at
      is_completed
  }
}`;

const TodoPrivateList = props => {
  ...
}

+ const TodoPrivateListQuery = () => {
+   const { loading, error, data } = useQuery(GET_MY_TODOS);
+
+   if (loading) {
+     return <div>Loading...</div>;
+   }
+   if (error) {
+     console.error(error);
+     return <div>Error!</div>;
+   }
+   return <TodoPrivateList todos={data.todos} />;
+ };

export default TodoPrivateList;
```

Recuerde que hemos envuelto nuestro componente de la aplicación con `<ApolloProvider>` y pasado `client` como prop. `useQuery` El hook de React utiliza el mismo cliente.

Estamos importando el hook React `useQuery` de `@apollo/client` y la consulta graphql que hemos definido antes para obtener los datos de las tareas pendientes.

Vamos a eliminar los datos del simulacro de `todos` que se utilizaron para rellenar los datos de muestra.

```javascript

const TodoPrivateList = props => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false,
-    todos: [
-      {
-        id: "1",
-        title: "This is private todo 1",
-        is_completed: true,
-        is_public: false
-      },
-      {
-        id: "2",
-        title: "This is private todo 2",
-        is_completed: false,
-        is_public: false
-      }
-    ]
  });

  const filterResults = filter => {
    setState({
      ...state,
      filter: filter
    });
  };

  const clearCompleted = () => {};

-    let filteredTodos = state.todos;
+    const {todos} = props;
+
+    let filteredTodos = todos;
    if (state.filter === "active") {
-     filteredTodos = state.todos.filter(todo => todo.is_completed !== true);
+     filteredTodos = todos.filter(todo => todo.is_completed !== true);
    } else if (state.filter === "completed") {
-     filteredTodos = state.todos.filter(todo => todo.is_completed === true);
+     filteredTodos = todos.filter(todo => todo.is_completed === true);
    }

    const todoList = [];
    filteredTodos.forEach((todo, index) => {
      todoList.push(<TodoItem key={index} index={index} todo={todo} />);
    });

    return (
      ...
    );

};

```

Por último, actualice las exportaciones.

```javascript
- export default TodoPrivateList;
+ export default TodoPrivateListQuery;
+ export {GET_MY_TODOS};
```

¡Hurra! Acaba de escribir su primera integración de GraphQL con React. Es fácil, ¿verdad?

¿Cómo funciona?
-------------------
Cuando utilizamos el hook `useQuery` de React, Apollo devuelve los datos junto con otras propiedades. Los más importantes son:

`loading`: Un booleano que indique si la solicitud está en camino. Si la carga es verdadera, entonces la solicitud no ha terminado. Normalmente, esta información puede utilizarse para mostrar un spinner de carga.

`error`: Un error de tiempo de ejecución con graphQLErrors y propiedades de graphQLErrors. Contiene información sobre lo que ha ido mal con su consulta.

`data`: Un objeto que contiene el resultado de su consulta de GraphQL. Contendría nuestros datos originales del servidor. En nuestro caso, serían los datos de las tareas pendientes.

Puede obtener más información sobre otras propiedades contenidas en el objeto resultante [aquí](https://www.apollographql.com/docs/react/data/queries/)

Al utilizar la propiedad `data` estamos analizando los resultados del servidor. En nuestra consulta, la propiedad `data` tiene una matriz `todos` que puede ser mapeada para renderizar cada `TodoItem`.

Como habrá notado, se ha dado algún filtrado del lado del cliente a las tareas pendientes mostradas.
