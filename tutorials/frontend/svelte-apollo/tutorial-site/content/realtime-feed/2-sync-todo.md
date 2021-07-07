---
title: "Sync new todos"
metaTitle: "Sync new todos in public feed | Svelte Apollo GraphQL Tutorial"
metaDescription: "You will learn how to sync new todos added by other people in the public feed by fetching older and newer data using GraphQL Queries"
---

Once a new todo is entered in a public list, it needs to appear in the UI. Instead of automatically displaying the todo in the UI, we use a Feed like Notification banner which appears whenever a new todo is received.

Remember that previously we updated the cache using the cache API and the UI got updated automatically, because updating the cache triggered a re-render for those components that were subscribed to this store.

We are not going to use that approach here since we don't want public list UI to be automatically updated.

In the `TodoPublicListSubscription` component of the previous step, we only get the latest todo and not the existing list. We will now write a query to fetch the list of existing public todos.

let's update the `TodoPublicList` component with query to fetch todos

```
+  const GET_OLD_PUBLIC_TODOS = gql`
+    query getOldPublicTodos($oldestTodoId: Int!) {
+      todos(
+        where: { is_public: { _eq: true }, id: { _lt: $oldestTodoId } }
+        limit: 7
+        order_by: { created_at: desc }
+      ) {
+        id
+        title
+        created_at
+        user {
+          name
+        }
+      }
+    }
+  `;

```

This query will fetch first 7 public todos with id < oldestTodoId.
Add below code to fetch first 7 todos on first mount of TodoPublicList component.

```
+ function getInitialQueryVariables() {
+   return { oldestTodoId: latestTodo ? latestTodo.id + 1 : 0 };
+ }
+
+  const todos = query(GET_OLD_PUBLIC_TODOS, {
+    variables: getInitialQueryVariables(),
+  });
```

Add the below code to render todos

```javascript
+ {#if $todos.loading}
+ <div>Loading...</div>
+ {:else if $todos.error}
+ <div>Error!</div>
+ {:else if $todos.data}
+ <div class="todoListWrapper">
+     <ul>
+       {#each $todos.data.todos as todo (todo.id)}
+         <TaskItem {todo} />
+       {/each}
+     </ul>
+ </div>
+ {/if}
```

We will use `fetchMore` feature of Apollo to fetch older todos or any new todos created after first load.
We should update the Apollo cache with the todos recevied from fetchMore requests by implementing updateQuery method. To update Apollo cache we need values of variables used in first query load. We can store initialVariables in state with onMount life cycle method as shown below

```
+ onMount(() => {
+   initialVariables = getInitialQueryVariables();
+ });
```

Let's add a button to load older todos

```javascript
{#if $todos.loading}
  <div>Loading...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
  <div class="todoListWrapper">
    <ul>
      {#each $todos.data.todos as todo (todo.id)}
        <TaskItem {todo} />
      {/each}
    </ul>

+    <div class="loadMoreSection" on:click={loadOlder}>
+      {olderTodosAvailable ? "Load older tasks" : "No more public tasks!"}
+    </div>
  </div>
{/if}
```

Update the `loadOlder` method to the following:

```javascript
+  const loadOlder = () => {̵
+    let numTodos = $todos.data && $todos.data.todos && $todos.data.todos.length;
+    let oldestTodoId = numTodos
+      ? $todos.data.todos[numTodos - 1].id
+      : latestTodo
+      ? latestTodo.id + 1
+      : 0;
+    todos.fetchMore({
+      query: GET_OLD_PUBLIC_TODOS,
+      variables: { oldestTodoId },
+      updateQuery: (previousTodos, { fetchMoreResult: { todos } }) => {
+        client.writeQuery({
+          query: GET_OLD_PUBLIC_TODOS,
+          variables: initialVariables,
+          data: { todos: [...previousTodos.todos, ...todos] },
+        });
+      },
+    });
+  };
```

`fetchMore` method will fetch more data according to the query passed to it. In this case, 7 older todos are fetched. Older todos fetched are appended to the previous todos and updated in the cache with
`writeQuery` method. As mentioned before, initialVariables store in the state should be passed as variables to `writeQuery` method.

Next, let's show a message when new public todos are created

```
{#if $todos.loading}
  <div>Loading...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
  <div class="todoListWrapper">
+    {#if newTodosCount > 0}
+      <div class="loadMoreSection" on:click={loadNew}>
+        New tasks have arrived! ({newTodosCount.toString()})
+      </div>
+    {/if}

    <ul>
      {#each $todos.data.todos as todo (todo.id)}
        <TaskItem {todo} />
      {/each}
    </ul>

    <div class="loadMoreSection" on:click={loadOlder}>
      {olderTodosAvailable ? "Load older tasks" : "No more public tasks!"}
    </div>
  </div>
{/if}
```

`latestTodo` passed as a prop to this component changes whenever there is a new todo. So we can know the number of new todos created by keeping track of changes in latestTodos. We can accomplish this with below code

```javascript
+  let previousLatestTodo;
+  let newTodosCount = 0;
+  $: {
+    if (previousLatestTodo && previousLatestTodo.id !== latestTodo.id) {
+      newTodosCount += 1;
+    }
+    previousLatestTodo = latestTodo;
+  }
```

Whenever latestTodo changes, codeblock after $: is executed and `newTodosCount` is incremented.

We need to fetch new todos when "New tasks have arrived!" message is clicked.
Let's implement `loadNew` function by adding below code

```javascript
+  const loadNew = () => {
+    const GET_NEW_PUBLIC_TODOS = gql`
+      query getNewPublicTodos($latestVisibleId: Int) {
+        todos(
+          where: { is_public: { _eq: true }, id: { _gt: $latestVisibleId } }
+          order_by: { created_at: desc }
+        ) {
+          id
+          title
+          created_at
+          user {
+            name
+          }
+        }
+      }
+    `;
+    let numTodos = $todos.data && $todos.data.todos && $todos.data.todos.length;
+    let newestTodoId = numTodos
+      ? $todos.data.todos[0].id
+      : latestTodo
+      ? latestTodo.id
+      : 0;
+    todos.fetchMore({
+      query: GET_NEW_PUBLIC_TODOS,
+      variables: { latestVisibleId: newestTodoId },
+      updateQuery: (previousTodos, { fetchMoreResult: { todos } }) => {
+        client.writeQuery({
+          query: GET_OLD_PUBLIC_TODOS,
+          variables: initialVariables,
+          data: { todos: [...todos, ...previousTodos.todos] },
+        });
+        newTodosCount = 0;
+      },
+    });
+  };
```

Query inside this function is to fetch new todos with id > latestVisibleId. `fetchMore` fetches the new todos.
New todos fetched are prepended to the previous todos and updated in the cache with `writeQuery` method.
