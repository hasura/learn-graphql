---
title: "オンラインユーザーを表示するSubscriptions"
metaTitle: "Mutationによるユーザーの最終情報の更新 | GraphQL React Apolloフックチュートリアル"
metaDescription: "GraphQL Mutationにより、ユーザーが最後に表示した内容を更新して、オンラインで利用できるようにします。setIntervalを使って、数秒ごとにmutationをトリガーします"
---

import GithubLink from "../src/GithubLink.js";

ここまでGraphQL queriesとmutationsについて学んできました。todoのquery、新しいtodoの追加、既存のtodoの更新と削除を実施しました。

ここから本題に入ります。

GraphQL Subscriptions
---------------------

オンラインユーザーのリストを表示させるUIについて学ぶセクションをご用意しています。ここまで、データを取得してUIに表示するqueryを作成してきました。しかし、通常、オンラインユーザーのデータは動的です。

GraphQL Subscription APIを使えば、graphqlサーバーからリアルタイムデータを取得して効率的に処理できます。

しかし、しかし…

ログインしているユーザーがオンラインであることをサーバーに伝える必要があります。ユーザーの `last_seen` timestamp値を更新するmutationを実行するため、サーバーにポーリングする必要があります。

自分がオンラインにいることを確認するためには、まずこの点を変更する必要があります。ログインとサーバーへのデータ登録は既に完了していますが、 `last_seen` 値を更新していないことを思い出してください。

クライアントからのユーザーのオンライン状態が、数秒ごとに更新されるようにすることがここでの目標となります。Auth0の認証が成功した後に、この処理を実行するのが理想的です。ここでは、この処理を実行するためにコードの一部を更新します。

`src/components/OnlineUsers/OnlineUsersWrapper.js` を開いて、以下のimportを追加します。

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/OnlineUsers/OnlineUsersWrapper.js" text="src/components/OnlineUsers/OnlineUsersWrapper.js" />

```javascript
- import React from "react";
+ import React, { useEffect, useState } from "react";
+ import { useMutation, gql } from "@apollo/client";
```

`useEffect` では、ユーザーのlast_seenを30秒ごとに更新する `setInterval` を作成します。

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

続いて、 `updateLastSeen` の定義を記述します。

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

ここでも `useMutation` Reactフックを使って、データベースの `users` テーブルを更新します。

完璧です。これで、ユーザーのオンライン状況を伝えるメタデータがバックエンドで利用できるようになりました。続いて、オンラインユーザーのデータをリアルタイムに表示するための統合を行いましょう。
