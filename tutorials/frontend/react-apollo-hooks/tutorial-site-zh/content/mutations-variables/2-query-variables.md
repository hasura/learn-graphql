---
title: "查询变量"
metaTitle: "在查询中传递 GraphQL 变量 | GraphQL React Apollo Hooks 教程"
metaDescription: "在 GraphQL 上下文中传递变量以及在 React 应用程序中使用 Apollo GraphQL 变更变量的例子。"
---

import GithubLink from "../../src/GithubLink.js";

在 GraphQL 上下文中什么是变量？
-------------------------------------
GraphQL 使用一流的方法来将动态值从查询中剔除，并将它们作为单独的字典进行传递。这些值被称为变量。
在我们的案例中，我们是把要插入的对象定义为变更。

因此，让我们定义要使用的 graphql 变更。

打开`src/components/Todo/TodoInput.js`并添加以下代码：

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoInput.js" text="src/components/Todo/TodoInput.js" />

```javascript
import React from 'react';
+ import { gql } from "@apollo/client";

+ const ADD_TODO = gql `
+  mutation ($todo: String!, $isPublic: Boolean!) {
+    insert_todos(objects: {title: $todo, is_public: $isPublic}) {
+      affected_rows
+      returning {
+        id
+        title
+        created_at
+        is_completed
+      }
+    }
+  }
+ `;

const TodoInput = ({isPublic=false}) => {
  return (
    <form className="formInput" onSubmit={(e) => {
      e.preventDefault();
    }}>
      <input
        className="input"
        placeholder="What needs to be done?"
      />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
```

这个变更有什么作用？
---------------------------
变更插入到`todos`表中，而 $objects 变量作为一个待办事项类型传递。

太棒了！我们已经定义了我们的第一个 graphql 变更。
