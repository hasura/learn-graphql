---
title: "Remove todos - Integration"
metaTitle: "Apollo useMutation hook for GraphQL mutation delete | GraphQL React Native Apollo Tutorial"
metaDescription: "We will use the Apollo useMutation hook with variables as an example to delete existing data and update cache automatically"
---

import GithubLink from "../../src/GithubLink.js";

Let us integrate the remove todos feature in our React Native app. Firstly import `gql` and define the mutation in `src/screens/components/Todo/TodoItem.js`.


<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/TodoItem.js" text="TodoItem.js"/>

```js
+ const REMOVE_TODO = gql`
+  mutation ($id: Int) {
+    delete_todos (
+      where: {
+        id: {
+          _eq: $id
+        }
+      }
+    ) {
+      affected_rows
+    }
+  }
+`;
```

Firstly use the `useMutation` hook with the above mutation to generate the `deleteTodo` function.

```js
+  const [deleteTodo, { loading: deleting, error: deleteError }] = useMutation(REMOVE_TODO);
```

Now, in the `TodoItem` component, update the `deleteButton` function to use the `deleteTodo` function from the `useMutation` hook. We also have to update the cache with the todo removal in this case. So we will also write an `updateCache` function that we will remove this todo from the UI cache.

```js
+import { FETCH_TODOS } from './Todos';
```

```js
  const deleteButton = () => {

    if (isPublic) return null;

+    const updateCache = (client) => {
+      const data = client.readQuery({
+        query: FETCH_TODOS,
+        variables: {
+          isPublic,
+        }
+      });
+      const newData = {
+        todos: data.todos.filter((t) => t.id !== item.id)
+      }
+      client.writeQuery({
+        query: FETCH_TODOS,
+        variables: {
+          isPublic,
+        },
+        data: newData
+      });
+    }

    const remove = () => {
      if (deleting) return;
+      deleteTodo({
+        variables: { id: item.id },
+        update: updateCache
+      });
+    };

    return (
      <View style={styles.deleteButton}>
        <Icon
          name="delete"
          size={26}
          onPress={remove}
+          disabled={deleting}
          color={"#BC0000"}
        />
      </View>
    );
  }

```

This was done similar to the `insert_todos` mutation. We have also updated the cache in the `update` function. With this, we have a fully functional todo app working :)
