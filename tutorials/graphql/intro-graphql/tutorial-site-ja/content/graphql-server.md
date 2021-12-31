---
title: "GraphQLサーバー"
metaTitle: "GraphQLサーバー | GraphQLチュートリアル"
metaDescription: "GraphQLは、クライアント側のメリットで知られています。GraphQLサーバーは、最小限のデータベース検索とAPI呼び出し回数で、適切なデータ量を取得するという重要な仕事を担っています。"
---

GraphQLは、クライアント側のメリットで知られています。GraphQLサーバーは、最小限のデータベース検索とAPI呼び出し回数で、適切なデータ量を取得するという重要な仕事を担っています。

GraphQL要求は、selection setやfieldなどの操作定義を含むGraphQLサービスのスキーマや、GraphQLドキュメントを使って、サーバーで `executed` します。

サーバーは以下の手順を実行します。
- ドキュメントのパース
- 操作が複数ある場合は、実行する操作を指定
- 要求を検証し、失敗した場合はエラーを返す
- 操作（query / mutation / subscription）の実行

GraphQLサーバーの記述方法には様々なアプローチがあります。GraphQLコミュニティで最も一般的に使われているアプローチを紹介します。

## Resolverアプローチ {#resolver-approach}

GraphQLサーバーのコードを記述する上で最も一般的なのアプローチは、スキーマを定義して、resolversで様々な操作やfieldを記述する方法です。

コンテキストベースの特定fieldの処理手順を指示する機能をresolversが担っていると考えてください。

resolverにおける基本的なsignatureを以下に示します。

```
resolverFunc(data, args, context, info)
```

- `data` - 親から予め取得していたデータ。
- `args` - 引数のkey-valueのペア、オプション。
- `context` - 要求ごとのステート情報、通常は認証ロジックに使用
- `info` - トラバーサルに使うcontextを選択するためのメタデータ

今では、このresolver関数はGraphQL queryのあらゆるフィールドにおいて実行されるようになりました。

### N+1によるパフォーマンスへの影響 {#performance-problem}

例えば、articlesとauthorのリストを取得する必要があるとします。シンプルなREST APIをナイーブなコードで作成すると次のようになります。

```
fetchData: async () => ORM.getAuthors().getArticles();
```

ここではデータベースに対してquery（SQL）が2件あります。一つはauthorのリストを取得し、もう一つはauthorごとのarticlesのリストを取得します。

このコードにGraphQLを使ってみましょう。

GraphQL queryを使うと次のようになります。

```graphql
query {
  author {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

resolverを使うと次のようになります。

```
resolvers = {
  Query: {
    author: async () => {
      return ORM.getAllAuthors()
    }
  },
  Author: {
    articles:  async (authorObj, args) => {
      return ORM.getArticlesBy(authorObj.id)
    }
  },
}
```

このコードが実際どのように動作するか考えてみましょう。3件それぞれのauthorに2件のarticlesがリンクされているとします。

最初のresolverによって `author` が呼び出され、すべてのauthor（この場合3件）が返ります。リレーショナルクエリの `articles` では、resolverの `articles` がauthorごとに一回ずつ呼び出されます。このナイーブなアプローチの場合、データベースへのヒットは計4件（authorで1件、articlesで3件）となります。

このアプローチだと、パフォーマンスに明らかな影響を及ぼすことが分かります。

### Dataloader {#dataloader}

Dataloaderは、アプリケーションのデータ取得レイヤーの一部として使用するユーティリティです。N+1問題の解決策には、すべてのresolverが値をロードしてからcoalesceを実行して、要求キーを使ってバッチ関数を呼び出すという方法があります。

## コンパイラアプローチ {#compiler-approach}

resolverをバッチ処理することで、N+1によるパフォーマンスへの影響は大幅に解消されます。これにより、データベースのマルチヒットが減少します。バッチ処理をしていても、クエリの深さによってはデータベースのマルチヒットが発生します。

コンパイラアプローチにより、任意の深さのGraphQL queryを1つのデータベースqueryにマップすることができます。データベースからのデータをGraphQL queryで処理する場合は、このアプローチの方がより高いパフォーマンスを発揮できます。

Hasuraのコンパイラアプローチを使って、GraphQL queryの実行性能を向上させる方法については、 [ こちら ](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) からご覧ください。

## ハイブリッドアプローチ {#hybrid-approach}

様々なソースから集められたデータを扱う場合は、上記のアプローチを組み合わせて対応します。コンパイラアプローチは、データベース部分のqueryに対して有効であり、DataLoaderを使ったqueryのバッチ処理は、外部データソース / HTTP要求のバッチ処理に対して最適です。

ハイブリッドアプローチのアーキテクチャの場合、主要なCRUD操作はデータベースと接続したサーバーで行います。一方、他のソースから取得・ミューテーションしたフィールドの実行にはresolverアプローチを使います。

GraphQLサーバーのコードを新しく作成する場合は、フィールドごとのqueryをresolveする関数を記述するresolverアプローチを使用します。インスタントCRUDを使うためのデータベースをGraphQLにマップする場合は、コンパイラアプローチが適しています。

Hasuraのようなサーバーでは、データベース処理向けのインスタントCRUDが提供されており、カスタムされたビジネスロジックが他にあっても独自のresolverを記述できます。このため、一般的にはハイブリッドアプローチが推奨されています。


