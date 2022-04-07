---
title: "管理迁移文件"
metaTitle: "管理迁移文件 | Hasura GraphQL 高级教程"
metaDescription: "Hasura 带有一个内置的迁移系统来管理数据库架构。管理数据库架构以执行由版本控制的增量、可逆更新，是在生产中运行的应用程序的关键组成部分。"
---

管理数据库架构以执行由版本控制的增量、可逆更新，是在生产中运行的应用程序的关键组成部分。Hasura 带有一个内置的迁移系统来管理数据库架构。

更重要的是，当通过 CLI 提供服务时，控制台用户界面会自动生成迁移文件。这使得它很容易对架构进行修改，如简单地通过用户界面创建表、列、函数和视图。阅读更多关于 [Hasura 如何构建用户界面以自动生成数据库迁移的架构](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/)。

当然，用户界面不是生成迁移文件的唯一方法，尽管很方便。`hasura`CLI 支持您手动创建迁移文件。这是我们将在下面为本教程初始化架构的选项。

[下载 SQL 文件](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql)，执行以下命令。

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

适当更新 SQL 文件的路径。这将使用上述 SQL 文件的内容创建一个迁移文件。检查你的 hasura 项目`migrations`目录中新创建的迁移文件。

下一步，执行以下命令：

```bash
hasura migrate apply --database-name default
```

这将按照文件的顺序，`migrations`应用目录中存在的迁移文件。

现在前往 `http://localhost:9695/console/data`(数据选项卡)，查看未跟踪表的列表。这些表是初始迁移中使用的 SQL 文件的一部分。

如果您在考虑重置迁移，请参照这篇博客文章：[重置 Hasura 迁移](https://hasura.io/blog/resetting-hasura-migrations/)

**注**：使用 Hasura 迁移系统是可选的。如果您习惯或熟悉使用其他数据库迁移工具，您可以继续使用它来管理您的数据库架构。如果要禁用 Hasura 的迁移，可以通过 CLI 提供的控制台来进行。前往数据->迁移选项卡，并关闭切换键`Allow Postgres schema changes via console`。
