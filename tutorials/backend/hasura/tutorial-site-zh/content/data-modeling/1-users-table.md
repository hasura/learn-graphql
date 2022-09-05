---
title: "创建用户表"
metaTitle: "创建用户表 | Hasura GraphQL 教程"
metaDescription: "转到“数据”选项卡，然后单击“创建表”，即可借助 Hasura 控制台创建用户表"
---

让我们先创建`users`表。

`users`表将包含以下列：

- `id`（输入文本）、
- `name`（输入文本）、
- `created_at`（输入时间戳和默认值 now()）
- `last_seen`（输入时间戳和可空值）

这些列与用户的属性关联。 `last_seen`列可用来存储用户在线时的最新时间戳。

在 Hasura 控制台中，转到`DATA`选项卡部分，然后单击我们之前连接的 Heroku 数据库（在左侧导航栏）。 数据库名称是`default`，模式名称是`public`。在登录`public`模式后，单击`Create Table`。输入用于创建上述表的值。

![创建表用户](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

完成后，请单击`Add Table`按钮，以创建表。

太好了！ 你已创建该应用程序所需的第一个表。
