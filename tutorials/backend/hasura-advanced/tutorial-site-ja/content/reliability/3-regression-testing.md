---
title: "回帰テスト"
metaTitle: "回帰テスト | Hasura GraphQL上級チュートリアル"
metaDescription: "回帰テストは、フロントエンドアプリやユーザーが必要とする操作の継続的な保守をサポートします"
---

回帰テストは、フロントエンドアプリやユーザーが必要とする操作の継続的な保守をサポートします。すなわち、これらの操作に対するGraphQLスキーマの変更を検証して（スキーマ統合）、GraphQL APIに破壊的な変更やリグレッションがないことを確認します。

![Hasuraによる回帰テスト](https://hasura.io/blog/content/images/2020/02/regression-testing-diagram-2.png)

本番インスタンスは、一般的に回帰テストスイートを実行できるように構成します。なぜなら、基礎となる [Postgresスキーマ](https://hasura.io/learn/database/postgresql/core-concepts/1-postgresql-schema/) やHasuraの構成への変更は、望まないリグレッションをスキーマにもたらす可能性があるためです。これは、新しい機能を繰り返し使用したり、既存の機能を削除したりする際に特に重要です。

## テストスイートの作成 {#create-test-suite}

HasuraクラウドコンソールのPro/Monitoringタブの一番下にある `Regresstion Tests` に移動します。フロントエンドクライアントが通常アクセスするアクションを選択します。Slackモデルでは、これまでのチュートリアルで使用したユーザーとチャネルのクエリの両方を追加します。`Add to test suite` をクリックします。追加が完了したら、リグレッションを検知できるか確認するため、スキーマを変更します。

![スイートの作成](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-suite.png)

CLIを使ってHasura Consoleを開きます（ `http://localhost:9695` ）。続いて、チャネルテーブルのスキーマを変更して、 `name` カラム名を `channel_name` に変更します。

`Run Tests` タブのテストスイートを実行すると、チャネルクエリに失敗します。

![回帰テストスイートの実行](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-run.png)

エラー（ `field "name" not found in type: 'channel'`）が出力されます。

このようなテストを行うことで、クライアントに対しての更新情報がないまま、破壊的な変更が本番環境にプッシュされることを防ぐことができます。

**注**：他のクラウドプロジェクトからテストスイートを選択して、現在のプロジェクトをテストできます。これは、本番環境で構成されたテストスイートをスキーマ変更後のステージング環境で動作させる場合に有効です。
