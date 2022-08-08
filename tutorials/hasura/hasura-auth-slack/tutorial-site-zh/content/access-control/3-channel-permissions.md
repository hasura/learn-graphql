---
title: "信道权限"
metaTitle: "信道权限 | Hasura 身份验证 Slack 教程"
metaDescription: "这一部分将介绍如何为应用程序的信道创建权限"
---

## 选择权限 {#select-permission}

我们需要查看用户可以访问哪些信道数据。这一标准看上去很简单：

- 信道的任何成员应该都能够读取关于该信道的数据。

这是一个典型的布尔表达式，尝试访问信道表中记录的人员必须属于该信道 `channel_members.user_id = X-Hasura-User-Id`

### 行级选择 {#row-level-select}

上述语句的扩展的有效布尔表达式如下所示：

```
{
  "channel_members": {
    "user_id": {
      "_eq": "X-Hasura-User-Id"
    }
  }
}
```

### 列级选择 {#column-level-select}

在过滤出用户应该可以访问的行后，我们需要再过滤出他们有权读取哪些字段。由于不存在需要仅限于特定类型用户的敏感数据，因此我们允许为所有列进行选择。

我们已完成读取访问权限部分。让我们前往写入访问权限部分，该权限支持用户创建、更新或删除记录。

## 插入权限 {#insert-permission}

是否允许应用程序的用户直接在 `channel` 表中插入数据？是，任何经过身份验证的所有者或管理员用户都可以自行创建信道。但他们只能在自己所属的工作空间中创建信道。它转化为以下表达式：

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

我们使用 `_and` 布尔表达式来表明两个条件均需要得到满足。user_type 表是对 `owner`、`admin` 和 `member` 值的列举。工作空间的所有者和管理员均可以创建信道，所以得出上述表达式。

### 列预设 {#column-presets}

在信道表中，`created_by` 应自动设置为会话变量 `X-Hasura-User-Id`，且不允许用户设置该值。我们在此用例中使用列预设来实现这一点。

## 更新权限 {#update-permission}

谁可以更新 `channel` 表中的现有数据？

仅允许经过身份验证的应用程序用户和工作空间所有者或管理员更新工作空间中的数据。

### 行级更新 {#row-level-update}

上述条件转化为以下表达式（同上）

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

### 列级更新 {#column-level-update}

我们需要确定允许用户直接从应用程序中更新哪些列。仅允许更改信道的公开状态和名称。（`is_public` 和 `name`）。

## 删除权限 {#delete-permission}

工作空间的所有者以及管理员应该是唯一能够删除信道的用户。这再次转化为上述布尔表达式（与插入和更新相同）。

请注意，如果信道被删除，所有其他表中的所有相关记录也应一并删除。因此，这可以由服务器端的管理员角色作为单个操作完成，而非允许从客户端直接删除该信道。还有一个方案是使用 ON DELETE 触发器来执行级联删除，这将删除整个数据库中的所有相关行。
