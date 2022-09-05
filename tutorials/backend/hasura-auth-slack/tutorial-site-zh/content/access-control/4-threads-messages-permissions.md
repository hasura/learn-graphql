---
title: "线程和消息权限"
metaTitle: "线程和消息权限 | Hasura 身份验证 Slack 教程"
metaDescription: "这一部分将介绍如何为应用程序的线程和消息创建权限"
---

我们已完成所有基础表的规则（`users`、`workspace` 和 `channel`）。Slack 的主要部分是供用户在频道上或与其他用户之间发送和接收消息。我们来看一下这如何应用于访问权限控制规则。

让我们从 `channel_thread` 和 `channel_thread_message` 表开始。

## 选择权限 {#select-permission}

我们需要列出谁可以访问发布在任何频道上的消息。这个要求类似于：

- 任何频道成员都应该能够访问所有频道线程。

### 行级选择 {#row-level-select}

`channel_thread` 的表达式大致转化为以下内容：

```json
{
  "channel": {
    "channel_members": {
      "user_id": {
        "_eq": "X-Hasura-User-Id"
      }
    }
  }
}
```
`channel_thread_message` 的表达式略有不同，因为它多了一层嵌套。

```json
{
  "channel_thread": {
    "channel": {
      "channel_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  }
}
```

### 列级选择 {#column-level-select}

在过滤出用户应该可以访问的行后，我们需要再过滤出他们有权读取哪些字段。由于不存在需要仅限于特定类型用户的敏感数据，因此我们允许为所有列进行选择。

我们已完成读取访问权限部分。让我们前往写入访问权限部分，该权限支持用户创建、更新或删除频道。

## 插入权限 {#insert-permission}

任何属于某个工作空间的经过身份验证的用户都可以在该工作空间的频道里发布消息。对于 `channel_thread` 表，它转化为与上述相同的表达式。

## 更新权限 {#update-permission}

用户不得更新 `channel_thread`。那么谁可以更新 `channel_thread_message` 表中的现有消息呢？

- 任何经过身份验证的用户都可以更新他们发布在任何频道上的消息。

### 行级更新 {#row-level-update}

上述条件转化为以下表达式：

```json
{
  "user_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### 列级更新 {#column-level-update}

用户仅可更新 `channel_thread_message` 表中的 `message` 列。

## 删除权限 {#delete-permission}

创建消息的用户可以删除自己的消息。它转化为我们为更新操作定义的相同表达式。

与前面的步骤相同，可以应用级联删除，以删除所有从属数据和悬挂数据。

