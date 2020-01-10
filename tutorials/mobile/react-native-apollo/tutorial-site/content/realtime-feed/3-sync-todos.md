---
title: "Sync new todos"
metaTitle: "Sync new todos in public feed | GraphQL React Native Apollo Tutorial"
metaDescription: "You will learn how to sync new todos added by other people in the public feed by fetching older and newer data using GraphQL Queries"
---

import GithubLink from "../../src/GithubLink.js";

In the previous section we made a button that shows up only when there are new public todos in the database. Now lets make this button functional i.e. on pressing this button, newer todos should be fetched from the backend, synced with the local todos and the button must be dismissed.

Go to `src/screens/components/Todo/LoadNewer.js`, import `gql` and define the query to fetch newer todos.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/LoadNewer.js" text="LoadNewer.js"/>

```js
+ import gql from 'graphql-tag';

+ const FETCH_NEW_TODOS = gql`
+ query ($lastId: Int){
+  todos (
+    order_by: {
+      id: desc
+    },
+    where: {
+      _and: {
+        is_public: { _eq: true},
+        id: { _gt: $lastId}
+      }
+    }
+  ) {
+    id
+    title
+    is_completed
+    created_at
+    is_public
+    user {
+      name
+    }
+  }
+}
+`;
```

Import the `FETCH_TODOS` query so that we can read its local cache and update it with newer todos.

```js
+ import { FETCH_TODOS } from './Todos';
```

Also wrap the `LoadNewerButton` component in `withApollo` so that we receive the `client` prop.

```js
+ import { withApollo } from 'react-apollo';

// LoadNewer.js

export default withApollo(LoadNewerButton);
```

Let us initialise a new state variables that contain the button text and loading.;

Now, whenever the button is pressed, we wish to make the `FETCH_NEW_TODOS` query and add the data to cache. Lets write a function that does just that. 

```js
const LoadNewerButton = ({ isPublic, ...props}) => {
  const [buttonText, setButtonText] = React.useState('New tasks have arrived');
  const [loading, setLoading] = React.useState(false);

+  const fetchNewerTodos = async () => {
+    const { client } = props;
+    const data = client.readQuery({
+      query: FETCH_TODOS,
+      variables: {
+        isPublic,
+      }
+    });
+    const lastId = data.todos[0].id;
+    setLoading(true);
+    const resp = await client.query({
+      query: FETCH_NEW_TODOS,
+      variables: { lastId }
+    });
+    setLoading(false);
+    if (resp.data) {
+      const newData = {
+        todos: [ ...resp.data.todos, ...data.todos]
+      }
+      client.writeQuery({
+        query: FETCH_TODOS,
+        variables: {
+          isPublic,
+        },
+        data: newData
+      });
+      props.toggleShow();
+    }
+  }
  if (!show) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.pagination}
+      onPress={fetchNewerTodos}
      disabled={loading}
    > 
      {
        loading ?
        <CenterSpinner /> :
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      }
    </TouchableOpacity> 
  )

}
```

With this, your fully functional realtime todo app is ready.
