---
title: "新しいtodoとの同期"
metaTitle: "公開フィードによる新しいtodoとの同期 | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Queriesを使って古いtodoデータと新しいtodoデータを取得し、他の人が追加した新しいtodoを公開フィードで同期する方法を学びます。"
---

公開リストに新しく入力されたtodoをUIで表示できるようにします。UIが自動的にtodoを表示する代わりに、新しいtodoを受信するたびに表示される通知バナーのようなフィードを使用します。

以前、キャッシュAPIを使ってキャッシュを更新すると、UIが自動更新されたことを思い出してください。これは、キャッシュの更新によって、このストアにサブスクライブしているコンポーネントの再レンダリングがトリガーされたためです。

今回はUIによる公開リストの自動更新は必要ないため、この方法は使用しません。

前のステップの `TodoPublicListSubscription` メソッドでは、最新のtodoだけを取得して、既存のtodoリストは取得しませんでした。ここでは、既存のパブリックtodoのリストを取得するqueryを記述します。

まず、 `react` から `useEffect` を、 `@apollo/client` から `useApolloClient` をimportすることから始めます。

```javascript
- import React, { Fragment } from "react";
+ import React, { Fragment, useState, useEffect } from "react";
- import { useSubscription, gql } from "@apollo/client";
+ import { useSubscription, useApolloClient, gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

これで、clientにアクセスできるようになったので、 `TodoPublicList` コンポーネントを更新します。

```javascript
const TodoPublicList = props => {
-    const state = {
+    const [state, setState] = useState({
-     olderTodosAvailable: true,
+     olderTodosAvailable: props.latestTodo ? true : false,
-     newTodosCount: 1,
+     newTodosCount: 0,
      todos: [
-       {
-         id: "1",
-         title: "This is public todo 1",
-         user: {
-           name: "someUser1"
-         }
-       },
-       {
-         id: "2",
-         title: "This is public todo 2",
-         is_completed: false,
-         is_public: true,
-         user: {
-           name: "someUser2"
-         }
-       },
-       {
-         id: "3",
-         title: "This is public todo 3",
-         user: {
-           name: "someUser3"
-         }
-       },
-       {
-         id: "4",
-         title: "This is public todo 4",
-         user: {
-           name: "someUser4"
-         }
-       }
      ],
+     error: false
-   };
+   });

+  let numTodos = state.todos.length;
+  let oldestTodoId = numTodos
+    ? state.todos[numTodos - 1].id
+    : props.latestTodo
+      ? props.latestTodo.id + 1
+      : 0;
+  let newestTodoId = numTodos
+    ? state.todos[0].id
+    : props.latestTodo
+      ? props.latestTodo.id
+      : 0;
+
+  const client = useApolloClient();

  }

  const loadNew = () => {};

  const loadOlder = () => {};

  ...
}
```

`useEffect` で既存のtodoリストを取得して、initial stateを生成します。

```javascript
const TodoPublicList = props => {
  ...

  const client = useApolloClient();

+  useEffect(() => {
+    loadOlder();
+  }, []);

  const loadNew = () => {};

  const loadOlder = () => {}

  ...
}
```

`loadOlder` メソッドを以下の通り更新します。

```javascript
  const loadOlder = async () => {
+    const GET_OLD_PUBLIC_TODOS = gql`
+      query getOldPublicTodos ($oldestTodoId: Int!) {
+        todos (where: { is_public: { _eq: true}, id: {_lt: $oldestTodoId}}, limit: 7, order_by: { created_at: desc }) {
+          id
+          title
+          created_at
+          user {
+            name
+          }
+        }
+      }`;
+
+   const { error, data } = await client.query({
+      query: GET_OLD_PUBLIC_TODOS,
+      variables: { oldestTodoId: oldestTodoId }
+    });
+
+    if (data.todos.length) {
+      setState(prevState => {
+        return { ...prevState, todos: [...prevState.todos, ...data.todos] };
+      });
+      oldestTodoId = data.todos[data.todos.length - 1].id;
+    } else {
+      setState(prevState => {
+        return { ...prevState, olderTodosAvailable: false };
+      });
+    }
+    if (error) {
+      console.error(error);
+      setState(prevState => {
+        return { ...prevState, error: true };
+      });
+    }
+ }
```

古い公開todoを取得するqueryを定義し、 `client.query` を呼び出してデータベースからデータを取得します。データを取得したら、 `todos` stateを更新して、public todoの利用可能なリストを使ってUIを再レンダリングします。

公開フィードに新しいtodoを追加してみましょう。新しいtodoがUIに表示されないことを確認してください。ページを更新するとtodoが追加されることを確認してください。

これは、新しく追加されたtodoをフィードして表示する仕組みがまだ実装されてないからです。

この仕組みは、更新で使用している `useEffect` で処理します。

```javascript
  useEffect(() => {
    loadOlder();
  }, []);

+  useEffect(
+    () => {
+      if (props.latestTodo && props.latestTodo.id > newestTodoId) {
+        setState(prevState => {
+          return { ...prevState, newTodosCount: prevState.newTodosCount + 1 };
+        });
+        newestTodoId = props.latestTodo.id;
+      }
+    },
+    [props.latestTodo]
+  );
```

公開フィードに新しいtodoを追加してみましょう。新しいタスクの受信通知が表示されるはずです。

完璧です。まだ実装していない機能が一つ残っています。新しいタスクが公開フィードに届いて、ユーザーがNew tasks sectionをクリックしたときに、現在のパブリックフィードにないtodoを再取得するqueryを作成する必要があります。

`loadNew()` メソッドを以下のコードに更新します。

```javascript
  const loadNew = async () => {
+   const GET_NEW_PUBLIC_TODOS = gql`
+     query getNewPublicTodos ($latestVisibleId: Int!) {
+       todos(where: { is_public: { _eq: true}, id: {_gt: $latestVisibleId}}, order_by: { created_at: desc }) {
+         id
+         title
+         created_at
+         user {
+           name
+         }
+       }
+     }
+   `;
+
+   const { error, data } = await client.query({
+      query: GET_NEW_PUBLIC_TODOS,
+      variables: {
+        latestVisibleId: state.todos.length ? state.todos[0].id : null
+      }
+    });

+    if (data) {
+      setState(prevState => {
+        return {
+          ...prevState,
+          todos: [...data.todos, ...prevState.todos],
+          newTodosCount: 0
+        };
+      });
+      newestTodoId = data.todos[0].id;
+    }
+    if (error) {
+      console.error(error);
+      setState(prevState => {
+        return { ...prevState, error: true };
+      });
+    }
  }
```
