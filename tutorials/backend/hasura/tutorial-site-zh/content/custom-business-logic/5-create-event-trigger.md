---
title: "创建事件触发器"
metaTitle: "添加事件触发器 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何在 Hasura GraphQL 引擎中使用控制台添加事件触发器"
---

可以借助 Hasura 控制台创建事件触发器。

打开 Hasura 控制台，转到“事件”选项卡，然后单击“创建触发器”按钮，以打开下方的界面，从而创建事件触发器：

## 添加事件触发器 {#add-event-trigger}

为该事件触发器命名（如 send_email），然后选择`users`表并选择`insert`操作。

单击`Create`。

![创建事件触发器](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-event-trigger.png)

## 试一下 {#try-it-out}

为了测试该触发器，我们需要在用户表中插入新的一行。

转到“控制台” -> “数据” -> “用户” -> “插入行”，然后插入新的一行。

现在，转到“事件”选项卡，然后单击`send_email`事件，浏览已处理的事件。

![测试事件触发器](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/test-event-trigger.png)

现在，每当在`users`表中插入新的一行时，都会触发该事件。
