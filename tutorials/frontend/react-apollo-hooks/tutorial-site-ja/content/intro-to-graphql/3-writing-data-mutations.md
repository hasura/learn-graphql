---
title: データの書き込み - Mutations
metaTitle: "GraphQL Mutationsによるデータの挿入 | GraphQL React Apollo Hooksチュートリアル"
metaDescription: "GraphiQLを使ってGraphQL Mutationを試してみましょう。動的な引数と変数でデータを挿入するGraphQLミューテーションの例"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-mutations/"
---

import {Link} from "gatsby";

ミューテーションを攻略する（笑）前に、学んでおきたいコンセプトを以下に示します
- <Link to="/intro-to-graphql/2-fetching-data-queries/#tryoutgraphqlqueries">GraphiQLの使い方</Link>
- <Link to="/intro-to-graphql/2-fetching-data-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">クエリ変数の使い方</Link>

さっそくGraphQLを使ってデータを「書き込む」方法を見ていきましょう。GraphQLミューテーションは、典型的なAPI `'POST'`、
`'PUT'` 、 `'PATCH'` 、 `'DELETE'` のように、バックエンドでの「ミューテーション」や変更を引き起こす可能性があるGraphQLクエリの一種です。

## 基本的なミューテーション
GraphQL APIにHasuraを使用しているため、アプリで使用できるinserts、updates、deletesのmutationsを取得できます。

これらのmutationsがどのようなものなのか、todoアプリのコンテキストで試してみましょう。APIチームが独自開発したものなど、他のGraphQLサービスから取得したmutationsは異なる場合があります。

### todoの作成

APIを呼び出してtodoを作成しましょう。ご想像の通り、これはtodoアプリにとって重要な部分です。😉

> **補足**：ここで、todoを作成するミューテーションの名前が分からないとします。GraphiQLなら問題ありません。GraphiQLに移動して、右側にある「docs」タブをクリックします。そこで「todo」と入力すると、todoを使用するGraphQLクエリと型の一覧が表示されます。一覧を確認すれば、 `insert_todos` が探しているものだとすぐに分かるでしょう。

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
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">GraphiQLを試してみましょう</a></b>

## ミューテーション後のデータを返す
挿入されるtodoのデータは、`insert_todos` ミューテーションの引数として送信されることに注意してください。ただし、ミューテーションの「フィールド」は、サーバーから提供してほしい _応答_ 内容を指定しています。

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
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">GraphiQLを試してみましょう</a></b>

## 挿入内容のパラメータ化

ミューテーションではほとんど場合、引数をパラメータ化する必要があります。「ハードコード」されたミューテーションがアプリで発生することはほとんどありません。なぜなら、どのデータを取得し、どのようにして変更または削除するかを指定する変数は、通常、ユーザーの操作に依存しているからです。

クエリ変数を使ってパラメータ化する方法を学んだので、早速使ってみましょう。

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

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">GraphiQLを試してみましょう</a></b>

ミューテーションを使ったデータの更新や削除については、少し後で紹介します。これでミューテーションを攻略するための良いスタートが切れました。

## チュートリアルの総括

- 基本的なGraphQLミューテーションが使える
- クエリ変数を使用して、ミューテーションに動的な引数/データを渡すことができる

次は、GraphQL subscriptionsについて紹介します。
