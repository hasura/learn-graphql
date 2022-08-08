---
title: "工作空间权限"
metaTitle: "工作空间权限 | Hasura 身份验证 Slack 教程"
metaDescription: "这一部分将介绍如何为应用程序的工作空间创建权限"
---

## 选择权限 {#select-permission}

Slack 的登录用户可以读取哪些工作空间数据？

- 工作空间的任何成员应该都能够读取关于其工作空间的数据。

这是一个典型的布尔表达式，表示尝试访问工作空间表中记录的人员必须是所有者 `owner_id = X-Hasura-User-Id` 或者必须与记录同属一个工作空间 `workspace_members.user_id = X-Hasura-User-Id`

### 行级选择 {#row-level-select}

上述语句的扩展的有效布尔表达式如下所示：

```
{
  "_or": [
    {
      "owner_id": {
        "_eq": "X-Hasura-User-Id"
      }
    },
    {
      "workspace_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  ]
}
```

### 列级选择 {#column-level-select}

在过滤出用户应该可以访问的行后，我们需要再过滤出他们有权读取哪些字段。由于不存在需要仅限于特定类型用户的敏感数据，因此我们允许为所有列进行选择。

我们已完成读取访问权限部分。让我们前往写入访问权限部分，该权限支持用户创建、更新或删除记录。

## 插入权限 {#insert-permission}

是否允许应用程序的用户直接在 `workspace` 表中插入数据？是，任何经过身份验证的用户都可以自行创建工作空间。它转化为以下表达式：

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### 列预设 {#column-presets}

进行插入操作时，你可以设置静态值或会话变量，作为该列的默认值。

在工作空间表中，owner_id 应自动设置为会话变量 `X-Hasura-User-Id`，且不允许用户设置该值。我们在此用例中使用列预设来实现这一点。

![Slack 工作空间用户插入](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-workspace-user-insert.png)

## 更新权限 {#update-permission}

谁可以更新 `workspace` 表中的现有数据？

仅允许经过身份验证的应用程序用户和工作空间所有者更新工作空间中的数据。

### 行级更新 {#row-level-update}

上述条件转化为以下表达式：

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

仅当列的 `owner_id` 与经过身份验证的用户 id 值 (`X-Hasura-User-Id`) 相匹配时才更新行

### 列级更新 {#column-level-update}

我们需要确定允许用户直接从应用程序中更新哪些列。一个简单的检查清单应该不允许用户更新 `id`、`owner_id` 和 `created_at` 值。其余的列可以设置为允许。

## 删除权限 {#delete-permission}

工作空间的所有者应该是唯一能够删除该工作空间的用户。这再次转化为以下表达式：

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

请注意，如果工作空间被删除，所有其他表中的所有相关记录也应一并删除。因此，这可以由服务器端的管理员角色作为单个操作完成，而非允许从客户端直接删除该工作空间。还有一个方案是使用 ON DELETE 触发器来执行级联删除，这将删除整个数据库中的所有相关行。
