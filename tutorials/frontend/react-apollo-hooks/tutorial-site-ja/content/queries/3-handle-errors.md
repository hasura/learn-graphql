---
title: "loading/errorsの処理"
metaTitle: "Apollo useQuery Reactフックによるエラー処理 | GraphQL React Apolloフックチュートリアル"
metaDescription: "Apollo useQuery Reactフックプロパティのloadingとerrorを使って、ReactアプリでGraphQLのloadingとerror statesを処理します。"
---

前のステップで学んだ通り、Apolloは、プロパティで結果オブジェクトを返します。その中でも `loading` と `error` は、アプリの処理に必要とされる一般的なプロパティと言えます。

それでは、前回のステップで書いた `useQuery` useQueryReactフックに移動してください。

```javascript

  const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_MY_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <TodoPrivateList todos={data.todos} />;
};

```

### Apollo Query Loading State
このコンポーネントをマウントされたときは、バックグラウンドで送信されたGraphQL queryがまだ完了していない可能性があります。テンポラリーなstateファイルを処理する必要があるため、 `loading` state中の有用なテキストを返すようにしています。loading stateは、loading spinnerの表示などの凝った処理によく使用されます。

### Apollo Query Error State
queryは、様々な理由によって `error` stateとなります。graphql queryが間違っていることも、サーバーが応答しないこともあります。エラーの理由が何であれ、ユーザー側のUIはエラーの発生を何らかの形で表示する必要があります。通常、このerror stateをサードパーティーサービスに送信して問題の原因を追跡します。

この2つが、コンポーネント内で処理すべき重要なstatesです。ここで学んだことは基本的なことですが、このチュートリアルの範囲としては十分です。
