---
title: "分析查询计划"
metaTitle: "分析查询计划 | Hasura GraphQL 高级教程"
metaDescription: "Postgres 提供强大的工具，帮助理解查询运行的速度有多慢。你可以使用 `EXPLAIN` 执行简单的 SQL 语句，以询问数据库某条特定的查询为什么要运行很长时间。"
---

Postgres 提供强大的工具，帮助理解查询运行的速度有多慢。你可以使用 `EXPLAIN` 执行简单的 SQL 语句，以询问数据库某条特定的查询为什么要运行很长时间。例如，在我们的 Slack 模型中，我们可以在控制台 `Data` 页面的 `SQL` 选项卡中进行以下查询：

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

上述查询将返回一个 `JSON` 响应，其中包含 `Total Cost`、`Planning Time`、`Execution Time` 等的数据以及其他指标。这些指标有助于理解一条查询运行多长时间以及需要优化哪些环节。例如，该查询返回了一个计划类型 `Seq Scan`（序列扫描），该计划对于大数据集可能会相对较慢。

## PostgreSQL 索引 {#postgresql-indexes}

Postgres 索引是一种提高频繁查询的列的性能的方式。这个概念类似于书里的索引。通过维护额外的元数据，它有助于你更快地访问正在查找的数据。

假设数据库收到大量按名称查询选择信道的请求，例如：

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

在 API 浏览器中，进行以下查询，

```graphql
query {
    channel {
        id
        name
    }
}
```

然后单击 `Analyze` 按钮。

![解释/分析](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

你会看到有一个序列扫描。如果数据库中有大量记录，这可能会变得比较慢。

现在我们可以在信道表的名称列上创建索引：

前往 Hasura 控制台上的数据选项卡，然后再次导航至 `SQL` 选项卡。

执行以下语句：

```sql
CREATE INDEX channel_name_index ON channel (name);
```

由于数据库现在能够更快地查找这些查询的结果，查询性能将显著提高。
