---
title: "Variables de consulta"
metaTitle: "Pasar las variables GraphQL en las consultas | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Un ejemplo de cómo pasar variables en el contexto GraphQL y del uso de variables de Mutación Apollo GraphQL en la aplicación React."
---

import GithubLink from "../../src/GithubLink.js";

¿En qué consiste una variable en el contexto GraphQL?
-------------------------------------
GraphQL tiene una manera genial de factorizar los valores dinámicos fuera de la consulta, y de pasarlos como diccionarios independientes. Estos valores se denominan variables. En nuestro caso, vamos a definir el objeto que va a insertarse como mutación.

Vamos entonces a definir la mutación Graphql a utilizar.

Abra `src/components/Todo/TodoInput.js` y añada el siguiente código:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoInput.js" text="src/components/Todo/TodoInput.js" />

```javascript
import React from 'react';
+ import { gql } from "@apollo/client";

+ const ADD_TODO = gql `
+  mutation ($todo: String!, $isPublic: Boolean!) {
+    insert_todos(objects: {title: $todo, is_public: $isPublic}) {
+      affected_rows
+      returning {
+        id
+        title
+        created_at
+        is_completed
+      }
+    }
+  }
+ `;

const TodoInput = ({isPublic=false}) => {
  return (
    <form className="formInput" onSubmit={(e) => {
      e.preventDefault();
    }}>
      <input
        className="input"
        placeholder="What needs to be done?"
      />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
```

¿Qué hace esta mutación?
---------------------------
La mutación se inserta en la tabla `todos` con la variable $objets, que es pasada como un tipo de tarea pendiente.

¡Maravilloso! Acabamos de definir nuestra primera mutación Graphql.
