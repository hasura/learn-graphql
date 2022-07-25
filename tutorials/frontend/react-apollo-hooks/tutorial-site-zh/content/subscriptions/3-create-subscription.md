---
title: "创建订阅和渲染结果"
metaTitle: "创建订阅和渲染结果 | GraphQL React Apollo Hooks 教程"
metaDescription: "集成 React Apollo useSubscription hook，以观察实时数据的变化。我们以 GraphQL 订阅为例，在 React 应用中获取实时数据"
---

import GithubLink from "../../src/GithubLink.js";

因此，让我们定义要使用的 graphql 订阅。

打开`src/components/OnlineUsers/OnlineUsersWrapper.js`并在其他导入的下方添加以下代码

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React, { useEffect, useState } from "react";
+ import React, { useEffect, Fragment, useState } from "react";
- import { useMutation, gql } from "@apollo/client";
+ import { useMutation, useSubscription, gql } from "@apollo/client";
```

我们正在从 `@apollo/client` 导入 `useSubscription` React hook 和上面定义的 graphql 订阅查询，以获取在线用户数据。

现在，我们将使用 `useSubscription` React hook 传递订阅查询：

```javascript
+ const { loading, error, data } = useSubscription(
+     gql`
+       subscription getOnlineUsers {
+         online_users(order_by: { user: { name: asc } }) {
+           id
+           user {
+             name
+           }
+         }
+       }
+     `
+   );
+
+   if (loading) {
+     return <span>Loading...</span>;
+   }
+   if (error) {
+     console.error(error);
+     return <span>Error!</span>;
+   }
+   if (data) {
+     onlineUsersList = data.online_users.map(u => (
+       <OnlineUser key={u.id} user={u.user} />
+     ));
+   }
+
+   return (
+     <div className="onlineUsersWrapper">
+       <Fragment>
+         <div className="sliderHeader">
+           Online users - {onlineUsersList.length}
+         </div>
+         {onlineUsersList}
+       </Fragment>
+     </div>
+   );
+ };

export default OnlineUsersWrapper;

```

现在我们有了真实的数据，让我们删除模拟在线用户状态

```javascript
const OnlineUsersWrapper = () => {
-  const onlineUsers = [{ name: "someUser1" }, { name: "someUser2" }];
-
-  const onlineUsersList = [];
-  onlineUsers.forEach((user, index) => {
-    onlineUsersList.push(<OnlineUser key={index} index={index} user={user} />);
-  });
-
-  return (
-    <div className="onlineUsersWrapper">
-      <div className="sliderHeader">Online users - {onlineUsers.length}</div>
-      {onlineUsersList}
-    </div>
-  );
};
```

这是如何工作？
-------------------

我们使用的是 `useSubscription` React hook，它会返回属性（类似 `useQuery` 和 `useMutation` React hook）。`data` 属性给出我们所做查询的实时数据的结果。

刷新您的 React 应用程序，并看到自己在线！不要惊讶；因为可能还有其他用户在线。

太棒了！您已经完成了 GraphQL 查询、变更和订阅的实现。
