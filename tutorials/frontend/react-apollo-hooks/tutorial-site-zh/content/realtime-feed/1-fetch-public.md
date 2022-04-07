---
title: "获取公共待办事项 - 订阅"
metaTitle: "使用订阅获取公共待办事项 | GraphQL React Apollo Hooks 教程"
metaDescription: "您将学习如何利用GraphQL订阅，以便在React应用中出现新的待办事项时获得通知"
---

import GithubLink from "../../src/GithubLink.js";

让我们定义要使用的graphql 查询：

打开`src/components/Todo/TodoPublicList.js`并添加以下导入。

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPublicList.js" text="src/components/Todo/TodoPublicList.js" />

```javascript
import React, { useState, Fragment } from 'react';
+ import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

现在让我们定义订阅查询，以获取关于新的公共待办事项的通知

```javascript
import React, { useState, Fragment } from 'react';
import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";

const TodoPublicList = props => {
  ...
}

+ // Run a subscription to get the latest public todo
+ const NOTIFY_NEW_PUBLIC_TODOS = gql`
+  subscription notifyNewPublicTodos {
+    todos (where: { is_public: { _eq: true}}, limit: 1, order_by: {created_at: desc }) {
+      id
+      created_at
+    }
+  }
+ `;

export default TodoPublicList;
```

另外，让我们添加一个使用该订阅查询的功能组件。从`@apollo/client`中导入`useSubscription`，以开始使用。

```javascript
import React, { Component, Fragment } from 'react';
- import { gql } from "@apollo/client";
+ import { useSubscription, gql } from "@apollo/client";

import TaskItem from "./TaskItem";

const TodoPublicList = props => {
  ...
}

// Run a subscription to get the latest public todo
const NOTIFY_NEW_PUBLIC_TODOS = gql`
 subscription notifyNewPublicTodos {
   todos (where: { is_public: { _eq: true}}, limit: 1, order_by: {created_at: desc }) {
     id
     created_at
   }
 }
`;

+ const TodoPublicListSubscription = () => {
+   const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
+   if (loading) {
+     return <span>Loading...</span>;
+   }
+   if (error) {
+     return <span>Error</span>;
+   }
+   return {};
+ };

export default TodoPublicList;
```

订阅是做什么的？
-----------------------------

查询以一个简单的条件获取`todos`；`is_public`必须是真的。我们还将待办事项的数量限制为 1 个，因为我们只想在有一个新的待办事项出现时收到通知。我们根据模式将待办事项按其最新创建_时间排序。我们指定我们需要哪些字段来实现待办事项节点。

现在我们不会在新数据进来时返回任何东西。我们已经有一个待办事项公共列表组件，该组件可以呈现公共待办事项列表。因此，让我们返回这个组件。

```javascript
 const TodoPublicListSubscription = () => {
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error</span>;
  }
-  return {};
+  return (<TodoPublicList latestTodo={data.todos.length ? data.todos[0] : null} />);
};
```

现在我们想返回一个具有`useSubscription` React hook 集成的新待办事项公共列表订阅组件。

```javascript
- export default TodoPublicList;
+ export default TodoPublicListSubscription;
```
