---
title: "メタデータの管理"
metaTitle: "メタデータの管理 | Hasura GraphQL上級チュートリアル"
metaDescription: "移行ファイルの管理だけでなく、Hasuraではメタデータの管理やバージョンの管理が必要です。"
---

移行ファイルの管理だけでなく、Hasuraではメタデータの管理やバージョンの管理が必要です。移行ファイルは、主に `database schema` の更新のために作成されます。一方、メタデータファイルは、テーブル/ビュー/ファンクションの追跡、リレーションの作成、権限の設定、イベントトリガーやリモートスキーマの作成など、コンソール上でアクションが実行されるたびに更新されます。これらはバージョン管理が可能なJson/yamlメタデータファイルとしてエクスポートできます。

このメタデータファイルは、同じ設定を取得するために他のHasuraインスタンスに後でインポートすることができます（データベーススキーマが存在する場合）。メタデータファイルを手動で編集してオブジェクトを追加し、そのメタデータファイルを使ってインスタンスを更新することも可能です。

コンソールのDataタブで、 `Track All` をクリックすると、すべてのテーブルとそのリレーションの追跡も可能です。

メタデータは、以下のコマンドでエクスポートできます。

```bash
hasura metadata export
```

これにより、メタデータはyamlでエクスポートされ、 `metadata` ディレクトリ内の所定のファイルが更新されます。

```bash
├── actions.graphql
├── actions.yaml
├── allow_list.yaml
├── cron_triggers.yaml
├── databases
│   ├── databases.yaml
│   └── default
│       ├── functions
│       │   └── functions.yaml
│       └── tables
│           ├── public_channel.yaml
│           ├── public_channel_member.yaml
│           ├── public_channel_thread.yaml
│           ├── public_channel_thread_message.yaml
│           ├── public_online_users.yaml
│           ├── public_user_message.yaml
│           ├── public_users.yaml
│           ├── public_workspace.yaml
│           ├── public_workspace_member.yaml
│           ├── public_workspace_user_type.yaml
│           └── tables.yaml
├── inherited_roles.yaml
├── query_collections.yaml
├── remote_schemas.yaml
├── rest_endpoints.yaml
└── version.yaml
```

- `actions.graphql` - このファイルには、アクションに定義されたGraphQLタイプが含まれています。このタイプはアクション間で共有され、信頼できる唯一の情報源となる点にご注意願います。
- `actions.yaml` - query/mutationやハンドラーの設定などのアクションの定義が含まれています。
- `allow_list.yaml` - サーバーに対するqueriesを制限するAllow Listsの設定が含まれています。
- `cron_triggers.yaml` - 作成したスケジュールトリガーのメタデータが含まれています。
- `databases` - このディレクトリには、本プロジェクトと接続されたすべてのデータベースが含まれています。
   - `functions` - 追跡されるべきPostgres関数が含まれています。
   - `tables` - GraphQLで公開する必要のあるすべてのPostgresテーブルとビュー、およびそれらの権限情報です。
- `inherited_roles.yaml` - 継承されたすべてのロールの定義が含まれています。
- `query_collections.yaml` - クエリは、コレクションの中でグループ化できます。このファイルには、そのようなグループが含まれています。
- `remote_schemas.yaml` - GraphQLエンドポイントやオプションのヘッダーに関する情報など、追加されたすべてのリモートスキーマに関するメタデータが含まれています。
- `rest_endpoints.yaml` - 特定のGraphQLクエリに対して作成されたすべてのRESTifiedエンドポイントのメタデータ。
- `version.yaml` - 使用されているメタデータのバージョン。現在のバージョンは3です。

Slackスキーマでは、 `tables` ディレクトリにすべてのpostgresテーブルと、そのテーブルに対するロールベースの権限が含まれています。スキーマや関連するメタデータを変更した場合、これらのファイルも自動的に更新されます。

## {#import-export-metadata} コンソールからのメタデータのインポート/エクスポート

Hasuraコンソールの設定ページには、メタデータを `.json` 形式で素早くインポート/エクスポートするオプションがあります。
