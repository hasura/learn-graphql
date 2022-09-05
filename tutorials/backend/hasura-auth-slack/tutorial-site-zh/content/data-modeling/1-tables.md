---
title: "Slack 克隆的表格"
metaTitle: "表 | Hasura 身份验证 Slack 教程"
metaDescription: "Slack 克隆数据建模"
---

让我们先查看数据模型。

## 用户 {#users}

该应用程序的主要功能以用户及其消息为中心。

所以，我们有以下表格。

- `users` 和 `user_message`

## 工作空间 {#workspace}

Slack 应用程序具有用户可以加入的工作空间。它由工作空间的所有者和管理员管理。以下表格满足了这一要求。

- `workspace`、`workspace_member` 和 `workspace_user_type`

## 频道 {#channel}

每个工作空间可以有专门用来讨论特定主题的频道，各自有来自该工作空间的成员子集。频道成员可以在频道中发布消息，每个成员都可以看到。

- `channel`、`channel_member`、`channel_thread` 和 `channel_thread_message`

最后的模型大致如下所示，其中包含基本关系列：

![Slack 数据模型](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-datamodel.png)

请注意，它不含有详细的列列表，但应该可以体现不同实体之间的关系。
