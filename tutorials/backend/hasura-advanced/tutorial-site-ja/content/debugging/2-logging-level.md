---
title: "ログレベル"
metaTitle: "ログレベル | Hasura GraphQL上級者向けチュートリアル"
metaDescription: "Hasuraサーバーは、http-log、websocket-log、webhook-logといった異なるログレベルでの設定が可能なGraphQL API向けに構造化されたログを出力します。"
---

チュートリアルの前半で、hasura/graphql-engineとpostgres向けのdocker-composeセットアップを実演します。サーバーログへアクセスするには、 `docker logs` コマンドに続いてHasuraのコンテナIDを使用します。これで、ローカルインスタンスにgraphql-engineのログが出力されます。Hasuraクラウドプロジェクトのデバッグは、Hasuraコンソールの `Pro/Monitoring` タブで行います。

このタブでは、APIの利用状況に関する様々な構造化メトリクスを表示します。エラーからウェブソケットの接続まで、各クエリを検査できます。オープンソース版とは異なり、クラウドインスタンスは個々の要求を検査するUXが優れています。

Hasuraクラウドのデフォルトでは、すべてのログタイプが有効になっています。ログタイプの無効化は、 `HASURA_GRAPHQL_ENABLED_LOG_TYPES` ENV変数で設定します。

次のログタイプが設定可能です。

- http-log
- websocket-log
- webhook-log

ログレベルを設定することで、情報を明示するレベルを指定できます。ログレベルの階層は `debug > info > warn > error` です。これを更新するには、 `HASURA_GRAPHQL_LOG_LEVEL` を使用します。最上位のログレベルは、 `debug` です。このログレベルと `dev` モードを組み合わせれば、基になるクエリ/ハンドラーの問題点を把握できます。
