---
title: "ミューテーションとキャッシュ更新"
metaTitle: "Apollo client.mutateによるGraphQL mutationの更新 | GraphQL React Apolloフックチュートリアル"
metaDescription: "ここでは、@apollo/clientにあるApollo useMutation Reactフックを使います。例として、readQueryとwriteQueryを使い、optimisticResponseをハンドルして、既存データの変更やキャッシュの更新をローカルで行います。"
---

import GithubLink from "../../src/GithubLink.js";

まずは統合から始めます。 `src/components/Todo/TodoItem.js` を開いて、他のimportの後に以下のコードを追加します。

```javascript
+ import { gql } from "@apollo/client";
```
todoの完了ステータスを更新するためのgraphql mutationを定義します。

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoItem.js" text="src/components/Todo/TodoItem.js" />

```javascript
const TodoItem = ({index, todo}) => {

  const removeTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

+  const TOGGLE_TODO = gql`
+    mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
+      update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
+        affected_rows
+      }
+    }
+  `;

  const toggleTodo = () => {};

  return (
    ...
  );
};

export default TodoItem;

```

### Apollo useMutation Reactフック
mutationを実行するには、 `useMutation` Reactフックを使う必要があります。

```javascript
  import React from 'react';
- import { gql } from "@apollo/client";
+ import { useMutation, gql } from "@apollo/client";

  const TodoItem = ({index, todo}) => {
    const removeTodo = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `;

+ const [toggleTodoMutation] = useMutation(TOGGLE_TODO);

  return (
    ...
  );
 };

 export default TodoItem;
```

入力に使うonChangeハンドラのtoggleTodoは既に用意されています。`toggleTodoMutation` mutate関数を実行するためにこの関数を更新します。

```javascript
  const toggleTodo = () => {
+    toggleTodoMutation({
+      variables: {id: todo.id, isCompleted: !todo.is_completed},
+      optimisticResponse: true,
+    });
  };
```

上記のコードでは、単にmutationが実行され、データベースのtodoのis_completedプロパティが更新されるだけです。キャッシュを更新するために、再度 `update` 関数を使ってキャッシュを変更します。キャッシュを変更する前に、キャッシュから現在のtodoリストを取得する必要があります。クエリをインポートしましょう。

```javascript
+ import {GET_MY_TODOS} from './TodoPrivateList';
```
続いてコードに `update` 関数を追加します。

```javascript
  const toggleTodo = () => {
    toggleTodoMutation({
      variables: {id: todo.id, isCompleted: !todo.is_completed},
      optimisticResponse: true,
+      update: (cache) => {
+        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
+        const newTodos = existingTodos.todos.map(t => {
+          if (t.id === todo.id) {
+            return {...t, is_completed: !t.is_completed};
+          } else {
+            return t;
+          }
+        });
+        cache.writeQuery({
+          query: GET_MY_TODOS,
+          data: {todos: newTodos}
+        });
+      }
    });
  };

```

`cache.readQuery` を使ってキャッシュから既存のtodoを取得し、更新されたtodoのis_completedの値を更新します。

最後に、 `cache.writeQuery` を使って、更新されたtodoリストをキャッシュに書き込みます。
