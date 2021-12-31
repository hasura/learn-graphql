---
title: クエリ - データの取得
metaTitle: "データを取得するGraphQLクエリ | GraphQLチュートリアル"
metaDescription: "ここでは、GraphiQLを使ったGraphQLクエリを試します。パラメータ、引数、変数を用いて動的にデータを取得するGraphQLクエリの例"
---

## GraphQLクエリを試す {#try-out-graphql-queries}

このチュートリアルのために、GraphQL APIをセットアップしています。GraphQL APIを参照するには、GraphiQLを使用するのが最も一般的です。GraphiQL（グラフィカルと発音します）は、Facebookが開発したツールで、あらゆるGraphQL APIを簡単に探索できます。

GraphiQLをGraphQLエンドポイントに接続すると、サーバーにGraphQLスキーマを問い合わせて、クエリを参照・テストするためのUIが提供されます。これにより、高性能なオートコンプリート機能が実現します。

![ GraphiQLのデモ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

GraphiQLライクなツールがあれば、GraphQL APIは非常に使いやすくなり、外部のドキュメントツールなしでAPIをアプリに統合できます。

このチュートリアルで使ったリアルタイムtodoアプリのGraphiQLには、こちらからアクセスできます：[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

プロジェクトでGraphQL APIを使用するなら、ほとんどの場合、GraphiQLライクなツールを使ってGraphQLクエリの探索・テストをすることになるでしょう。

## 基本的なGraphQLクエリ {#basic-graphql-query}

1. GraphiQLで、 [ hasura.io/learn/graphql/graphiql ](https://hasura.io/learn/graphql/graphiql) を開きます。認証トークンを取得してAPIをクエリするためには、ログインする必要があります。実際のシナリオでは、GraphQL APIは保護されています。
2. ここでは、送信するGraphQLクエリと併せて、認証トークンを含むURLとヘッダーが表示されます。
3. 次に、このGraphQLクエリをGraphiQLウィンドウに貼り付けます

```graphql
 query {
   users {
     name
   }
 }
```

4. `ctrl + enter` または `cmd + enter` （Mac）を押すか、▶️アイコンをクリックしてGraphQLクエリを実行します
5. 右側には、システムにログインしているユーザー名のリストが表示されているはずです。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

この世界に魔法などないことをお忘れなく。ホストにしたGraphiQLアプリは、HTTPヘッダーを加えたGraphQLクエリの文字列を指定のエンドポイントのサーバーに送信します。その後、サーバーは右側に表示されるような応答を送信します。

## 「グラフ」の取得 {#fetching-graphs}

todoアプリは、ユーザー、todo、そして現在オンライン中のユーザーの情報を持っています。このAPIの「スキーマ」は次のようになります。

![ スキーマ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

ご覧のように、3つのモデルが互いにリンクしている「グラフ」のようなスキーマです。

「グラフ」全体からデータの様々なスライスを取得するクエリを作成してみましょう。

### ユーザーとそのtodoの取得 {#fetch-users-and-their-todos}

このGraphQLクエリで、すべてのユーザーと公開されているtodoが取得できます。

```graphql
 query {
   users {
     name
     todos {
       title
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>


### オンラインのユーザーとそのプロファイル情報の取得 {#fetch-online-users}

このGraphQLクエリは、現在オンライン中のオンラインユーザーと、そのプロファイル情報（このデータでは名前のみ）を取得します。

```graphql
 query {
   online_users {
     last_seen
     user {
       name
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>


## GraphQLクエリへのパラメータ（引数）の追加 {#adding-parameters}

多くのAPI呼び出しでは、通常、パラメータを使用します。例えば、取得するデータを指定する場合などです。このような場合、`GET` 呼び出しに慣れている方なら、クエリパラメータを使用します。例えば、10件のtodoだけを取得する場合、次のようなAPI呼び出しを使うかもしれません：`GET /api/todos?limit=10`

GraphQLクエリにはこれと類似した機能を持ち、「フィールド」に付加できる * 引数 * があります。

### 基本的な引数で10個のtodoを取得する {#basic-argument}

このGraphQLクエリでは、すべてではなく、10個のtodoを取得します。

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

ここで一番重要なのは、 `limit: 10` です。GraphQLサーバーが、特定のフィールドの横に表示される `()` に使用可能な引数のリストを提供します。この例ではHasuraを使用して、フィルタ、ソート、ページネーションなどの引数を提供するGraphQLバックエンドを作成しています。使用するGraphQLサーバーやAPIによって、使用できる引数のセットが異なる場合があります。

### 複数の引数を使って複数のフィールドを取得：ここでは1件のユーザーと、ユーザーごとに最新の5件のtodoを取得します {#multiple-arguments}

```graphql
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
```

異なるフィールドに引数を渡していることに注目してください。このGraphQLクエリは次のように解釈できます。
> ユーザー（1件まで）とそのtodo（作成時間を降順にして5件まで）を取得します。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

## GraphQL変数：クエリに動的に引数を渡します {#graphql-variables}

これは素晴らしいのですが、一つ問題があります。もし、動的に提供される引数でデータを取得するクエリを作成したい場合、クエリの文字列全体を再度作成する必要があります。

これは誰もが避けたいと思うことです。

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

ありがたいことにもうこのような心配は要りません。GraphQLでは、クエリを送信できる動的な「引数」を追加できます。

## $limit数のtodoを取得する {#fetch-limit}

このGraphQLクエリは次のようになります。
```graphql
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
```

上記のクエリに加えて次の変数オブジェクトも送信します。

```json
{
   "limit": 10
}
```

このオブジェクトを加えることで、GraphQLサーバーにクエリだけを送信するのではなく、クライアントからクエリと変数の両方を送信することができます。GraphQLサーバーは、自動的にクエリが指定する場所で変数を使用します。

GraphiQLを試してみましょう。
1. GraphiQLに移動します
2. このクエリを記述します
3. ページの一番下までスクロールして、「Query Variables」という小さいパネルを表示させます
4. ここに、クエリ変数をJSONオブジェクトで追加します

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試してみましょう </a></b>

## チュートリアルの総括 {#summary}

- GraphQLクエリを作成できる
- GraphQLクエリに引数を渡す方法を理解している
- クエリ変数を使って、引数を動的にする方法を理解している

次は、データの取得だけでなく、データの書き込みについて紹介します。
