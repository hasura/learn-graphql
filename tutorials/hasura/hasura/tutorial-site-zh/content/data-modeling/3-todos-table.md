---
title: "创建待办事项表"
metaTitle: "创建待办事项表 | Hasura GraphQL 教程"
metaDescription: "转到“数据”选项卡，然后单击“创建表”，即可借助 Hasura 控制台创建待办事项表"
---

现在，继续创建另一个模型：`todos`

`todos`表将包含以下列：

- `id`（输入整数（自动增量））、
- `title`（输入文本）、
- `is_completed`（输入布尔值并默认为 false）
- `is_public`（输入布尔值并默认为 false）
- `created_at`（输入时间戳和默认值 now()）
- `user_id`（输入文本）

这些列与待办事项的属性关联。

请务必要将 id 列设为主关键字。

在 Hasura 控制台中，转到`DATA`选项卡部分，然后单击`Create Table`。输入用于创建上述表的值。

![创建表用户](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

完成后，请单击`Add Table`按钮，以创建表。
