---
title: "Variables de consulta"
metaTitle: "Pasando variables de GraphQL en consultas | Tutorial de los ganchos de Apollo de Reacción de GraphQL"
metaDescription: "Ejemplo de variables de paso en el contexto GraphQL y el uso de variables de Mutación Apollo GraphQL en la aplicación React."
---

import GithubLink from "../../src/GithubLink.js";

¿Qué es una variable en el contexto GraphQL?
-------------------------------------
GraphQL tiene una manera de primera clase de factorizar los valores dinámicos fuera de la consulta, y pasarlos como un diccionario separado. Estos valores se llaman variables. En nuestro caso, estamos definiendo el objeto que se insertará como una mutación.

Así que definamos la mutación graphql que se utilizará.

Abre `src/components/Todo/TodoInput.js`y añade el siguiente código:

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
La mutación se inserta en la `todos`tabla con la variable $objects que se pasa como un tipo todo.

¡Impresionante! Hemos definido nuestra primera mutación de graphql
