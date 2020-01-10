---
title: "Detect new todos - integration"
metaTitle: "Fetch public todos using Subscription | GraphQL React Native Apollo Tutorial"
metaDescription: "You will learn how to make use of GraphQL Subscriptions to get notified whenever a new todo comes in React app. We use withApollo HOC"
---

import GithubLink from "../../src/GithubLink.js";

Go to `src/screens/components/Todos`.

For running a custom subscription, we need access to our `ApolloClient` instance. To do that, we convert our `Todos` component into an Apollo HOC by wrapping it in `withApollo`.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/Todos.js" text="Todos.js"/>

```js
+ import { withApollo } from 'react-apollo'

// Todos.js

- export default Todos;
+ export default withApollo(Todos);
```

Once the component is an Apollo HOC, you receive the instance of Apollo client as a prop called `client`.

Now let us define our subscription at the top level:

```js
+const SUBSCRIBE_TO_NEW_TODOS = gql`
+subscription {
+  todos (
+    order_by: {
+      created_at: desc
+    }
+    limit: 1
+    where: { is_public: { _eq: true }}
+  ) {
+    id
+    created_at
+  }
+}
`;
```

Firstly, let us declare a boolean state variable that holds the information whether new todos exist in the database. Then, using the above subscription, lets write a function called `subscribeToNewTodos` that subscribes to the last public todo in the database. We will start this subscription after the first mount of the `Todos` component. We will use the `useEffect` hook for this.


```js
const Todos = ({ isPublic, ...props }) => {

+  const [newTodosExist, setNewTodosExist] = React.useState(false)

+  const subscribeToNewTodos = () => {
+    const { client } = props;
+    if (isPublic) {
+      client.subscribe({
+        query: SUBSCRIBE_TO_NEW_TODOS,
+      }).subscribe({
+        next: (event) => {
+          if (event.data.todos.length) {
+            let localData;
+            try {
+              localData = client.readQuery({
+                query: FETCH_TODOS,
+                variables: {
+                  isPublic: true,
+                }
+              });
+            } catch (e) {
+              return;
+            } 
+            
+            const lastId = localData.todos[0] ? localData.todos[0].id : 0;
+            if (event.data.todos[0].id > lastId) {
+              setNewTodosExist(true)
+            }
+          }
+        },
+        error: (err) => {
+          console.error("err", err);
+        }
+      })
+    }
+  };

+  React.useEffect(subscribeToNewTodos, []);

}
```

The `subscribeToNewTodos` does the following:

1. Starts a subscription to the last todo in the database
2. Whenever data is received, it looks at the todos in Apollo cache and checks if the todo received via subscription is newer than the newest todo in the cache.
3. If the todo received in subscription data has `id` greater than the `id` of the newest todo in the cache, it sets a local state saying `{ newTodosExist: true }`

If new todos exist, we wish to show a button, pressing which, new todos will be loaded. So edit the JSX like:

```js
  <View style={styles.container}>
-    <LoadNewer show={isPublic} styles={styles} isPublic={isPublic}/>
+    <LoadNewer show={newTodosExist && isPublic} styles={styles} isPublic={isPublic}/>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
      <FlatList
        data={data.todos}
        renderItem={({item}) => <TodoItem item={item} isPublic={isPublic}/>}
        keyExtractor={(item) => item.id.toString()}
      />
      <LoadOlder
        isPublic={isPublic}
        styles={styles}
      />
    </ScrollView>
  </View>
```

If you check the app now, this button would be shown only if there are todos in the database newer than the local todos.

We also need to write a function to dismiss this button (when the new todos are loaded), just write a class level function in the `Todos` component and pass it to the button.


```js

+const dismissNewTodoBanner = () => {
+  setNewTodosExist(false);
+};

```


```js
  <View style={styles.container}>
-    <LoadNewer show={newTodosExist && isPublic} styles={styles} isPublic={isPublic}/>
+    <LoadNewer show={newTodosExist && isPublic} toggleShow={dismissNewTodoBanner} styles={styles} isPublic={isPublic}/>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
      <FlatList
        data={data.todos}
        renderItem={({item}) => <TodoItem item={item} isPublic={isPublic}/>}
        keyExtractor={(item) => item.id.toString()}
      />
      <LoadOlder
        isPublic={isPublic}
        styles={styles}
      />
    </ScrollView>
  </View>
```

Awesome! You are now detecting new todo updates from the backend.

Now lets make this button functional.