---
title: "useQueryフック"
metaTitle: "Apollo useQuery Reactフック | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL queriesを作成するため、Apollo ClientのuseQuery React hook from @apollo/clientを使用します。"
---

import GithubLink from "../../src/GithubLink.js";

ここでは、GraphQL Queriesを実装して、React UIと統合します。Apollo Clientでは、queriesを2通りの方法で送信できます。

1. `query` メソッドを直接使用してから、応答を処理します。
2. Reactの新しい `useQuery` Reactフックを使用します。（推奨）

### Apollo useQuery Reactフック
ここでは、`useQuery` Reactフックを使う方法を推奨します。GraphQL queryを渡すだけで、 `useQuery` Reactフックが自動的にデータを取得します。

完璧です。早速使用するgraphql queryを定義しましょう。

`src/components/Todo/TodoPrivateList.js` を開いて以下のコードを追加します。

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

これで、 `gql` parser関数を使ったjavascriptの定数をgraphql queryで記述できました。この関数を使うことで、プレーンな文字列をgraphql queryとして渡すことができます。

このqueryの役割は何でしょうか。
------------------------
このqueryは、 `is_public` がfalseであるという単純な条件を使って、 `todos` を取得します。スキーマに従って、 `created_at` 時刻の降順にtodoを並べ替えます。todoノードに必要なフィールドを指定します。

queryの準備ができたので、reactコードと統合します。

```javascript

+ import { useQuery } from '@apollo/client';

```

`useQuery` Reactフックを `@apollo/client` からインポートします。

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

アプリコンポーネントを `<ApolloProvider>` でラップし、 `client` をpropとして渡したことに注意してください。`useQuery` Reactフックは同じclientに対して使用しています。

`useQuery` のReactフックを `@apollo/client` からインポートして、上記で定義したgraphqlクエリを使ってtodoデータを取得します。

サンプルデータを入力するために使用したモックの `todos` データは削除してください。

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

最後にexportを更新します。

```javascript
- export default TodoPrivateList;
+ export default TodoPrivateListQuery;
+ export {GET_MY_TODOS};
```

できましたね。これで、GraphQLとReactを統合させることができました。簡単ですね。

仕組みについて
-------------------
`useQuery` Reactフックを使用すると、Apolloは他のプロパティとともにデータを返します。重要なプロパティを以下に示します。

`loading` ：要求が実行しているかを示すブーリアン値です。loadingがtrueの場合、要求は完了していません。この情報は通常、loading spinnerを表示するために使用します。

`error` ：graphQLErrorsとnetworkErrorプロパティのランタイムエラーです。queryで発生した問題に関する情報が含まれています。

`data` ：GraphQL queryの結果のオブジェクトが含まれています。サーバーからの実データが含まれます。このチュートリアルの場合、todoデータが含まれます。

結果オブジェクトを含むその他のプロパティについては、 [ こちら ](https://www.apollographql.com/docs/react/data/queries/) をご覧ください。

`data` プロパティは、サーバーからの結果の解析に使用します。ここで使ったqueryには、 `data` プロパティに `todos` 配列があり、これをマップオーバーすることで各 `TodoItem` をレンダリングできます。

お気づきかもしれませんが、クライアント側に表示するtodoの一部にフィルターが設定されています。
