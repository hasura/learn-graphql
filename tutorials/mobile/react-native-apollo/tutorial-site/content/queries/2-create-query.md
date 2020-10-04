---
title: "useQuery hook"
metaTitle: "Apollo useQuery hook | GraphQL React Native Apollo Tutorial"
metaDescription: "We will use the Apollo Client useQuery hook to make GraphQL queries and handle the loading and error states"
---

import GithubLink from "../../src/GithubLink.js";

In this section, we will implement GraphQL Queries and integrate with the react native UI.
With Apollo Client, you can send queries in 2 different ways.

1. Using the `query` method directly and then process the response.
2. The `useQuery` hook. (Recommended)

The recommended method is to use the `useQuery` hook where you just pass your GraphQL query and variables and you receive the GraphQL response data in stateful variables.

Great! Now let's define the graphql query to be used:

Open `src/screens/components/Todo/Todos.js` and add the following code:


<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/components/Todo/Todos.js" text="Todos.js" />

```javascript
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
+ import gql from 'graphql-tag';
import TodoItem from './TodoItem';
import LoadOlder from './LoadOlder';
import LoadNewer from './LoadNewer';
import CenterSpinner from '../Util/CenterSpinner';

+ export const FETCH_TODOS = gql`
+ query {
+   todos (
+     order_by: {
+       created_at: desc
+     },
+     where: { is_public: { _eq: false} }
+   ) {
+     id
+     title
+     is_completed
+     created_at
+     is_public
+     user {
+       name
+     }
+   }
+ }
`;
```

We have now written the graphql query as a javascript constant using the `gql` parser function. This function is used to parse the plain string as a graphql query.

What does this query do? 
------------------------
The query fetches `todos` with a simple condition; `is_public` must be false. We sort the todos descending by its `created_at` time according to the schema. We specify which fields we need for the todos node.

[Try](https://hasura.io/learn/graphql/graphiql?tutorial=react-native) out this query now!

Introducing query variables
---------------------------

As you see, we have explicitly mentioned that `is_public` must be false. But in order to reuse this query for private and public todos, we must parameterize this query using `query variables`. Lets define a boolean query variable called `is_public`. The GraphQL query would fetch public todos if `is_public` is true and personal todos if `is_public` is false. Change it in the code as follows:

```graphql
- query {
+ query ($isPublic: Boolean) {
+   todos (
+     order_by: {
+       created_at: desc
+     },
-     where: { is_public: { _eq: false} }
+     where: { is_public: { _eq: $isPublic} }
+   ) {
+     id
+     title
+     is_completed
+     created_at
+     is_public
+     user {
+       name
+     }
+   }
+ }
```

Great! The query is now ready, let's integrate it with our react native code. Currently, we are just rendering some dummy data. Let us remove this dummy data and render the UI based on our GraphQL response. Firstly, lets import the `useQuery` hook from `@apollo/react-hooks`.

```js

+ import { useQuery } from '@apollo/react-hooks';

```

Now, inside the render method, get GraphQL data from the `useQuery` hook and render it:


```js
-  const data = {
-    todos: [
-      {
-        id: "1",
-        title: "This is todo 1",
-        is_completed: true,
-        is_public: isPublic,
-        user: {
-          id: "1",
-          name: "user1"
-        }
-      },
-      {
-        id: "2",
-        title: "This is todo 2",
-        is_completed: false,
-        is_public: isPublic,
-        user: {
-          id: "2",
-          name: "user2"
-        }
-      }
-    ]
-  }
+  const { data, error, loading } = useQuery(
+    FETCH_TODOS,
+    {
+      variables: { isPublic }
+    }
+  );

+  if (!data) return null;

   return (
     <View style={styles.container}>
       <LoadNewer show={newTodosExist && isPublic} toggleShow={dismissNewTodoBanner} styles={styles} isPublic={isPublic}/>
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
   );

```

Remember that we wrapped our App component with `<ApolloProvider>` and passed `client` as a prop. We are using the same client prop to send it down to the components.

We are importing the `useQuery` hook from `@apollo/react-hooks` and the graphql query we defined above to fetch the todo data.

`useQuery` is a hook that makes the GraphQL query as a side-effect and returns `data`, `loading` and `error` which contain the GraphQL response, the request state and the request error respectively. It also caches the `data` in memory so that whenever `useQuery` is called again, the data from this cache is used.

Woot! You have written your first GraphQL integration with React. Easy isn't it?

How does this work?
-------------------

As mentioned above, `useQuery` returns `data`, `error` and `loading`:

`loading`: A boolean that indicates whether the request is in flight. If loading is true, then the request hasn't finished. Typically this information can be used to display a loading spinner.

`error`: A runtime error with graphQLErrors and networkError properties. Contains information about what went wrong with your query.

`data`: An object containing the result of your GraphQL query. This will contain our actual data from the server. In our case, it will be the todo data.

You can read more about other render props that Apollo passes [here](https://www.apollographql.com/docs/react/data/queries/).

Using the `data`, we are parsing the results from the server. In our query, `data` prop has an array `todos` which can be mapped over to render each `TodoItem`.

If you noted, there has been some client side filtering to the todos that are displayed.
