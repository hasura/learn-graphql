---
title: データ取得 - Queries
metaTitle: "GraphQL Queriesによるデータ取得 | GraphQL React Apollo Hooksチュートリアル"
metaDescription: "ここでは、GraphiQLを使ったGraphQL Queryを試します。パラメータ、引数、変数を用いて動的にデータを取得するGraphQLクエリの例"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-queries/"
---

## GraphQLクエリを試す

このチュートリアルのために、GraphQL APIをセットアップしています。GraphQL APIを参照するには、GraphiQLを使用するのが最も一般的です。GraphiQL（「グラフィカル」と発音します）は、Facebookが開発したツールで、あらゆるGraphQL APIを簡単に探索できます。

GraphiQLをGraphQLエンドポイントに接続すると、サーバーにGraphQLスキーマを問い合わせて、クエリを参照・テストするためのUIが提供されます。これにより、高性能なオートコンプリート機能が実現します。

![ GraphiQLのデモ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

GraphiQLライクなツールがあれば、GraphQL APIは非常に使いやすくなり、外部のドキュメントツールなしでAPIをアプリに統合できます。

このチュートリアルで使ったリアルタイムtodoアプリのGraphiQLには、こちらからアクセスできます： [ hasura.io/learn/graphql/graphiql ](https://hasura.io/learn/graphql/graphiql)

プロジェクトでGraphQL APIを使用するなら、ほとんどの場合、GraphiQLライクなツールを使ってGraphQLクエリの探索・テストをすることになるでしょう。

## 基本的なGraphQLクエリ

1. GraphiQLで、 [ hasura.io/learn/graphql/graphiql ](https://hasura.io/learn/graphql/graphiql) を開きます。認証トークンを取得してAPIをクエリするためには、ログインする必要があります。実際のシナリオでは、GraphQL APIは保護されています。
2. ここではURLとヘッダーが表示されます。ヘッダーには、GraphQLクエリと併せて送信される認証トークンが含まれています。
3. 次に、このGraphQLクエリをGraphiQLウィンドウに貼り付けます

```graphql
 query {
   users {
     name
   }
 }
```

4. `ctrl + enter` または `cmd + enter` （Mac）を押すか、▶️アイコンをクリックしてGraphQLクエリを実行します
5. 右側には、システムにいるユーザー名のリストが表示されるはずです。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>

この世界に魔法はないということをお忘れなく。ホストされたGraphiQLアプリは、HTTPヘッダーを加えたGraphQLクエリ文字列を指定のエンドポイントのサーバーに送信します。その後、サーバーは右側に表示されるような応答を送信します。

## 「グラフ」の取得

todoアプリは、ユーザー、todos、そして現在オンライン中のユーザーの情報を保持しています。このAPIの「スキーマ」は次のようになります。

![ スキーマ ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

ご覧のように、3つのモデルが互いにリンクしている「グラフ」のようなスキーマです。

「グラフ」全体からデータの様々なスライスを取得するクエリを作成してみましょう。

### ユーザーとtodosの取得

このGraphQLクエリで、すべてのユーザーと公開されているtodosが取得できます。

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

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>


### オンラインのユーザーとそのプロファイル情報の取得

このGraphQLクエリは、現在オンライン中のオンラインユーザーと、そのプロファイル情報（この例では名前のみ）を取得します。

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

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>


## GraphQLクエリへのパラメータ（引数）の追加

多くのAPI呼び出しでは、通常、パラメータが使用されています。例えば、どのようなデータを取得するか指定する場合です。この場合、 `GET` 呼び出しに慣れているなら、クエリパラメータを使用するはずです。例えば、todoを10件だけ取得する場合は、次のようなAPI呼び出しを使うかもしれません： `GET /api/todos?limit=10`

これに類似したGraphQLクエリは、「フィールド」に付加できる * 引数 * です。

### 基本的な引数で10件のtodoを取得する

このGraphQLクエリでは、すべてではなく、10件のtodoを取得します。

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>

ここで一番重要なのは、 `limit: 10` です。GraphQLサーバーが、特定のフィールドの横に表示される `()` 内に使用可能な引数のリストを提供します。この例ではHasuraを使用して、フィルタ、ソート、ページネーションなどの引数を提供するGraphQLバックエンドを作成しています。使用するGraphQLサーバーやAPIによって、使用できる引数のセットが異なる場合があります。

### 複数フィールドに複数引数：ここでは1件のユーザーと、ユーザーごとに最新の5件のtodosを取得します

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

異なるフィールドに引数を渡していることに注意してください。このGraphQLクエリは次のように解釈します。
> ユーザー（1件まで）とそのtodos（作成時間を降順にして5件まで）を取得します。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>

<a name="query-variables"></a>

## GraphQL変数：クエリに動的に引数を渡します

これは素晴らしいのですが、一つ問題があります。もし、動的に提供される引数でデータを取得するクエリを作成したい場合、クエリの文字列全体を再度作成する必要があります。

これは誰もが避けたいと思うことです。

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

ありがたいことにもうこのような心配は要りません。GraphQL変数は、クエリで送信できる追加の変数で、「引数」を動的に提供できます。

## $limit数のtodoを取得する

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

GraphQLサーバーにクエリだけを送信するのではなく、クライアントからクエリと変数の両方を送信します。GraphQLサーバーは、自動的にクエリ内の適切な場所で変数を使用してくれます。

GraphiQLでこれを試してみましょう。
1. GraphiQLに移動します
2. このクエリを記述します
3. ページの一番下までスクロールすると、「クエリ変数」という小さいパネルがあります
4. ここに、クエリ変数をJSONオブジェクトとして追加します

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank"> GraphiQLを試す </a></b>

## チュートリアルの総括

- GraphQLクエリを作成可能
- GraphQLクエリに引数を渡す方法を理解している
- Query変数を使って、引数を動的にする方法を理解している

次は、データの取得だけでなく、データの書き込みについて紹介します。
