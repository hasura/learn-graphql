---
title: "Queryプランの分析"
metaTitle: "Queryプランの分析 | Hasura GraphQL上級チュートリアル"
metaDescription: "Postgresには、クエリの実行速度を把握するための強力なツールがあります。` EXPLAIN ` で簡単なSQLステートメントを実行すれば、特定のクエリに時間がかかる理由をデータベースに尋ねることができます。"
---

Postgresには、クエリの実行速度を把握するための強力なツールがあります。`EXPLAIN` で簡単なSQLステートメントを実行すれば、特定のクエリに時間がかかる理由をデータベースに尋ねることができます。例えば、Slackモデルで、コンソールの `Data` ページの `SQL` タブで以下のクエリを実行できます。

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

上の例では、 `Total Cost` 、 `Planning Time` 、`Execution Time` や、その他のメトリックスのデータを含んだ `JSON` 応答が返ってきます。これらのメトリックスは、クエリにかかる時間や、最適化が必要な部分を把握するのに役立ちます。例えばプランタイプで `Seq Scan` （シーケンシャルスキャン）が返ってきます。その場合、大規模なデータセットを扱ったときに比較的時間がかかる可能性があります。

## PostgreSQLインデックス {#postgresql-indexes}

Postgresインデックスは、頻繁にクエリされるカラムの処理を向上させる方法の一つです。そのコンセプトは本の索引に似ています。追加のメタデータを管理することで、検索対象のデータへのより迅速なアクセスを可能にします。

例えば、名前をクエリしてチャネルを選択する大量の要求をデータベースが受信したとします。

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

API Explorerで以下のクエリを実行します。

```graphql
query {
    channel {
        id
        name
    }
}
```

次に `Analyze` ボタンをクリックします。

![ 説明/分析 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

シーケンシャルスキャンがあることが分かります。この場合、データベースに大量のレコードがあると比較的時間がかかる可能性があります。

対策として、チャネルテーブルのネームカラムにインデクッスを作成します。

HasuraコンソールのDataタブに移動して、再度 `SQL` タブに移動します。

以下のステートメントを実行します。

```sql
CREATE INDEX channel_name_index ON channel (name);
```

これでデータベースがクエリ結果をより迅速に検索できるようになるため、これらのクエリに対するパフォーマンスが大幅に向上します。
