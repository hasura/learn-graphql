---
title: "使用 Apollo 设置 GraphQL 客户端"
metaTitle: "Apollo 客户端 GraphQL 设置 | GraphQL React Apollo Hooks 教程"
metaDescription: "您将通过安装@apollo/客户端学习如何在 React 中配置 Apollo 客户端"
---

import GithubLink from "../src/GithubLink.js";

Apollo提供了一个精细的抽象层和一个通往GraphQL服务器的接口。您不需要担心用请求正文、标头和选项来构建您的查询，您可能已经做了`axios`或`fetch`说了。您可以直接在GraphQL中编写查询和突变，它们将通过您的apollo客户端实例自动发送到您的服务器。

### React Apollo Hooks 安装

让我们从安装 apollo 客户端和同行 graphql 依赖项开始：

```bash
$ npm install @apollo/client graphql
```

### 创建 Apollo 客户端实例

打开`src/components/App.js`并在顶部添加以下导入：

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
import React from 'react';

import Header from './Header';
import TodoPrivateWrapper from './Todo/TodoPrivateWrapper';
import TodoPublicWrapper from './Todo/TodoPublicWrapper';
import OnlineUsersWrapper from './OnlineUsers/OnlineUsersWrapper';

+ import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

import { useAuth0 } from "./Auth/react-auth0-spa";

const App = ({ idToken }) => {
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header logoutHandler={logout} />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
          <div className="row col-md-9 p-left-right-0 m-left-right-0">
            <div className="col-md-6 sliderMenu p-30">
              <TodoPrivateWrapper />
            </div>
            <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
              <TodoPublicWrapper />
            </div>
          </div>
          <div className="col-md-3 p-left-right-0">
            <div className="col-md-12 sliderMenu p-30 bg-gray">
              <OnlineUsersWrapper />
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
```


这些是开始工作所需的apollo依赖项。
现在让我们定义一个函数，它将返回带有httplink和缓存的apollo客户端。

```javascript
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

+ const createApolloClient = (authToken) => {
+  return new ApolloClient({
+    link: new HttpLink({
+      uri: 'https://hasura.io/learn/graphql',
+      headers: {
+        Authorization: `Bearer ${authToken}`
+      }
+    }),
+    cache: new InMemoryCache(),
+  });
+ };
```

在内部创建apollo客户端，`App`并将客户端道具传递给组`<ApolloProvider>`件。


```javascript
const App = ({ idToken }) => {
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
+  const [client] = useState(createApolloClient(idToken));
   return (
+    <ApolloProvider client={client}>
       <div>
       </div>
+    </ApolloProvider>
   );
};
```

让我们试着理解这里发生了什么。


### HttpLink 和 Inmemory缓存

我们正在创建一个`HttpLink`来连接ApolloClient和GraphQL服务器。如你所知，我们的GraphQL服务器运行在`https://hasura.io/learn/graphql`

在最后`InMemoryCache`，我们通过传入我们的HttpLink和一个新的（推荐的缓存解决方案）实例来实例化ApolloClient。我们将所有这些都包装在一个函数中，该函数将返回客户端。


我们将在组件`App`中使用这个函数。

