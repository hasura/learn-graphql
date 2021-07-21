---
title: "Sync new todos"
metaTitle: "Sync new todos in public feed | ReScript React Apollo GraphQL Tutorial"
metaDescription: "You will learn how to sync new todos added by other people in the public feed by fetching older and newer data using GraphQL Queries"
---

Once a new todo is entered in a public list, it needs to appear in the UI. Instead of automatically displaying the todo in the UI, we use a Feed like Notification banner which appears whenever a new todo is received.

Remember that previously we updated the cache using the cache API and the UI got updated automatically, because updating the cache triggered a re-render for those components that were subscribed to this store.

We are not going to use that approach here since we don't want public list UI to be automatically updated.

In the `TodoPublicListSubscription` component of the previous step, we only get the latest todo and not the existing list. We will now write a query to fetch the list of existing public todos.

Create a new file with name `src/components/Todo/PublicTodosQuery.res` and the following query

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/rescript-react-apollo/app-final/src/components/Todo/PublicTodosQuery.res" text="src/components/Todo/PublicTodosQuery.res" />

```reason
let make = %graphql(`
  query ($before: Int, $after: Int, $limit: Int) {
    todos(
      where: { is_public: { _eq: true }, id: { _lt: $before, _gt: $after  } }
      limit: $limit
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

This query will help us fetch the todos and paginate the todo list. We can fetch todos older than certain todo id by passing it as before variable to the query. We can fetch todos newer than certain todo id by passing it as after variable to the query.

let's update the `TodoPublicList` component to fetch todos with the query written above

```reason
@react.component
let make = (~latestTodo: option<NotifyNewPublicTodosSubscription.Inner.t_todos>) => {

+  let (initialTodoId, _) = React.useState(() => {
+    switch latestTodo {
+    | Some(todo) => todo.id + 1
+    | None => 0
+    }
+  })

+  let todosResult = PublicTodosQuery.use({
+    before: Some(initialTodoId),
+    after: None,
+    limit: Some(7),
+  })

  ...
}
```

`initialTodoId` is computed based on `lastestTodo` prop on mount of `TodoPublicList` component. This passed as before variable along with limit = 7 variable to `PublicTodosQuery` to fetch the first 7 todos. Subsequent todos are fetched with `loadOlder` and `loadNew` functions.

Update the `loadOlder` method to the following:

```
let loadOlder = _e => {
  let oldTodoId =
    Js.Array.length(todos) > 0
      ? todos[Js.Array2.length(todos) - 1].id
      : switch latestTodo {
        | Some(todo) => todo.id + 1
        | None => 0
        }

  fetchMore(
    ~updateQuery=(previousData, {fetchMoreResult}) => {
      switch fetchMoreResult {
      | Some({todos: newTodos}) => {
          todos: Belt.Array.concat(todos, newTodos),
        }
      | None => previousData
      }
    },
    ~variables={
      before: Some(oldTodoId),
      after: None,
      limit: Some(7),
    },
    (),
  )->ignore
}
```

When "Load older todos" button is clicked, `loadOlder` function is called. It fetches 7 todos before `oldTodoId` and appends it to existing todos.

Try adding a new todo in the public feed and notice that it will not show up on the UI. Now refresh the page to see the added todo.

This happens because we haven't yet implemented a way to show the newly added todo to the feed.

Let's handle that in `useEffect` for on update

```
@react.component
let make = (~latestTodo: option<NotifyNewPublicTodosSubscription.Inner.t_todos>) => {
  let (newTodosCount, setNewTodosCount) = React.useState(() => 0)

+  React.useEffect1(() => {
+    switch (latestTodo, ref.current) {
+    | (Some(todo), Some(prevTodo)) =>
+      if prevTodo.id !== todo.id {
+        setNewTodosCount(prevNewTodosCount => prevNewTodosCount + 1)
+      } else {
+        ()
+      }
+    | (Some(_), None)
+    | (None, Some(_)) =>
+      setNewTodosCount(prevNewTodosCount => prevNewTodosCount + 1)
+    | (None, None) => ()
+    }
+    ref.current = latestTodo
+    None
+  }, [latestTodo])

...

```

Logic inside this `useEffect` increment `newTodosCount` state whenever there is a change in latestTodo, which happen when new task arrives.

Now try adding a new todo to the public feed and you will see the notification appearing saying that a new task has arrived.

Great! We still have one functionality left. When a new task arrives on the public feed and when the user clicks on the New tasks section, we should make a query to re-fetch the todos that are not present on our current public feed.

Update `loadNew()` method with the following code

```reason
let loadNew = _e => {
  let newestTodoId =
    Js.Array.length(todos) > 0
      ? todos[0].id
      : switch latestTodo {
        | Some(todo) => todo.id
        | None => 0
        }

  fetchMore(
    ~updateQuery=(previousData, {fetchMoreResult}) => {
      setNewTodosCount(_ => 0)
      switch fetchMoreResult {
      | Some({todos: newTodos}) => {
          todos: Belt.Array.concat(newTodos, todos),
        }
      | None => previousData
      }
    },
    ~variables={
      after: Some(newestTodoId),
      before: None,
      limit: None,
    },
    (),
  )->ignore
}
```

This method fetches all new todos after `newestTodoId` by using fetchMore api of Apollo.
