---
title: "用户权限"
metaTitle: "用户权限 | Hasura 身份验证 Slack 教程"
metaDescription: "这一部分将介绍如何为应用程序的用户创建权限"
---

Slack 应用程序以用户为中心。我们先为应用程序的用户设置 CRUD 操作的权限规则。

## 选择权限 {#select-permission}

Slack 的登录用户可以读取哪些用户数据？

所有登录用户可以读取那些与登录用户同属一个工作空间的用户的数据。

该要求转化为如下内容：

- 你可以读取自己的用户数据。
- 你可以读取属于你所在工作空间的其他人的用户数据。

这是一个典型的布尔表达式，表示尝试访问用户表中记录的人员必须拥有该记录 `id = X-Hasura-User-Id` 或者必须与记录同属一个工作空间 `workspace_members.user_id = X-Hasura-User-Id`

### 行级选择 {#row-level-select}

上述语句的扩展的有效布尔表达式如下所示：

```
{
  "_or": [
    {
      "id": {
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

在过滤出用户应该可以访问的行后，我们需要再过滤出他们有权读取哪些字段。除了 `password` 字段，任何经过身份验证的用户都可以访问 `users` 表中的每一列，因为不存在需要仅限于某个用户的敏感数据。

![用户列权限](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-users-select-columns.png)

我们已完成读取访问权限部分。让我们前往写入访问权限部分，该权限支持用户创建、更新或删除记录。

## 插入权限 {#insert-permission}

是否允许应用程序的用户直接在 `users` 表中插入数据？否。用户在应用程序中注册，该过程由身份验证服务器执行，负责处理用户注册、验证、触发欢迎电子邮件等。因此，具有管理员角色访问权限的身份验证服务器将在验证后将记录插入到 `users` 表中，并生成正确的令牌。我们可以跳过为用户角色的插入操作定义权限。

## 更新权限 {#update-permission}

谁可以更新 `users` 表中的现有数据？

作为应用程序经过身份验证的用户，我应该只能更新自己的个人数据。

### 行级更新 {#row-level-update}

上述条件转化为以下表达式：

```json
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

仅当列的 `id` 与经过身份验证的用户 id 值 (`X-Hasura-User-Id`) 相匹配时才更新行

### 列级更新 {#column-level-update}

我们需要确定允许用户直接从应用程序中更新哪些列。一个简单的检查清单应该不允许用户更新其自己的 `id`、`email` 和 `created_at`。我们还将限制他们直接修改 `password` 列，因为已将它委托给身份验证服务器，该服务器在更新前进行必要的验证。

## 删除权限 {#delete-permission}

我们不希望允许用户直接从应用程序中删除其自己的用户记录，因此我们可以跳过为该操作定义规则。这应该由身份验证服务器完成，该服务器负责处理删除用户帐户验证后的用户管理。

## 其他角色的潜在考虑 {#potential-for-other-roles}

上述所有规则均适用于用户角色。但是，假设有些字段是用户专有的，不应该被其他用户读取。例如，在我们当前的模型中，假设 `phone_number` 字段是公开的。如果它的要求是专属于用户，那么我们需要创建一个新角色，比如 `me`，并为不包括 `phone_number` 列的选择权限定义规则。

行级选择规则将转化为如下内容：

```
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

角色 `me` 的列级权限保持不变，但角色 `user` 将无法访问 `phone_number` 列。
