---
title: "创建关系"
metaTitle: "创建关系 | Hasura GraphQL 教程"
metaDescription: "教程的这一部分介绍如何使用 Hasura 控制台在两个表之间创建关系"
---

既然已创建外键约束，Hasura 控制台会自动建议基于该约束的关系。

转到`todos`表下的`Relationships`选项卡，应该就会看到如下建议的关系：

![待办事项关系页面](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-page.png)

在建议的对象关系中单击`Add`。

将关系名称输入为`user`（已预填写），然后单击`Save`。

![用户对象关系](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-relationship-user.png)

现在已在待办事项和用户表之间建立了关系。
