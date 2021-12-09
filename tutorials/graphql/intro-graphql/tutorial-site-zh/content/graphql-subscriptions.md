---
title: 订阅 - 实时更新
metaTitle: "实时数据 GraphQL 订阅 | GraphQL 教程"
metaDescription: "借助 GraphiQL 尝试 GraphQL 订阅。 GraphQL 订阅示例：抓取通过 WebSocket 推送的实时数据"
---

GraphQL 规范支持某些类似于 GraphQL 查询的订阅，但不是在一次读取中返回数据，而是获取服务器推送的数据。

这有助于你的应用程序从后端订阅“事件”或“即时结果”，同时允许你通过应用程序控制事件的“形状”。

GraphQL 订阅是轻松为你的应用程序添加实时或响应式功能的关键组件。 支持订阅的 GraphQL 客户端和服务器，让你可以无需处理 WebSocket 代码，即可提供出色的体验！

## 立即订阅 GraphQL {#make-first-graphql-subscription}

`Step 1:`转到 https://hasura.io/learn/graphql/graphiql

`Step 2:`在文本区域编写该 GraphQL 查询：

```graphql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```

第 3 步： 单击播放按钮。

每次在线用户集发生更改时，你都会在右侧的相应窗口中看到最新的用户集。

## GraphQL 订阅如何运作？{#how-do-graphql-subscriptions-work}

GraphQL 查询和变更是发送到 POST 端点的字符串。 什么是 GraphQL 订阅？ 该操作不能通过 POST 端点进行，因为简单的 HTTP 端点只会返回响应且连接会关闭。

GraphQL 订阅是发送到 WebSocket 端点的订阅查询字符串。 每当后端出现数据变化，新数据都会通过 WebSocket 从服务器向客户端推送。

## 总结 {#summary}

- 你知道如何订阅 GraphQL

现在你已经熟悉使用 GraphQL 的基本知识，那我们来看一下服务器和客户端的结构。
