---
title: "Subscription"
metaTitle: "Apollo Clientを使ったGraphQL Subscriptionsのセットアップ | GraphQL React Apolloフックチュートリアル"
metaDescription: "@apollo/clientとそのdependency subscriptions-transport-wsを使って、GraphQL Subscriptionsを設定方する法を学びます。ここでは、承認トークンの設定も行います"
---

import GithubLink from "../../src/GithubLink.js";

Apolloの初期セットアップの際に、Apollo Boostで必要なdepdendenciesをインストールします。ただし、subscriptionsはApollo Boostがサポートしていない高度なユースケースです。そのため、subscriptionsのセットアップには、より多くのdepdendenciesをインストールする必要があります。

### React Apollo Subscriptionsのセットアップ

```bash
+ $ npm install subscriptions-transport-ws --save
```

ここでは、 `ApolloClient` インスタンスを更新して、subscriptionサーバー指向に設定します。

`src/components/App.js` を開いて、importを以下の通り更新します。

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
- import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
+ import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

createApolloClient関数を更新して、WebSocketLinkを統合します。

```javascript
const createApolloClient = (authToken) => {
  return new ApolloClient({
-   link: new HttpLink({
+   link: new WebSocketLink({
-     uri: 'https://hasura.io/learn/graphql',
+     uri: 'wss://hasura.io/learn/graphql',
+     options: {
+       reconnect: true,
+       connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
+       }
+     }
    }),
    cache: new InMemoryCache(),
  });
};
```

なお、HttpLinkをWebSocketLinkに置き換えるため、すべてのGraphQL queriesは単一のWebSocket接続を経由する点に注意してください。
