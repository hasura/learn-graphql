---
title: "GraphQL Response Caching"
metaTitle: "GraphQL Response Caching | Hasura GraphQL上級チュートリアル"
metaDescription: "Hasura GraphQLエンジン（OSS）は、完全に指定されたGraphQL ASTの内部表現をキャッシュしたQuery Cachingをサポートします。"
---

Hasura GraphQLエンジン（OSS）は、完全に指定されたGraphQL ASTの内部表現をキャッシュしたQuery Cachingをサポートします。GraphQL queryを実行すると、生成されたSQLはデータベースを検索するのに適切なセッションの変数を持つプリペアードステートメントになります。このプリペアードステートメントは、クエリ作成の高速化に役立ちます。詳細については [クエリキャッシング](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/performance/) をご覧ください

一部のクエリは他のものよりも頻繁にアクセスされます。そのようなクエリでは、以下の理由によりレイテンシーと応答時間に遅延が生じます。

- 応答サイズ
- サーバーの場所
- 同時に発生するAPI呼び出し数など

Hasuraクラウドはクエリの応答をキャッシュする機能を提供します。キャッシュ設定が有効な状態でqueryを実行した場合、Hasuraクラウドは、応答データを確実にキャッシュすることで応答時間を向上させます。

**注**：GraphQLの応答キャッシュは、最大100MBのキャッシュサイズの `Standard` 層に対して有効です。

## キャッシングの仕組み {#how-does-caching-work}

Hasuraは、データソース全体のデータモデルのメタデータと、アプリケーションレベルでの認証ルールを保持してます。これが、エンドツーエンドのアプリケーションキャッシングをサポートします。

以下に示す条件を満たした場合のみ、GraphQL クエリの応答をキャッシュできます。

- クエリの作成にリモートスキーマまたはリモート結合が使用されていない
- クエリおよび関連するユーザーの権限の作成にセッション変数が使用されていない
- 応答JSONファイルのサイズが100KB以下である

キャッシュされた応答は、LRU（Least Recently Used）キャッシュとして一定期間保存された後、使用状況に基づき、必要に応じて削除されます。

例えば、Slackモデルの `users` のレコードが頻繁にアクセスされたとします。これをキャッシュするクエリは、以下のようになります。

```graphql
query slackUsersCached @cached {
  users {
    id
    name
    display_name
    bio
  }
}
```

上記のクエリには、このクエリをキャッシュする必要があると指定するために、 `@cached` ディレクティブが含まれている点に留意してください。`default` では、これに対する応答は `60 seconds` でキャッシュされます。

次に応答のキャッシュに成功したかを確認します。HTTPレスポンスに `Cache-Control` ヘッダーを含め、そこに返されたレスポンスがキャッシュとして残る最大秒数を含めるのが理想的です。その時間を過ぎるとLRUからキャッシュが削除されます。

![Cache-Controlレスポンスのヘッダー](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cache-control.png)

Cache-Controlレスポンスのヘッダー値には、このレスポンスがあと何秒でキャッシュされるかが含まれています。

## キャッシュの有効期間 {#cache-lifetime}

キャッシュ内のエントリの最大有効期間は、@cached queryディレクティブでttl引数を使って設定します。設定する値は整数の秒数です。

```graphql
query usersCached @cached(ttl: 300) {
  users {
    id
    name
    display_name
    bio
  }
}
```
上記のqueryでは、@cachedディレクティブの引数に `ttl` を指定しています。この値がキャッシュが必要な期間です。

上記のqueryでは、設定可能な最大値の300秒間（5分間）を設定しています。

これで `Cache-Control` ヘッダーの読み取り時にクエリがキャッシュに残る時間が確認できます。通常クライアントは、このヘッダーをキャッシュされた応答を追跡するために使用します。
