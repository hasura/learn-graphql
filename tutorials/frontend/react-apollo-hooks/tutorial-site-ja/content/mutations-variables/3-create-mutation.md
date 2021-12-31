---
title: "useMutationフックとキャッシュの更新"
metaTitle: "Apollo useMutation Reactフック | GraphQL React Apolloフックチュートリアル"
metaDescription: "ここでは、Reactアプリの@apollo/clientにあるAppolo Client useMutationを使います。ここでは例として、readQueryとwriteQueryを使って、新しいデータの入力と、ローカルでのキャッシュの更新を行います。"
---

### Apollo useMutation Reactフック
まずは統合から始めます。 `src/components/Todo/TodoInput.js` を開いて、他のインポートコードの後に以下のコードを追加します。

```javascript
import { useMutation } from "@apollo/client";
```

`useMutation` のReactフックを `@apollo/client` からインポートして、上記で定義したgraphql queryを使ってtodoデータを取得します。

`useMutation` Reactフックを使って、graphqlのmutation定数を渡します。下記のコードを追加してください。

```javascript
const TodoInput = ({isPublic=false}) => {

+ const [addTodo] = useMutation(ADD_TODO);

return (
  ...
)

};
```

上記で定義した `useMutation` Reactフックでは、結果タプルの最初の引数にaddTodoというmutate関数を指定しています。mutate関数の詳細については、 [ こちら ](https://www.apollographql.com/docs/react/data/mutations/) をご覧ください。

mutate関数は、variables、optimisticResponse、refetchQueries、updateをオプションで取ることができます。この後、 `update` 関数を利用します。

ユーザーが何かをインボックスに入力したらステートが更新されるように、チェンジイベントをハンドルする必要があります。

そのためにここでは、 `useState` フックを利用します。

```javascript
- import React from 'react';
+ import React, {useState} from 'react';
```

ステートを初期化して、 `onChange` ハンドラを追加するために更新します。

```javascript
const TodoInput = ({isPublic = false}) => {
+  const [todoInput, setTodoInput] = useState('');

   const [addTodo] = useMutation(ADD_TODO);

   return (
           <form className="formInput" onSubmit={(e) => {
             e.preventDefault();
           }}>
             <input
               className="input"
               placeholder="What needs to be done?"
+              value={todoInput}
+              onChange={e => (setTodoInput(e.target.value))}
             />
             <i className="inputMarker fa fa-angle-right" />
           </form>
         );
};
```

次に、ミューテーションを呼び出すためのフォームの送信ハンドラを追加します。

```javascript
      return (
        <form className="formInput" onSubmit={(e) => {
          e.preventDefault();
+         addTodo({variables: {todo: todoInput, isPublic }});
        }}>
          <input
            className="input"
            placeholder="What needs to be done?"
            value={todoInput}
            onChange={e => (setTodoInput(e.target.value))}
          />
          <i className="inputMarker fa fa-angle-right" />
        </form>
      );
```

mutate関数（ `addTodo` ）をフォーム送信ハンドラに渡します。mutate関数の最初の引数は、variablesなどのmutation queryのオプションになります。ここでは、mutationに必要なvariablesを渡しています。

これでミューテーションが統合され、新しいtodoがデータベースに挿入されます。しかし、新しいtodoが追加されたことをUIは認識できません。todoリストのクエリを更新するようApollo Clientに指示する方法が必要です。

### Apollo React Mutationの更新
ミューテーションのキャッシュを更新するには、 `update` 関数が便利です。 `readQuery` や `writeQuery` などのユーティリティ関数が付属しており、キャッシュの読み込みや書き込みをサポートします。

上記のミューテーションに `update` を実装しましょう。

`useMutation` のオプションとしてupdate関数を渡します。

```javascript
-    const [addTodo] = useMutation(ADD_TODO);
+    const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
```

キャッシュから現在のtodoリストを取得する必要があります。そのために、前のステップで使用したクエリをインポートしましょう。

```javascript
import {GET_MY_TODOS} from './TodoPrivateList';
```

キャッシュの読み取りと書き込みを行うupdateCache関数を定義します。

```javascript
const TodoInput = ({isPublic = false}) => {
  let input;

  const [todoInput, setTodoInput] = useState('');

+  const updateCache = (cache, {data}) => {
+    // If this is for the public feed, do nothing
+    if (isPublic) {
+      return null;
+    }
+
+    // Fetch the todos from the cache
+    const existingTodos = cache.readQuery({
+      query: GET_MY_TODOS
+    });
+
+    // Add the new todo to the cache
+    const newTodo = data.insert_todos.returning[0];
+    cache.writeQuery({
+      query: GET_MY_TODOS,
+      data: {todos: [newTodo, ...existingTodos.todos]}
+    });
+  };

  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});

   return (
    ...
   );
};
```

コードスニペットを使ってこの工程で何が起こっているのか分析しましょう。

このチュートリアルの目標はシンプルです。

- 新しいtodoをデータベースに挿入するためのミューテーションを行う。
- ミューテーションの実行後、UIを更新するためにキャッシュを更新する必要があります。

update関数は、ミューテーション発生後のキャッシュの更新に使用します。ミューテーションの結果（データ）と現在のキャッシュ（ストア）を引数として受け取ります。これらの引数を使ってキャッシュを管理すれば、UIは最新の状態になります。

### readQueryとwriteQuery

cache.readQuery
---------------

`client.query` とは異なり、readQueryはGraphQLサーバーに要求を送信することはありません。常にキャッシュから読み取ります。そのため、キャッシュに読み取り要求をして、現在のtodoリストを取得します。

cache.writeQuery
----------------

mutate関数を使ったgraphqlサーバーに対するミューテーションは既に実行しました。目標はUIの更新です。ここでwriteQueryが役に立ちます。writeQueryは、ローカルキャッシュデータは変更できますが、サーバー上のデータは変更できません。この点が重要で、まさに私達が必要としている機能です。

Apollo Clientストアのサブスクライバーは、この更新を直ちに確認して、新しいUIをレンダリングします。

ミューテーションで取得した新規のtodoを既存のtodoリストに連結して、cache.writeQueryでキャッシュにクエリを返します。

これで、更新されたtodoリストはストアに自動的にサブスクライブされて、 `useQuery` React フックを使ったTodoPrivateListコンポーネントで取得できるようになります。

完璧です。実際のところ簡単でしたね :)

ミューテーションが成功したら、入力値をクリアする関数を追加してラップしましょう。

```javascript
-  const [addTodo] = useMutation(ADD_TODO, {update: updateCache});
+  const [addTodo] = useMutation(ADD_TODO, {
+    update: updateCache,
+    onCompleted: resetInput
+  });
```

`onCompleted` オプションに `resetInput` という関数を渡して、ミューテーションが完了した時点で呼び出されるようにします。関数の定義は以下の通りです。

```javascript
const TodoInput = ({isPublic = false}) => {
  const [todoInput, setTodoInput] = useState('');

  const updateCache = (cache, {data}) => {
    ...
  };

+  const resetInput = () => {
+    setTodoInput('');
+  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: resetInput
  });

  return (
    ...
  );
}
```

