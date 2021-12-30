---
title: "订阅显示在线用户"
metaTitle: "使用变更更新上次看到的用户 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 变更更新上次看到的用户，使其在线可用。使用设置间隔每几秒触发变更"
---

import GithubLink from "../src/GithubLink.js";

我们通过GraphQL查询和变更来巡航。我们查询待办事项，添加了一个新的待办事项，更新了一个现有待办事项，删除了一个现有待办事项。

现在让我们进入激动人心的部分。

GraphQL 订阅
---------------------

我们有一个用户界面部分，用于显示在线用户列表。到目前为止，我们已经通过查询来获取数据并在用户界面上显示它们。
但通常在线用户数据是动态的。

我们可以使用GraphQL订阅API从graphql 服务器获取实时数据，以高效率处理这个问题。

但是 但是 但是。。。

我们需要告诉服务器登录的用户是在线的。我们必须对服务器进行测试以进行变更，更新用户的时`last_seen`限标记值。

我们必须进行此改变才能首先看到自己在线。还记得您已经登录，在服务器中注册了您的数据，但没有更新您的 `last_seen`值吗？

目标是每隔几秒钟从客户端更新你的在线情况。理想情况下，你应该在成功通过Auth0身份验证后再做这件事。因此，让我们更新一些代码来处理这个问题。

打开`src/components/OnlineUsers/OnlineUsersWrapper.js`并添加以下导入

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React from "react";
+ import React, { useEffect, useState } from "react";
+ import { useMutation, gql } from "@apollo/client";
```


在中`useEffect`，我们将创建一个，每30秒`setInterval`更新一次用户的最后_可见信息。


```javascript
const OnlineUsersWrapper = () => {
+  const [onlineIndicator, setOnlineIndicator] = useState(0);
+  let onlineUsersList;
+  useEffect(() => {
+     // Every 20s, run a mutation to tell the backend that you're online
+     updateLastSeen();
+     setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));
+
+     return () => {
+       // Clean up
+       clearInterval(onlineIndicator);
+     };
+ }, []);
```

现在让我们编写`updateLastSeen`定义。

```javascript
const OnlineUsersWrapper = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;

  useEffect(() => {
    // Every 20s, run a mutation to tell the backend that you're online
    updateLastSeen();
    setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));

    return () => {
      // Clean up
      clearInterval(onlineIndicator);
    };
  }, []);

+ const UPDATE_LASTSEEN_MUTATION = gql`
+   mutation updateLastSeen($now: timestamptz!) {
+     update_users(where: {}, _set: { last_seen: $now }) {
+       affected_rows
+     }
+   }
+ `;
+ const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);

+ const updateLastSeen = () => {
+   // Use the apollo client to run a mutation to update the last_seen value
+   updateLastSeenMutation({
+     variables: { now: new Date().toISOString() }
+   });
+ };
```

再次，我们使用`useMutation`React hook来更新数据库的`users`表。

太好了！现在，关于用户是否在线的元数据将在后端中可用。现在让我们进行集成，以显示在线用户的实时数据。
