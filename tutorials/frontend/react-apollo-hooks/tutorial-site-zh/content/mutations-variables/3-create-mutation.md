---
title: "使用变更 Hook，更新缓存"
metaTitle: "Apollo 使用变更 React Hook | GraphQL React Apollo Hook 教程"
metaDescription: "\n我们将以React应用中@apollo/客户端的Apollo客户端使用变更为例，使用读取查询和写字查询在本地插入新数据并更新缓存。"
---

### Apollo 使用变更 React hook
现在让我们来做整合的部分。打开`src/components/Todo/TodoInput.js`并在其他导入的下方添加以下代码：

```javascript
import { useMutation } from "@apollo/client";
```

我们正在导入 `useMutation`React hook`@apollo/client`和我们上面定义的 graphql 查询来获取待办事项数据。

现在，我们将使用R`useMutation`eact hook传递我们导入的graphql变更常数。添加以下代码：

```javascript
const TodoInput = ({isPublic=false}) => {

+ const [addTodo] = useMutation(ADD_TODO);

return (
  ...
)

};
```

在上面定义的R`useMutation`eact hook中，结果元组的第一个参数是变更函数；在本例中是（addTodo）。在此阅读[更多](https://www.apollographql.com/docs/react/data/mutations/)关于变更函数的信息。

变更函数可以选择接受获取变量、乐观响应、重置查询和更新；您将稍后使用函`update`数。

我们需要处理变化事件，这样当用户在输入框上输入某件事时，我们会更新状态。

为此我们将使用 `useState`hook。

```javascript
- import React from 'react';
+ import React, {useState} from 'react';
```

我们将初始化状态并添加一个`onChange`处理程序来更新状态。

```javascript
const TodoInput = ({isPublic = false}) => {
+  const [todoInput, setTodoInput] = useState('');

   const [addTodo] = useMutation(ADD_TODO);

   return (
           <form className="formInput" onSubmit={(e) => {
             e.preventDefault();
           }}>
             <input
               className="input"
               placeholder="What needs to be done?"
+              value={todoInput}
+              onChange={e => (setTodoInput(e.target.value))}
             />
             <i className="inputMarker fa fa-angle-right" />
           </form>
         );
};
```

现在让我们来处理表单提交以调用变更。

```javascript
      return (
        <form className="formInput" onSubmit={(e) => {
          e.preventDefault();
+         addTodo({variables: {todo: todoInput, isPublic }});
        }}>
          <input
            className="input"
            placeholder="What needs to be done?"
            value={todoInput}
            onChange={e => (setTodoInput(e.target.value))}
          />
          <i className="inputMarker fa fa-angle-right" />
        </form>
      );
```

我们将变更函数（`addTodo`）传递给我们的表单提交处理程序。
变更函数的第一个参数将是突变查询的选项，如变量等。我们现在要传递的是变更所需的变量。


变更已被整合，新待办事项将被插入数据库中。但用户界面不知道已添加了一个新的待办事项。我们需要一种方式来告诉Apollo客户端更新待办事项列表的查询。

### Apollo React 变更更新
该函`update`数在更新该变更的缓存时很方便。它带有实用功能，例如  `readQuery`和 ，`writeQuery`可帮助读取和写入缓存。

让我们对上述变更`update`实施。

我们将更新函数作为一个选项`useMutation`传递给。

```javascript
-    const [addTodo] = useMutation(ADD_TODO);
+    const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
```

我们需要从缓存中获取当前的待办事项列表。因此，让我们导入我们在前面步骤中使用的查询。

```javascript
import {GET_MY_TODOS} from './TodoPrivateList';
```

让我们定义更新缓存函数以读取和写入到缓存。

```javascript
const TodoInput = ({isPublic = false}) => {
  let input;

  const [todoInput, setTodoInput] = useState('');

+  const updateCache = (cache, {data}) => {
+    // If this is for the public feed, do nothing
+    if (isPublic) {
+      return null;
+    }
+
+    // Fetch the todos from the cache
+    const existingTodos = cache.readQuery({
+      query: GET_MY_TODOS
+    });
+
+    // Add the new todo to the cache
+    const newTodo = data.insert_todos.returning[0];
+    cache.writeQuery({
+      query: GET_MY_TODOS,
+      data: {todos: [newTodo, ...existingTodos.todos]}
+    });
+  };

  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});

   return (
    ...
   );
};
```

让我们剖析一下这段代码片段中发生了什么。

我们的目标很简单：

- 进行变更以在数据库中插入新的待办事项。
- 变更完成后，我们需要更新缓存以更新用户界面。

更新函数用于在发生变更后更新缓存。它接收变异的结果（数据）和当前的缓存（存储）作为参数。然后，您将使用这些参数来管理您的缓存，这样用户界面就会是最新的。

### 读取和写字查询

缓存。读取查询
---------------

与 不同`client.query`， 读取查询永远不会向您的 GraphQL 服务器发出请求。它将始终从缓存中读取。因此，我们向缓存发出读取请求以获取当前的待办事项列表。

缓存。写字查询
----------------

我们已经使用了变更函数对graphql服务器进行变更。我们的目标是更新用户界面。这就是写字查询的用武之地。写字查询将允许您改变本地缓存中的数据，但重要的是要记住，它们不会改变您服务器上的任何数据（正是我们需要的）。

任何Apollo客户端商店的订阅者都会立即看到这一更新，并相应地呈现新的用户界面。

我们将新的待办事项与现有待办事项列表连接起来，并使用 缓存。写字查询将查询写回缓存

现在，使用R`useQuery`eact hook的TodoPrivateList组件将获得更新的待办事项列表，因为它被自动订阅到了商店。

太好了！这实际上很容易 :)

让我们通过添加一个函数，在变异成功后清除输入值来包装它。

```javascript
-  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
+  const [addTodo] = useMutation(ADD_TODO, {
+    update: updateCache,
+    onCompleted: resetInput
+  });
```

我们将一个名 为的函数传`resetInput`递给 `onCompleted`选项，一旦变更完成，该函数将被调用。函数定义如下所示：

```javascript
const TodoInput = ({isPublic = false}) => {
  const [todoInput, setTodoInput] = useState('');

  const updateCache = (cache, {data}) => {
    ...
  };

+  const resetInput = () => {
+    setTodoInput('');
+  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: resetInput
  });

  return (
    ...
  );
}
```

