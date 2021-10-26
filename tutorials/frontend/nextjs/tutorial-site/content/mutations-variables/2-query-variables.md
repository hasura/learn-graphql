---
title: "Query Variables"
metaTitle: "Passing GraphQL Variables in Queries | Next.js GraphQL Serverless Tutorial"
metaDescription: "An Example of passing variables in GraphQL context and usage of Apollo GraphQL Mutation variables in React app."
---

import GithubLink from "../../src/GithubLink.js";

What is a variable in GraphQL context?
-------------------------------------
GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables. In our case, we are defining the object to be inserted as a mutation.

So let's define the graphql mutation to be used.

Open `components/Todo/TodoInput.js` and add the following code:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/nextjs/app-final/components/Todo/TodoInput.js" text="components/Todo/TodoInput.js" />

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

What does this mutation do?
---------------------------
The mutation inserts into `todos` table with the $objects variable being passed as one todo type.

Awesome! We have defined our first graphql mutation.
