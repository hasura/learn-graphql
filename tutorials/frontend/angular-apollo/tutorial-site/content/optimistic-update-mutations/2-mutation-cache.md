---
title: "Mutation and update cache"
metaTitle: "Apollo apollo.mutate for GraphQL mutation update | GraphQL Angular Apollo Tutorial"
metaDescription: "We will use the Apollo apollo.mutate from apollo-angular as an example to modify existing data and update cache locally using readQuery and writeQuery and handle optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Now let's do the integration part. Open `src/app/Todo/TodoItem.ts` and add the following code below the other imports:

```typescript
+ import { Apollo, gql } from 'apollo-angular';
```
Let's define the graphql mutation to update the completed status of the todo

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/angular-apollo/app-final/src/app/Todo/TodoItem.ts" text="src/app/Todo/TodoItem.ts" />

```typescript
import { Component, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

+  const TOGGLE_TODO = gql`
+    mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
+      update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
+        affected_rows
+      }
+    }
+  `;


```

### Apollo apollo.mutate
We need to call `apollo.mutate` to make the mutation.

```typescript
  import { Component, Input } from '@angular/core';
+ import { Apollo,gql } from 'apollo-angular';

  export class TodoItem {
    @Input() todo: any;

+   constructor(private apollo: Apollo) {}
    ...
  }
```

We already have the onChange handler toggleTodo for the input. Let's update the function to make a mutation.

```javascript
  const toggleTodo = () => {
+    this.apollo.mutate({
+          mutation: TOGGLE_TODO,
+          variables: {id: this.todo.id, isCompleted: !this.todo.is_completed},
+        }).subscribe(({ data }) => {
+          console.log('got data', data);
+        },(error) => {
+          console.log('there was an error sending the query', error);
+        });
+      };
```

The above code will just make a mutation, updating the todo's is_completed property in the database.
To update the cache, we will be using the `update` function again to modify the cache. We need to fetch the current list of todos from the cache before modifying it. So let's import the query.

```typescript
+ import { GET_MY_TODOS } from './TodoPrivateList';
```
Now let's add the code for `update` function.

```typescript
  toggleTodo() {
    this.apollo.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: this.todo.id, isCompleted: !this.todo.is_completed },
+       update: (cache) => {
+          const existingTodos : any = cache.readQuery({ query: GET_MY_TODOS });
+          const newTodos = existingTodos.todos.map(t => {
+            if (t.id === this.todo.id) {
+              return { ...t, is_completed: !t.is_completed };
+            } else {
+              return t;
+            }
+          });
+          cache.writeQuery({
+            query: GET_MY_TODOS,
+            data: {todos: newTodos}
+          });
+        },
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
```

We are fetching the existing todos from the cache using `cache.readQuery` and updating the is_completed value for the todo that has been updated.

Finally we are writing the updated todo list to the cache using `cache.writeQuery`.
