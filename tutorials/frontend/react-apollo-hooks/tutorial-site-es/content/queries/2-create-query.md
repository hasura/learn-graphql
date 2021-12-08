---
title: "useQuery hook"
metaTitle: "Apollo useQuery Gancho de reacción | GraphQL React Apollo Hooks Tutorial"
metaDescription: "Utilizaremos el gancho de Apollo Client useQuery React de @apollo/client para realizar consultas GraphQL"
---

import GithubLink from "../../src/GithubLink.js";

En esta sección, implementaremos las consultas de GraphQL e integraremos la interfaz de usuario de reacción. Con Apollo Client, puede enviar consultas de 2 maneras diferentes.

1. Usando el `query`método directamente y luego procesa la respuesta.
2. Nuevo gancho de `useQuery`React con React. (Recomendado)

### Apollo useQuery React Hook
El método recomendado es utilizar el gancho `useQuery`React, donde solo pasará su consulta GraphQL y el gancho `useQuery`React obtendrá los datos automáticamente.

¡Genial! Ahora definamos la consulta graphql que se utilizará:

Abre `src/components/Todo/TodoPrivateList.js`y añade el siguiente código:

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

Ahora hemos escrito la consulta graphql como una constante de javascript usando la función de `gql`analizador. Esta función se utiliza para analizar la cadena simple como una consulta de graphql.

¿Qué hace esta consulta?
------------------------
La consulta se encuentra `todos`con una condición simple; `is_public`debe ser falsa. Clasificamos los todos que descienden por su `created_at`tiempo según el esquema. Especificamos qué campos necesitamos para el nodo de todos .

La consulta ya está lista, vamos a integrarla con nuestro código de reacción.

```javascript

+ import { useQuery } from '@apollo/client';

```

`useQuery`El gancho de reacción se está importando desde`@apollo/client`

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

Recuerde que envolvió nuestro componente App con `<ApolloProvider>`y pasamos `client`como un prop.`useQuery` El gancho de reaccionar está usando el mismo cliente.

`@apollo/client`Estamos importando el gancho `useQuery`React y la consulta graphql que hemos definido anteriormente para obtener los datos de todo.

Eliminemos los `todos`datos de la mock que se utilizaron para rellenar los datos de muestra.

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

¡Vaya! Has escrito tu primera integración GraphQL con React. ¿Es fácil?

¿Cómo funciona esto?
-------------------
Cuando utiliza el gancho `useQuery`React, Apollo devuelve los datos junto con otras propiedades. Los más importantes son:

`loading`: Un booleano que indica si la solicitud está en vuelo. Si la carga es verdadera, entonces la solicitud no ha terminado. Normalmente esta información se puede utilizar para mostrar un giro de carga.

`error`: Un error de tiempo de ejecución con graphQLErrors y propiedades de networkError. Contiene información sobre lo que salió mal con su consulta.

`data`: Un objeto que contiene el resultado de su consulta GraphQL. Esto contendrá nuestros datos reales desde el servidor. En nuestro caso, serán los datos todo en cuestión.

Puede leer más sobre otras propiedades que el objeto de resultado contiene [aquí](https://www.apollographql.com/docs/react/data/queries/)

Usando la `data`propiedad, estamos analizando los resultados del servidor. En nuestra consulta, la `data`propiedad tiene un array `todos`que se puede mapear sobre para renderizar cada .`TodoItem`

Si usted ha notado, ha habido algún filtro lateral del cliente a todos que se muestran.
