---
title: "Create Subscription and Render Result"
metaTitle: "Apollo useSubscription React hook | Next.js GraphQL Serverless Tutorial"
metaDescription: "Integrate React Apollo useSubscription hook to watch for changes in realtime data. We use GraphQL subscriptions as an example to get live data in the React app"
---

import GithubLink from "../../src/GithubLink.js";

So let's define the graphql subscription to be used.

Open `components/OnlineUsers/OnlineUsersWrapper.js` and add the following code, below the other imports.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/nextjs/app-final/components/OnlineUsers/OnlineUsersWrapper.js" text="components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React, { useEffect, useState } from "react";
+ import React, { useEffect, Fragment, useState } from "react";
- import { useMutation } from "@apollo/client";
+ import { useMutation, useSubscription, gql } from "@apollo/client";
```

We are importing the `useSubscription` React hook from `@apollo/client` and the graphql subscription query we defined above to fetch the online user data.

Now, we will use the `useSubscription` React hook passing the subscription query:

```javascript
+ const { loading, error, data } = useSubscription(
+     gql`
+       subscription getOnlineUsers {
+         online_users(order_by: { user: { name: asc } }) {
+           id
+           user {
+             name
+           }
+         }
+       }
+     `
+   );
+ 
+   if (loading) {
+     return <span>Loading...</span>;
+   }
+   if (error) {
+     console.error(error);
+     return <span>Error!</span>;
+   }
+   if (data) {
+     onlineUsersList = data.online_users.map(u => (
+       <OnlineUser key={u.id} user={u.user} />
+     ));
+   }
+ 
+   return (
+     <div className="onlineUsersWrapper">
+       <Fragment>
+         <div className="sliderHeader">
+           Online users - {onlineUsersList.length}
+         </div>
+         {onlineUsersList}
+       </Fragment>
+     </div>
+   );
+ };

export default OnlineUsersWrapper;

```

Now that we have the real data, let's remove the mock online user state

```javascript
const OnlineUsersWrapper = () => {
-  const onlineUsers = [{ name: "someUser1" }, { name: "someUser2" }];
-
-  const onlineUsersList = [];
-  onlineUsers.forEach((user, index) => {
-    onlineUsersList.push(<OnlineUser key={index} index={index} user={user} />);
-  });
-
-  return (
-    <div className="onlineUsersWrapper">
-      <div className="sliderHeader">Online users - {onlineUsers.length}</div>
-      {onlineUsersList}
-    </div>
-  );
};
```

How does this work?
-------------------

We are using the `useSubscription` React hook which returns properties (similar to `useQuery` and `useMutation` React hooks). The `data` property gives the result of the realtime data for the query we have made.

Refresh your app and see yourself online! Don't be surprised; There could be other users online as well.

Awesome! You have completed implementations of a GraphQL Query, Mutation and Subscriptions.
