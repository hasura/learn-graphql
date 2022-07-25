---
title: "变更和更新缓存"
metaTitle: "Apollo 客户端.变更用于GraphQL 变更更新 | GraphQL React Apollo Hooks 教程"
metaDescription: "我们将使用来自 @apollo/客户端的 Apollo 使用变更 React hook 作为一个例子来修改现有数据，并通过读取查询和写字查询在本地更新缓存并处理积极的响应"
---

import GithubLink from "../../src/GithubLink.js";

现在让我们来做整合的部分。打开`src/components/Todo/TodoItem.js`并在其他导入的下方添加以下代码：

```javascript
+ import { gql } from "@apollo/client";
```
让我们定义graphql 变更以更新待办事项的已完成状态

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

### Apollo 使用变更 React hook
我们需要使用 `useMutation`React hook 来进行变更。

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

我们已经有了关于更改处理程序切换待办事项的输入。让我们更新函数，以使用变`toggleTodoMutation`更函数。

```javascript
  const toggleTodo = () => {
+    toggleTodoMutation({
+      variables: {id: todo.id, isCompleted: !todo.is_completed},
+      optimisticResponse: true,
+    });
  };
```

上述代码将只是进行变更，更新数据库中待办事项的是_已完成属性。为了更新缓存，我们将再次使用`update`函数来修改缓存。我们需要在修改前从缓存中获取当前的待办事项列表。因此让我们导入查询。

```javascript
+ import {GET_MY_TODOS} from './TodoPrivateList';
```
现在让我们添加`update`函数的代码。

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

我们正在使用缓存获取现有的待办事项，`cache.readQuery`并更新已更新的待办事项的是_已完成值。

最后，我们使用`cache.writeQuery`将更新的待办事项列表写入缓存。
