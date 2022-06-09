---
title: "GraphQLとは何でしょうか。"
metaTitle: "GraphQLとは何でしょうか。| GraphQLチュートリアル"
metaDescription: "GraphQLとは何でしょうか。GraphQLとはAPIと対話するための規格です。ここでは、GraphQLとRESTを例として取り上げ、GraphQLの利点について説明します"
---

## GraphQLとは何でしょうか。{#what-is-graphql}
GraphQLとはAPIと対話するための規格です。一般的にGraphQLはHTTP上で使用され、その重要な概念は、異なるリソースに対して異なるHTTPのエンドポイントを充てるのではなく、HTTPエンドポイントに「クエリ」を `POST` する点です。

GraphQLは、ウェブ/モバイルアプリ（HTTPクライアント）の開発者が、APIを呼び出すことで、バックエンドAPIから必要なデータを正確に取得できるように設計されています。

GraphQLの理解を深める前に、HTTPクライアントで実際にGraphQLがどのように使用されているかを把握することが有用です。

## HTTP上のGraphQL {#graphql-over-http}
以下の図を参照に、GraphQLがスタックで動作する仕組みを理解しましょう。

![HTTP上のGraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### クライアントサーバーにおけるGraphQLの処理フロー：{#graphql-client-server-flow}

1. まず初めに、GraphQLクエリは、*望んでいる*JSONと似たフォーマットをしていますが、JSONではありません。そのため、「POST」リクエストを作成してGraphQLクエリをサーバーへ送信されますが、クライアントからは「文字列」になって送信されます。
2. サーバーはJSONオブジェクトを取得して、クエリの文字列を抽出します。GraphQLの構文とグラフのデータモデル（GraphQLスキーマ）に従って、サーバーはGraphQLクエリの処理と検証を実施します。
3. その後は、一般的なAPIサーバーと同様に、GraphQL APIサーバーはデータベースや他のサービスを呼び出して、クライアントがリクエストしたデータを取得します。
4. 次に、サーバーはデータを取得し、JSONオブジェクトにしてからクライアントに返します。

### GraphQLクライアントの設定の例：{#example-of-graphql-client-setup}

実際のところ、日々の作業でHTTPのリクエストとレスポンスの基礎的な部分を心配する必要はありません。

REST APIとHTTPクライアントを使えばAPIを呼び出して、処理のための定型文が削減できます。それと同様に、GraphQLクライアントを選択すれば、GraphQLクエリの作成、送信、応答処理がより簡単になります。

実際、GraphQLクエリを送信して、そのレスポンスを受け取る仕組みは標準的なものになっています。これにより、クライアントでのGraphQLの操作は非常に簡略化されています。

典型的なGraphQLクライアントのセットアップと、クエリの作成コードは以下の通りです。

```javascript

// Setup a GraphQL client to use the endpoint

const client = new Client("https://myapi.com/graphql");


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

シンプルなJavaScript `fetch` APIを使用してGraphQL APIを呼び出すことができるため、実際にはシンプルなユースケースにはGraphQLクライアントは不要です。後ほど、GraphQLクライアントセクションで詳細を紹介します。
