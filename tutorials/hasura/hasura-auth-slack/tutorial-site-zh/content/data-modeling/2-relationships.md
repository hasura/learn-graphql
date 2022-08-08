---
title: "关系"
metaTitle: "关系 | Hasura 身份验证 Slack 教程"
metaDescription: "Slack 克隆的对象和阵列关系"
---

如果你数据库中的表/视图已连接，关系则能够支持发出嵌套对象查询。

GraphQL 模式关系可以是

- 对象关系（一对一）
- 阵列关系（一对多）

## 对象关系 {#object-relationships}

假设你希望查询  `workspace`和更多关于创建者 `user` 的信息，如果两者之间存在关系，则可以使用嵌套查询来实现。这是一对一查询，因此叫作对象关系。

此类嵌套查询的示例如下所示：

```graphql
query {
  workspace {
    id
    name
    owner {
      id
      name
    }
  }
}
```

在单个查询中，你能够提取工作空间及其相关的用户信息。由于你可以嵌套到任何层级，所以非常强大。

## 阵列关系 {#array-relationships}

我们看一下阵列关系的查询示例。

```graphql
query {
  users {
    id
    name
    messages {
      id
      message
      channel_id
    }
  }
}
```

在这条查询中，你能够提取用户，并为每个用户提取其发送的消息（多条）。由于用户可以拥有多条消息，因此这是阵列关系。

可以通过外键约束捕获关系。外键约束可确保没有悬挂数据。
Hasura 控制台根据这些约束自动建议关系。

虽然约束是可选的，但还是建议强制执行这些约束，以确保数据一致性。

上述查询还不能发挥作用，因为我们尚未定义关系。但这有助于我们了解嵌套查询的运作原理。