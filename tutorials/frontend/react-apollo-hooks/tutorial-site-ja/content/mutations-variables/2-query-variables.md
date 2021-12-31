---
title: "クエリ変数"
metaTitle: "クエリでGraphQL変数を渡す | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQLコンテキストで変数を渡す例と、ReactアプリでのApollo GraphQL ミューテーション変数の使用方法。"
---

import GithubLink from "../../src/GithubLink.js";

GraphQLコンテキストにおける変数とは何でしょうか。
-------------------------------------
GraphQLには、クエリから動的な値を除外し、別のディクショナリとして渡すための最適な方法があります。これらの値を変数と呼びます。ここでは、挿入するオブジェクトをミューテーションとして定義していきます。

それでは、使用するgraphql mutationを定義しましょう。

`src/components/Todo/TodoInput.js` を開いて以下のコードを追加します。

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

このmutationは何をするのでしょうか。
---------------------------
このmutationは、todoタイプの1つとして渡される$objects variableで、 `todos` テーブルに挿入されます。

完璧です。最初のgraphql mutationを定義しました。
