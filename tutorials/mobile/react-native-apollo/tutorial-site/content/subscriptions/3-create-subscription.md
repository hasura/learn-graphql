---
title: "Create Subscription and Render Result"
metaTitle: "Create Subscription and Render Result | GraphQL React Native Apollo Tutorial"
metaDescription: "Integrate React Apollo useSubscription hook to watch for changes in realtime data. We use GraphQL subscriptions as an example to get live data in the React Native app"
---

import GithubLink from "../../src/GithubLink.js";

So let's define the graphql subscription to be used.

Open `src/screens/UsersScreen.js` and add the following code, below the other imports

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/UsersScreen.js" text="UserScreen.js" />

```javascript
import {useSubscription} from '@apollo/react-hooks';
```

Import `gql` from `graphql-tag` and define the subscription query:

```js
+ import gql from 'graphql-tag';


+ const SUBSCRIBE_TO_ONLINE_USERS = gql`
+   subscription {
+     online_users(order_by: {user: {name: asc}}) {
+       user {
+         name
+         id
+       }
+       id
+     }
+   }
+`; 
```

We are importing the `useSubscription` hook from `@apollo/react-hooks` and the graphql subscription query we defined above to fetch the online user data. The `useSubscription` hook behaves similar to the `useQuery` hook. It accepts the GraphQL subscription and returns `data`, `error` and `loading` information, except, `data` is realtime data.

Replace the component's body with this code.


```javascript
-   const data = {
-      "online_users": [
-        {
-          user: {
-            name: "User 1",
-            id: 1
-          },
-          id: 1
-        },
-        {
-          user: {
-            name: "User   2",
-            id: 2
-          },
-          id: 2
-        },
-      ]
-   }

+  const { data, error, loading } = useSubscription(SUBSCRIBE_TO_ONLINE_USERS)

+  if (loading) { return <CenterSpinner />}

+  if (error) {
+    return <Text> Error </Text>
+  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
      <FlatList
        data={data.online_users}
        renderItem={({item}) => <UserItem item={item} />}
        keyExtractor={(item) => item.user.name}
      />
      </ScrollView>
    </View>
  );
```

Refresh your app and see yourself online! Don't be surprised; There could be other users online as well.

Awesome! You have completed implementations of a GraphQL Query, Mutation and Subscriptions.
