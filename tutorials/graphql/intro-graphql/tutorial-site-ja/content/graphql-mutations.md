---
title: ミューテーション - データの書き方
metaTitle: "データを挿入するGraphQLミューテーション | GraphQLチュートリアル"
metaDescription: "GraphiQLを使ってGraphQLミューテーションを試してみましょう。動的な引数と変数でデータを挿入するGraphQLミューテーションの例"
---

import {Link} from "gatsby";

これらは、ミューテーションを学習する前に知っておくべき概念を以下に示します
- <Link to="/graphql-queries/#graphiql">GraphiQLの使い方</Link>
- <Link to="/graphql-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">クエリ変数の使い方</Link>

さっそくGraphQLを使ってデータを「書き込む」方法を見ていきましょう。GraphQLのミューテーションはGraphQLクエリの一種であるため、`'POST'`、`'PUT'`、`'PATCH'`、`'DELETE'`、およびAPIによく見られるようなバックエンドでの「ミューテーション」や変更を引き起こす可能性があります。

## 基本的なミューテーション {#basic-mutations}
GraphQL APIにHasuraを使用しているため、アプリで使用できる挿入、更新、削除のミューテーションを取得できます。

これらのミューテーションがどのようなものなのか、todoアプリのコンテキストで試してみましょう。APIチームが独自開発したミューテーションなど、他のGraphQLサービスから取得したミューテーションは形状が異なる場合があります。

### todoの作成 {#create-a-todo}

APIを呼び出してtodoを作成しましょう。ご想像の通り、これはtodoアプリにとって重要な部分です。😉

> **ポイント**：ここで、todoを作成するためのミューテーションの名前が分からないとします。GraphiQLなら問題ありません。GraphiQLに移動して、右側にある「docs」タブをクリックします。そこで「todo」と入力すると、todoを使用するGraphQLクエリと型の一覧が表示されます。一覧を確認すれば、`insert_todos` が必要としているものだとすぐに分かるでしょう。

todoを作成するためのミューテーションの名前は `insert_todos` です。

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

## ミューテーション後のデータを返す {#returning-data-after-the-mutation}
挿入されるtodoのデータは、`insert_todos` ミューテーションの引数として送信されることに注意してください。ただし、ミューテーションの「フィールド」は、サーバーから提供してほしいレスポンス内容を指定しています。

試しに一度作成されたすべてのtodoオブジェクトを応答として取得してみましょう。

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

## 挿入内容のパラメータ化 {#parameterise-what-you-insert}

ミューテーションではほとんど場合、引数をパラメータ化する必要があります。「ハードコード」されたミューテーションがアプリで生じることはほとんどありません。なぜなら、基本的にデータの取得、変更、削除する変数は、ユーザーの操作に依存しているからです。

クエリ変数を使ってパラメータ化する方法が分かったので、早速使ってみましょう。

```graphql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

```javascript
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

ここでは、`todos_insert_input` は変数 `$todo` の型であり、`!` は必須入力であることを示すために使用されます。

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

ミューテーションを使ったデータの更新や削除については、少し後で紹介します。これでミューテーションを攻略するための良いスタートが切れました。

## チュートリアルの総括 {#summary}

- 基本的なGraphQLミューテーションが使える
- クエリ変数を使用して、ミューテーションに動的な変数/データを渡すことができる

次は、GraphQLサブスクリプションについて紹介します。
