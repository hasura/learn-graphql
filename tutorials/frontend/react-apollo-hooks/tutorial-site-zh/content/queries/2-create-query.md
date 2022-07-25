---
title: "使用查询hook"
metaTitle: "Apollo使用查询React hook| GraphQL React Apollo Hooks 教程"
metaDescription: "我们将使用来自@apollo/客户端的Apollo客户端的使用查询React hook来进行GraphQL查询"
---

import GithubLink from "../../src/GithubLink.js";

在本节中，我们将实现GraphQL查询，并与反应的用户界面集成。使用Apollo客户端，您可以用2种不同的方式发送查询。

1. 直接使用`query`方法，然后处理响应。
2. 带有React的新的`useQuery`React hook。（推荐）

### Apollo使用查询React Hook
推荐的方法是使用`useQuery`React hook，您只需要在其中传递GraphQL查询，`useQuery`React hook将自动获取数据。

太好了！现在让我们定义要使用的graphql 查询：

打开`src/components/Todo/TodoPrivateList.js`并添加以下代码：

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPrivateList.js" text="src/components/Todo/TodoPrivateList.js" />

```javascript
import React, { useState, Fragment } from "react";
+ import { gql } from '@apollo/client';

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

+ const GET_MY_TODOS = gql`
+  query getMyTodos {
+    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
+      id
+      title
+      created_at
+      is_completed
+  }
+ }`;
```

我们现在已经使用`gql`解析函数将 graphql 查询编写为 java 脚本常量。该函数用于将纯字符串解析为 graphql 查询。

该查询是做什么的？
------------------------
查询以一个简单的条件获取`todos`；`is_public`必须是错误的。我们根据模式将待办事项按照其`created_at`时间降序排序。我们指定我们需要哪些字段来实现待办事项节点。

查询现在已准备好了，让我们将其与我们的反应代码集成。

```javascript

+ import { useQuery } from '@apollo/client';

```

`useQuery`React hook 正在从中导入`@apollo/client`

```javascript

import React, { Component, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
      id
      title
      created_at
      is_completed
  }
}`;

const TodoPrivateList = props => {
  ...
}

+ const TodoPrivateListQuery = () => {
+   const { loading, error, data } = useQuery(GET_MY_TODOS);
+
+   if (loading) {
+     return <div>Loading...</div>;
+   }
+   if (error) {
+     console.error(error);
+     return <div>Error!</div>;
+   }
+   return <TodoPrivateList todos={data.todos} />;
+ };

export default TodoPrivateList;
```

请记住，我们`<ApolloProvider>`用来包装我们的应用组件，并把`client`作为一个道具来传递`useQuery`React hook 使用的是同一个客户端。

我们正在从`@apollo/client`中导入 `useQuery`React hook和我们上面定义的 graphql 查询来获取待办事项数据。

让我们删除用于填充样本数据的`todos`模拟数据。

```javascript

const TodoPrivateList = props => {
  const [state, setState] = useState({
    filter: "all",
    clearInProgress: false,
-    todos: [
-      {
-        id: "1",
-        title: "This is private todo 1",
-        is_completed: true,
-        is_public: false
-      },
-      {
-        id: "2",
-        title: "This is private todo 2",
-        is_completed: false,
-        is_public: false
-      }
-    ]
  });

  const filterResults = filter => {
    setState({
      ...state,
      filter: filter
    });
  };

  const clearCompleted = () => {};

-    let filteredTodos = state.todos;
+    const {todos} = props;
+
+    let filteredTodos = todos;
    if (state.filter === "active") {
-     filteredTodos = state.todos.filter(todo => todo.is_completed !== true);
+     filteredTodos = todos.filter(todo => todo.is_completed !== true);
    } else if (state.filter === "completed") {
-     filteredTodos = state.todos.filter(todo => todo.is_completed === true);
+     filteredTodos = todos.filter(todo => todo.is_completed === true);
    }

    const todoList = [];
    filteredTodos.forEach((todo, index) => {
      todoList.push(<TodoItem key={index} index={index} todo={todo} />);
    });

    return (
      ...
    );

};

```

最后，更新导出。

```javascript
- export default TodoPrivateList;
+ export default TodoPrivateListQuery;
+ export {GET_MY_TODOS};
```

哇！您已经编写了您的第一个GraphQL与React的集成。很简单，对不对？

这如何工作？
-------------------
当您使用`useQuery`React hook时，Apollo 会将数据和其他属性一起返回。最重要的是：

`loading`：一个布尔值，表示请求是否在飞行中。如果加载是真的，那么请求就没有完成。通常情况下，该信息可以用来显示一个加载旋转器。

`error`：一个带有graphQL错误和网络错误属性的运行时间错误。包含有关您的查询出错的信息。

`data`：一个包含您的GraphQL查询结果的对象。这将包含我们从服务器获得的实际数据。在我们的案例中，它将是待办事项的数据。

您可以[在此阅读更多关于结果对象包含的其他属性的更多信息](https://www.apollographql.com/docs/react/data/queries/)

使用`data`属性，我们正在从服务器中解析结果。在我们的查询中，`data`属性有一个数组`todos`，可以将它映射过来以渲染每个属性`TodoItem`。

如果您注意到，已经有一些客户端对已显示的待办事项进行了过滤。
