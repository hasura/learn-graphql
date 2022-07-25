---
title: "订阅"
metaTitle: "使用Apollo客户端设置GraphQL订阅 | GraphQL React Apollo Hooks 教程"
metaDescription: "你将学习如何使用React Apollo客户端配置GraphQL订阅，方法是使用@apollo/客户端及其依赖订阅-运输-ws。这也将有授权令牌的设置"
---

import GithubLink from "../../src/GithubLink.js";

当我们最初设置Apollo的时候，我们使用Apollo Boost来安装所需的依赖项。
但是订阅是一个高级用例，Apollo Boost并不支持。因此，我们必须安装更多的依赖项来设置订阅。

### React Apollo 订阅设置

```bash
+ $ npm install subscriptions-transport-ws --save
```

现在我们需要更新我们的`ApolloClient`实例以指向订阅服务器。

打开`src/components/App.js`并更新以下导入：

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
- import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
+ import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

更新创建Apollo客户端的功能以集成WebSocket链接。

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

请注意，我们正在用WebSocket链接取代Http链接，因此所有GraphQL查询都要通过一个单一的Websocket连接。
