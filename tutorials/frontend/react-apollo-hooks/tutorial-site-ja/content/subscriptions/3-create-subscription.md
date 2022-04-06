---
title: "SubscriptionとRenderの結果オブジェクトの作成"
metaTitle: "SubscriptionとRenderの結果オブジェクトの作成 | GraphQL React Apolloフックチュートリアル"
metaDescription: "React ApolloのuseSubscriptionフックを統合して、リアルタイムデータの変化を監視します。GraphQL subscriptionを使用して、Reactアプリでライブデータの取得方法を学びます"
---

import GithubLink from "../../src/GithubLink.js";

graphql subscriptionを定義します。

`src/components/OnlineUsers/OnlineUsersWrapper.js` を開いて、他のインポートコードの後に以下のコードを追加します

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React, { useEffect, useState } from "react";
+ import React, { useEffect, Fragment, useState } from "react";
- import { useMutation, gql } from "@apollo/client";
+ import { useMutation, useSubscription, gql } from "@apollo/client";
```

`@apollo/client` から `useSubscription` をインポートしてから、オンラインユーザーのデータを取得するために、上記の通りgraphql subscriptionのquery定義します。

続いて、 `useSubscription` を使ってReactフックをsubscription queryに渡します：

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

これで実データが取得できたので、モックのオンラインユーザーステートを削除します

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

仕組みについて
-------------------

`useQuery` と `useMutation` のReactフックのようなプロパティを返す `useSubscription` Reactフックを使用しています`data` プロパティは、作成したqueryに応じてリアルタイムデータの結果を提供します。

Reactアプリを更新してオンラインで確認してください。オンラインには他のユーザーもいるかもしれませんが、驚かないでください。

完璧です。GraphQLのQuery、Mutation、Subscriptionsの実装が完了しました。
