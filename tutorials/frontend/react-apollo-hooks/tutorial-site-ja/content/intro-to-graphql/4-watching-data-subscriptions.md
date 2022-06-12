---
title: データの監視 - Subscriptions
metaTitle: "リアルタイムデータのGraphQL Subscriptions | GraphQL React Apollo Hooksチュートリアル"
metaDescription: "GraphiQLを使ったGraphQL Subscriptionsを試してみましょう。ウェブソケット経由でプッシュされたライブデータを取得するためのGraphQLサブスクリプションの例"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-subscriptions/"
---

GraphQLの仕様では、GraphQLクエリのようなサブスクリプションと呼ばれる機能が利用できます。この機能を使えば、データを一旦読み込んでから返すのではなく、サーバーがプッシュしたデータを取得できます。

これは、アプリで「イベント」や「ライブ結果」をバックエンドからサブスクライブするのに便利なだけでなく、アプリからイベントの「形」を管理することも可能にします。

GraphQLサブスクリプションは、アプリへのリアルタイム機能やリアクティブ機能の追加を容易にする重要なコンポーネントです。サブスクリプションをサポートするGraphQLクライアントとサーバーが優れている点は、ウェブソケットコードの処理に頼ることなく、優れたエクスペリエンスを構築できるところにあります。

## 初めてのGraphQLサブスクリプションを作成しましょう

ステップ1：https://hasura.io/learn/graphql/graphiql に移動します。ステップ2：テキストエリアに以下のGraphQL queryを書き込みます。

```graphql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```

ステップ3：プレイボタンをクリックします。

オンラインユーザーのセットが変更されるたびに、右側の応答ウィンドウに最新のセットが表示されます。

## GraphQLサブスクリプションの仕組み

GraphQLクエリとミューテーションは、POSTエンドポイントに送信される文字列です。GraphQLサブスクリプションはどうでしょうか。GraphQLサブスクリプションの場合、POSTエンドポイントで同様なことは起こり得ません。なぜならシンプルなHTTPエンドポイントでは、単に応答を返すだけで接続が閉じてしまうからです。

GraphQLサブスクリプションとは、ウェブソケットのエンドポイントに送信されるサブスクリプションクエリ文字列です。そして、バックエンドでデータが変更されるたびに、新しいデータがウェブソケットを介してサーバーからクライアントにプッシュされます。

## チュートリアルの総括

- GraphQLサブスクリプションの作成方法を理解している

GraphQLの基本的な使い方を学んだので、次はGraphQL APIとアプリを統合します。
