---
title: "ApolloでGraphQLクライアントをセットアップする"
metaTitle: "Apollo ClientでGraphQLをセットアップする | GraphQL React Apollo Hooksチュートリアル"
metaDescription: "@apollo/clientをインストールして、Apollo ClientをReactで設定する方法を学習します。"
---

import GithubLink from "../src/GithubLink.js";

Apolloは適切に抽象化されたレイヤーと、GraphQLサーバーとのインターフェースを提供します。`axios` や `fetch` で行ってきたような、リクエストボディ、ヘッダー、オプションを使ってクエリを構築するような煩わしい作業の必要ありません。GraphQLで直接クエリやミューテーションを記述でき、それらは自動的にApolloクライアントインスタンスを経由してサーバーに送信されます。

### React Apollo Hooksのインストール

まずは、Apollo ClientとPeer Graphql Dependenciesをインストールします。

```bash
$ npm install @apollo/client graphql
```

### Apollo Clientインスタンスの作成

`src/components/App.js` を開いて、コードの初めに以下のimportコードを追加します。

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

これらは、Apollo Dependenciesを開始するために必要です。次に、httplinkとcacheを利用してApollo Clientを返す関数を定義します。

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

`App` 内にApollo Clientを作成して、client propを `<ApolloProvider>` コンポーネントに渡します。

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

ここで何が起こっているのかを理解しておきましょう。

### HttpLinkとInMemoryCache

ここでは、ApolloClientをGraphQLサーバーに接続するための `HttpLink` を作成します。ご存知の通り、GraphQLサーバーは `https://hasura.io/learn/graphql` の下で動作しています。

最後に、HttpLinkと `InMemoryCache` （推奨キャッシュソリューション）の新しいインスタンスを渡すことで、AppolloClientをインスタンス化します。これらすべてを関数にラップすると、Clientを返してくれます。

この関数は `App` コンポーネント内で利用します。
