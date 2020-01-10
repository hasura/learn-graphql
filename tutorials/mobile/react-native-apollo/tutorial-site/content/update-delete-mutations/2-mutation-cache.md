---
title: "Update mutation and automatic cache updates"
metaTitle: "Apollo useMutation hook for GraphQL mutation update | GraphQL React Native Apollo Tutorial"
metaDescription: "We will use the Apollo useMutation hook as an example to modify existing data and update cache automatically and handle optimisticResponse"
---

import GithubLink from "../../src/GithubLink.js";

Now let's do the integration part. Open `src/screens/components/Todo/TodoItem.js` and add the following code below the other imports:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/TodoItem.js" text="TodoItem.js"/>

```javascript
+import gql from 'graphql-tag';
```
Let's define the graphql mutation to update the completed status of the todo

```javascript
+const UPDATE_TODO = gql`
+  mutation ($id: Int, $isCompleted: Boolean) {
+    update_todos (
+      _set: {
+        is_completed: $isCompleted
+      },
+      where: {
+        id: {
+          _eq: $id
+        }
+      }
+    ) {
+      returning {
+        id
+        title
+        is_completed
+        created_at
+        is_public
+      }
+    }
+  }
+`;
```


Firstly let us get the `updateTodo` function by using the `useMutation` hook with the above query.

```js
+  const [updateTodo, { loading: updating, error: updateError }] = useMutation(UPDATE_TODO);
```

Now, in the `TodoItem` component, modify the `updateCheckbox` function to use the `updateTodo` function for toggling todos.


```js
const updateCheckbox = () => {
  if (isPublic) return null;
  const update = () => {
+    if (updating) return;
+    updateTodo({
+      variables: {
+        id: item.id,
+        isCompleted: !item.is_completed
+      }
+    });
  }
  return (
    <TouchableOpacity
      style={item.is_completed ? styles.completedCheckBox : styles.checkBox}
+      disabled={updating}
      onPress={update}
    >
      {null}
    </TouchableOpacity>
  )
}
```

The above code will just make a mutation, updating the todo's is_completed property in the database. If you see in the above code snippet, we are not doing anything to updating the cache, but if you try it out, the mutation succeeds and the UI is also updated.

This happens because, in case of update mutation, apollo client tries to keep the cache fresh by performing automatic updates using the following strategy:

1. It looks at the `id` and `__typename` of the mutation response
2. It looks for the objects in the cache that have `id` and `__typename` similar to the ones in the mutation response.
3. If there is a match, it updates the cache with the data from the mutation response

Hence we don't have to manually update the cache just like we did in case of insert mutation.

