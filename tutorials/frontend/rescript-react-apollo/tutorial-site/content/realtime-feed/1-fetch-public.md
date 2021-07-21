---
title: "Fetch public todos - subscription"
metaTitle: "Fetch public todos using Subscription | ReScript React Apollo GraphQL Tutorial"
metaDescription: "You will learn how to make use of GraphQL Subscriptions to get notified whenever a new todo comes in React app"
---

import GithubLink from "../../src/GithubLink.js";

Now let's define the subscription query to get notified about new public todos

Create a new file with name `src/components/Todo/NotifyNewPublicTodosSubscription.res` and add the following query.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/Todo/NotifyNewPublicTodosSubscription.res" text="src/components/Todo/NotifyNewPublicTodosSubscription.res" />

```reason
let make = %graphql(`
  subscription {
    todos(
      where: { is_public: { _eq: true } }
      limit: 1
      order_by: [{ created_at: desc }]
    ) {
      id
      title
      created_at
      is_completed
      user {
        name
      }
    }
  }
`)
```

Creating a new file for this query will help us reference this query module in other modules easily.

## What does the Subscription do?

The query fetches `todos` with a simple condition; `is_public` must be true. We also limit the number of todos to 1, since we would just like to get notified whenever a new todo comes in.
We sort the todos by its latest created_at time according to the schema. We specify which fields we need for the todos node.

Now let's create a React components that uses this subscription query.

Create a file with name `src/components/Todo/TodoPublicListSubscription.res` and add the following code.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/Todo/TodoPublicListSubscription.res" text="src/components/Todo/TodoPublicListSubscription.res" />

```reason
@react.component
let make = () => {
  let newTodoSubscriptionResult = NotifyNewPublicTodosSubscription.use()
  switch newTodoSubscriptionResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos})} =>
    <TodoPublicList latestTodo={Js.Array.length(todos) > 0 ? Some(todos[0]) : None} />
  | {error: Some(_error)} => <div> {React.string("Error!")} </div>
  | {data: None, error: None, loading: false} => React.null
  }
}
```

This component subscribes to the new public todos and passes `latestTodo` as prop to `TodoPublicList`

Now, we can render `TodoPublicListSubscription` instead of `TodoPublicList` in `TodoPublicWrapper` component.
