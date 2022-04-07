---
title: "許可リスト"
metaTitle: "許可リスト | Hasura GraphQL上級チュートリアル"
metaDescription: "Allowlistでは、プロジェクトで問題なく実行できるGraphQL 操作（クエリ/ミューテーション/サブスクリプション）の回数を設定できます。"
---

Allowlistでは、プロジェクトで問題なく実行できるGraphQL 操作（クエリ/ミューテーション/サブスクリプション）の回数を設定できます。

Allowlistを追加する方法

- コンソールの使用
- メタデータの使用
- Hasuraクラウドの自動操作

## コンソールでのAllowlist {#allowlist-through-console}

このSlackを使ったデモでは、 `users` クエリのみを許可して、それ以外のクエリはすべて拒否します。これを行うには、コンソールの `Settings` タブの `Allow List` ページに移動します。

![ コンソール上のAllow Lists ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

operation nameとoperation definitionを指定することで、手動でoperationを追加できます。

ここでは、operation nameを `users` にして、operation definitionを以下の通り設定します。

```graphql
query {
  users {
    id
    name
  }
}
```

![ Allow Listのoperation ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

同様に、ファイルアップロードを使ってすべてのoperationのリストを含むgraphqlファイルを手動でアップロードしてもこれを追加できます。

## メタデータでのAllowlist {#allowlist-through-metadata}

queryはcollectionに保存でき、collectionはallow-listによって追加・削除できます。collectionは次の [ APIs ](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections/#api-query-collections) によって追加できます

## HasuraクラウドでのAllowlist {#allowlist-through-hasura-cloud}

上記はすべての操作を手入力で行っていますが、Hasuraクラウドには、過去に実行されたoperationのリストを使って簡単にAllowlistを有効化する方法があります。

Hasuraクラウドプロジェクトの `Pro` タブ内の `Allow List` タブに移動します。次に、 `New Operations` に移動して、まだAllow ListにないOperation Listを表示します。

![ HasuraクラウドのAllowlist ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

この例では、user queryのみを選択するのに、手動で一件ずつ入力するのではなく、Operation Listから明示的に選択します。

注意したいのは、Introspection queryでさえ、GraphiQLインタフェースを動作させるためには明示的に追加する必要があり、このタブを使えばそれが素早くできます。もう一つのヒントは、常にクライアントからのqueryに名前を付けるようにしておけば、Allowlistへの追加や、検査とデバッグが容易になります。

## Allowlistの有効化 {#enabling-allowlist}

Allowlistは、env `HASURA_GRAPHQL_ENABLE_ALLOWLIST` によって明示的に有効にする必要があります。

Hasuraクラウドのプロジェクト設定ページの `Env vars` タブに移動して、このenvを有効にします。
