---
title: "Load more todos integration"
metaTitle: "Load more todos integration | GraphQL React Native Apollo Tutorial"
metaDescription: "In this step, you will do the integration for load more todos with the GraphQL query and Apollo setup."
---

import GithubLink from "../../src/GithubLink.js";

In the last section, we modified the query that fetches all the todos to fetch only 10 todos on first load. We also wrote another query that fetches older todos. Now let us implement a button that loads older todos on press. Go to `src/screens/components/Todo/LoadOlder.js`, import `gql` from `graphql-tag` and define the query that we wrote in the last section:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/LoadOlder.js" text="LoadOlder.js"/>

```js
+ import gql from 'graphql-tag';


+const FETCH_OLD_TODOS = gql`
+query ($lastId: Int, $isPublic: Boolean){
+  todos (
+    order_by: {
+      id: desc
+    },
+   where: {
+     _and: {
+       is_public: { _eq: $isPublic},
+      id: { _lt: $lastId}
+     }
+   },
+   limit: 10
+ ) {
+   id
+   title
+   is_completed
+   created_at
+   is_public
+   user {
+     name
+   }
+ }
+}
+`
```

We need the apollo client instance to make queries and mutations manually. Just import `withApollo` from `react-apollo` and wrap the `LoadOlder` component with it before while exporting. `withApollo` helps us inject the `client` instance as a prop in our `TodoItem` component. At the very bottom of the file:

```js
+import { withapollo } from 'react-apollo'
```

```js
-export default loadolder;
+export default withapollo(loadolder);
```

Also import the `FETCH_TODOS` query.

```
import { FETCH_TODOS } from './Todos'
```

Now write a function in the `LoadOlder` component.

```js
+  const fetchOlderTodos = async () => {
+    const { client } = props;
+    const data = client.readQuery({
+      query: FETCH_TODOS,
+      variables: {
+        isPublic,
+      }
+    });
+    const numTodos = data.todos.length;
+    setDisabled(true);
+    setLoading(true);
+    const response = await client.query({
+      query: FETCH_OLD_TODOS,
+      variables: {
+        isPublic,
+        lastId: numTodos === 0 ? 0 : data.todos[numTodos - 1].id
+      },
+    });
+    setLoading(false);
+    if (!response.data) {
+      setDisabled(false)
+      return;
+    }
+    if (response.data.todos) {
+      client.writeQuery({
+        query: FETCH_TODOS,
+        variables: {
+          isPublic
+        },
+        data: { todos: [ ...data.todos, ...response.data.todos]}
+      });
+      if (response.data.todos.length < 10) {
+        setButtonText('No more todos');
+        setDisabled(true);
+      } else {
+        setButtonText('Load more todos');
+        setDisabled(false);
+      }
+    } else {
+      setButtonText('Load more todos');
+    }
+  }
```

The `fetchOlderTodos` function does the following:

1. Reads the cache to get the data for query `FETCH_TODOS` and store it in a variable called `data`
2. Makes a GraphQL query to get 10 todos older than the oldest todo in the cache
3. Gets data and updates the apollo cache with the newly received todos. All the `Query` components subscribed to this cache are updated after this update
4. Sets an appropriate button text (`No more todos` if less than 10 todos were fetched, or `Load more todos` if `10` todos were fetched).

Finally, integrate this function into the JSX such that it is invoked whenever the button is pressed.

```js
<TouchableOpacity
  style={styles.pagination}
+ onPress={fetchOlderTodos}
  disabled={disabled}
> 
  {
    loading ?
    <CenterSpinner /> :
    <Text style={styles.buttonText}>
      {buttonText}
    </Text>
  }
</TouchableOpacity> 
```

The pagination functionality should be working now :)


