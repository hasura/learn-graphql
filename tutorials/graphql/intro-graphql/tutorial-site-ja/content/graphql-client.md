---
title: "GraphQLクライアント"
metaTitle: "GraphQLクライアント | GraphQLチュートリアル"
metaDescription: "GraphQLクライアントは、queryingとcachingを改善し、繰り返し利用可能なモジュールの構築をサポートします。GraphQLクライアントが必要な理由と、広く使われているクライアントライブラリを紹介します"
---

このセクションでは、専用のGraphQLクライアントが、どのようにqueryingとcachingを改善し、繰り返し利用可能なモジュールの構築をサポートするのかを見ていきます。

GraphQLリクエストは、ネイティブなJavaScript Fetch APIを使用して作成できます。例えば作成者のリストを取得するためには、以下に示すようなコードを使ってqueryを実行します。

```javascript
const limit = 5;
const query = `query author($limit: Int!) {
    author(limit: $limit) {
        id
        name
    }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { limit },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

これを実行するための前提は、サーバーがHTTP経由でGraphQLリクエストを受け付けていることです。（GraphQLがプロトコルに依存しないことは覚えていますか）

## GraphQLクライアントが必要な理由 {#why-do-i-need-a-graphql-client}

ここまでは旧来のFetch APIメソッドを使ったリクエストについて学んできましたが、GraphQLクライアントが必要な理由とは何でしょうか。

#### queryの構築とレスポンス処理{#constructing-query-processing-response}

GraphQLクライアントは、関連するヘッダーとコンテキストの情報とGraphQLドキュメントのみを使用して、完全なqueryを構築することができます。Fetch API呼び出しコードを毎回記述する代わりに、クライアントが呼び出しを処理し、パースした後にレスポンスデータやエラーを返します。

#### UIステートの管理 {#managing-ui-state}

GraphQLはUIステートを管理し、複数のUIコンポーネント間でデータを同期するのにも役立ちます。

#### キャッシュの更新 {#updating-cache}

GraphQLクライアントは、queryやmutationから取得したデータのキャッシュエントリの管理にも使用できます。上記のようなUIのリアクティブな更新は、キャッシュを使うことで実現します。

広く使われているGraphQLクライアントのコミュニティに、 [ Apollo Client ](https://github.com/apollographql/apollo-client) と [ Relay ](https://github.com/facebook/relay) があります。

## Fluent GraphQLクライアント{#fluent-graphql-clients}

GraphQLクライアントを使ってGraphQLのqueryやmutationを記述していると、それが独自の構文を持つただの生の文字列であることに気づくはずです。この文字列は通常、外部ライブラリを使って有効なGraphQL queryにパースされます。

Fluent GraphQLクライアントを使えば、これらのqueryをオブジェクトとして記述できます。Fluent APIの目的は、各methodからthisやselfを返すことで生じるメソッドチェーンにより、コードを読みやすくすることにあります。Fluent GraphQLクライアントを使えば、queryをオブジェクトとして記述し、それをバックグラウンドでクエリ文字列に変換できます。

GraphQLクライアントは文字列から解放してくれるだけでなく、以下のメリットを提供します
- 強力なタイピング機能
- 信頼性高い型定義の一元管理
- queryの自動補完

試用可能なFluent GraphQLクライアントの一覧は、[こちら](https://github.com/hasura/awesome-fluent-graphql)からご覧いただけます。

