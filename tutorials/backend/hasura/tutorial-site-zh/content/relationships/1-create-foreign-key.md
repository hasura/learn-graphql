---
title: "创建外键"
metaTitle: "创建外键 | Hasura GraphQL 教程"
metaDescription: "教程的这一部分介绍如何使用 Hasura 控制台为表中的列创建外键"
---

在`todos`表中，理想情况下，`user_id`列的值必须出现在`users`表的`id`列中。 否则会导致数据不一致。

Postgres 支持定义外键约束，以强制执行该条件。

我们为`todos`表中的`user_id`列定义一个外键。

转到“控制台” -> “数据” -> 待办事项 -> 修改页面。

它应该类似于：

![待办事项修改页面](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-modify-page.png)

下滑至底部的`Foreign Keys`部分，然后单击`Add`。

![user_id 外键](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-id-foreign-key.png)

- 选择引用表作为`users`
- 选择 From 列作为`user_id`，选择 To 列作为`id`

我们强制要求，待办事项表 user_id 列必须是用户表中的 id 值之一。

单击`Save`，以创建外键。

太好了！ 现在，你已确保数据一致性。
