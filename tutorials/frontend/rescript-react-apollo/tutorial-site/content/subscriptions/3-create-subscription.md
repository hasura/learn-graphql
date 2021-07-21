---
title: "Create Subscription and Render Result"
metaTitle: "Create Subscription and Render Result | ReScript React Apollo GraphQL Tutorial"
metaDescription: "Integrate React Apollo useSubscription hook to watch for changes in realtime data. We use GraphQL subscriptions as an example to get live data in the React app"
---

Let's create a ReScript module for online users subscription query

```reason
module OnlineUsersSubscription = %graphql(`
  subscription getOnlineUsers {
    online_users(order_by: [{ user: { name: asc } }]) {
      id
      user {
        name
      }
    }
  }
`)
```

We can integrate the subscription query in react query as shown below.

```reason
@react.component
let make = () => {
  let onlineUsersResult = OnlineUsersSubscription.use()

  switch onlineUsersResult {
  | {loading: true} => <span> {React.string("Loading...")} </span>
  | {data: Some({online_users})} => <OnlineUsers online_users={online_users} />
  | {error: Some(_error)} => <span> {React.string("Error!")} </span>
  }
}
```

## How does this work?

Since `OnlineUsersSubscription` is a GraphQL subscription query, `OnlineUsersSubscription.use()` uses `useSubscription` React hook of Apollo. We are using the `useSubscription` React hook which returns properties (similar to `useQuery` and `useMutation` React hooks). The `data` property gives the result of the realtime data for the query we have made.

Refresh your react app and see yourself online! Don't be surprised; There could be other users online as well.

Awesome! You have completed implementations of a GraphQL Query, Mutation and Subscriptions.
