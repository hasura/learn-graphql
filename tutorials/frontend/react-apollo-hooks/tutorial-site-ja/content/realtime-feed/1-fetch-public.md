---
title: "パブリックtodoの取得 - subscription"
metaTitle: "Subscriptionを使用したパブリックtodoの取得 | GraphQL React Apolloフックチュートリアル"
metaDescription: "ここでは、GraphQL Subscriptionsで、Reactアプリが新しいtodoを受信するたびに通知するようにします。その過程でGraphQL Subscriptionsの使い方を学びます。"
---

import GithubLink from "../../src/GithubLink.js";

使用するgraphql queryを定義します。

`src/components/Todo/TodoPublicList.js` を開いて以下のimportを追加します。

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/Todo/TodoPublicList.js" text="src/components/Todo/TodoPublicList.js" />

```javascript
import React, { useState, Fragment } from 'react';
+ import { gql } from "@apollo/client";

import TaskItem from "./TaskItem";
```

subscription queryを定義して、新しいパブリックtodoの通知を取得するようにします。

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

subscription queryで使用する関数コンポーネントも追加します。そのためには、 `useSubscription` を `@apollo/client` からインポートすることから始めます。

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

Subscriptionの役割について
-----------------------------

このqueryは、 `is_public` がtrueであるという単純な条件を使って、 `todos` を取得します。新しいtodoが入ってくるたびに通知を受け取りたいので、todoの数は1件に制限します。スキーマに従って、最新のcreated_atの時刻でtodoを並び替えます。todoノードに必要なフィールドを指定します。

この状態では新しいデータが入ってきても何も返しません。パブリックtodoのリストをレンダリングするためのTodoPublicListコンポーネントは、チュートリアルの中で既に作成しています。このコンポーネントが返るようにしましょう。

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

`useSubscription` Reactフックに統合した、この新しいTodoPublicListSubscriptionコンポーネントが返るようにします。

```javascript
- export default TodoPublicList;
+ export default TodoPublicListSubscription;
```
