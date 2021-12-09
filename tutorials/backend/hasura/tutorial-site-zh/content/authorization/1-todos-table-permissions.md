---
title: "设置待办事项表格权限"
metaTitle: "设置待办事项表权限 | Hasura GraphQL 教程"
metaDescription: "该教程介绍如何使用 Hasura 控制台设置待办事项表的插入、选择、更新和删除操作权限"
---

转到`todos`表下的“权限”选项卡，以添加相关权限。

## 插入权限 {#insert-permission}

我们将允许登录的用户创建新的待办事项条目，仅阐述 is_public 和标题列。

- 在输入新角色文本框中，键入“用户”
- 单击“插入”权限的“编辑”（铅笔）图标。 这会引出下面的部分，支持配置自定义检查和允许列。
- 在自定义检查中，请选择以下条件

```json
{"user_id":{"_eq":"X-Hasura-User-Id"}}
```

![待办事项行插入权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-table-row-permission-insert.png)

现在选择列插入权限下的`title`和`is_public`列。

![待办事项列插入权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-insert-column-permission.png)

最后在列预设下，选择从`from session variable`映射至`X-HASURA-USER-ID`的`user_id`。

**注：**会话变量是自每条请求的身份验证服务返回的键值对。 当用户发出请求时，会话令牌映射至一个`USER-ID`。该`USER-ID`可用在权限中，以表明只有当`user_id`列的值与会话变量`USER-ID`的值相等时，才允许插入到表中。

单击`Save Permissions`。

## 选择权限 {#select-permission}

如果一个待办事项条目是公共的或用户是已登录用户，我们就允许用户查看该待办事项条目。

现在单击“选择”权限的“编辑”图标。 在自定义检查中，请选择以下条件

```json
{"_or":[{"is_public":{"_eq":true}},{"user_id":{"_eq":"X-Hasura-User-Id"}}]}
```

![待办事项选择权限行](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-row.png)

在列选择权限下，选择所有列。

![待办事项选择列权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-select-permission-column.png)

单击`Save Permissions`

## 更新权限 {#update-permission}

我们将仅允许用户更新 is_completed 列。

现在单击“更新”权限的“编辑”图标。 在预更新自定义检查中，请选择`With same custom checks as insert`。

并且在列更新权限下，选择`is_completed`列。

![待办事项更新权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-update-permission-pre-update.png)

完成后请单击`Save Permissions`。

## 删除权限 {#delete-permission}

仅允许登录用户删除待办事项条目。

最后对于删除权限，请选择自定义检查下的`With same custom checks as insert, update`。

![待办事项删除权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-delete-permission.png)

单击`Save Permissions`，就完成了`todos`表的访问控制设置。
