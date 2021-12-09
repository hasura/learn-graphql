---
title: "设置在线用户视图权限"
metaTitle: "设置在线用户视图权限 | Hasura GraphQL 教程"
metaDescription: "该教程介绍如何使用 Hasura 控制台设置在线用户视图的选择操作权限"
---

转到`online_users`视图下的“权限”选项卡，添加相关权限。

## 选择权限 {#select-permission}

在此视图中，我们仅希望用户能够选择数据，而不做任何更改。 因此，我们不会定义任何插入、更新或删除操作的权限。

对于“行”选择权限，请选择`Without any checks`，并选择“列”选择权限下的`id`和`last_seen`列。

![在线用户权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-permission.png)

单击`Save Permissions`。你已完成该实时待办事项应用程序所需的所有访问控制规则设置。
