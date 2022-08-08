---
title: "设置用户表权限"
metaTitle: "设置用户表权限 | Hasura GraphQL 教程"
metaDescription: "该教程介绍如何使用 Hasura 控制台设置用户表的插入、选择、更新和删除操作权限"
---

我们还需要允许对`users`表的选择和更新操作。
请单击左侧边栏的`users`表，以导航至用户表页面并切换到“权限”选项卡。

## 选择权限 {#select-permission}

单击“编辑”图标（铅笔图标），以修改角色用户的选择权限。 这会打开下面的部分，支持配置其权限。

用户在这里应该能够访问所有其他用户的`id`和`name`数据。

![用户选择权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-select-permission.png)

单击`Save Permissions`

## 更新权限 {#update-permission}

已登录的用户应仅可修改自己的记录。 现在，让我们设置该权限。

在行更新权限中，选择自定义检查下的以下条件。

```json
{"id":{"_eq":"X-Hasura-User-Id"}}
```

在列更新权限下，选择`last_seen`列，因为这将在前端应用程序中更新。

![用户更新权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/users-update-permission.png)

单击`Save Permissions`，就完成了`users`表的访问控制规则设置。



