---
title: "アーキテクチャ"
metaTitle: "GraphQLアーキテクチャ | GraphQL React Apollo Hooksチュートリアル"
metaDescription: "GraphQLアーキテクチャ、GraphQL over HTTP、HTTP要求を例にしたクライアントサーバーモデルについて学習します"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/what-is-graphql/"
---

GraphQLの理解を深める前に、HTTPクライアント（一般的にはWeb/モバイルアプリ）で実際にGraphQLがどのように使用されているかを理解しておくと有用です。

##  GraphQL over HTTP
以下の図を参照に、スタック内でGraphQLが通常どのように使用されているかを理解しましょう。

![ GraphQL over HTTP ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### クライアントサーバーにおけるGraphQLの処理フロー

1. GraphQL queryは、 * 必要な * JSONとフォーマットが似ていますが、JSONではないことに注意してください。そのため、GraphQLクエリをサーバーに送信するために「POST」要求を実行すると、クライアントからは「文字列」として送信されます。
2. サーバーはJSONオブジェクトを取得して、クエリ文字列を抽出します。GraphQLの構文とgraphデータのモデル（GraphQLスキーマ）に従って、サーバーはGraphQL クエリの処理と検証を実施します。
3. その後は一般的なAPIサーバーと同様で、GraphQL APIサーバーはデータベースや他のサービスを呼び出して、クライアントが要求したデータを取得します。
4. 次に、サーバーはデータを取得し、JSONオブジェクトにしてからクライアントに返します。

### GraphQLクライアントの設定例

実際のところ、日々の作業でHTTPリクエストとHTTPレスポンスの基礎的な部分を心配する必要はありません。

REST APIを使用する際にHTTPクライアントを使用すれば、API呼び出しと応答処理のためのボイラープレートが削減できます。それと同様に、GraphQLクライアントを選択すれば、GraphQLクエリの作成、送信、応答処理がより簡単になります。

実際、GraphQLクエリの送信とGraphQL応答を受信する仕組みはスタンダードになっています。これにより、クライアント側のGraphQLの扱いが非常に簡単になりました。

一般的なGraphQLクライアントのセットアップとクエリ作成コードを以下に示します。

```javascript

// Setup a GraphQL client to use the endpoint

const client = new client("https://myapi.com/graphql");


// Now, send your query as a string (Note that ` is used to create a multi-line
// string in javascript).

client.query(`
  query {
    user {
      id
      name
    }
  }`);
```
