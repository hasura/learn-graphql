---
title: 观察数据 - 订阅
metaTitle: "用于实时数据的 GraphQL 订阅 | GraphQL React Apollo Hooks 教程"
metaDescription: "使用 GraphiQL 尝试 GraphQL 订阅。GraphQL 订阅示例：抓取通过 WebSocket 推送的实时数据"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-subscriptions/"
---

GraphQL 规范允许一种叫做订阅的东西，就像 GraphQL 查询一样但不是在一次读取中返回数据，而是从服务器推送数据。

这对你的应用程序从后台订阅 "事件 "或 "实时结果 "很有用，但同时允许你从你的应用程序中控制事件的 "形状"。


GraphQL 订阅是添加实时或反应式功能的重要组成部分
以轻松访问你的应用程序。
支持订阅的 GraphQL 客户端和服务器非常有用，因为
它们让你能够构建出色的体验，而不必处理 websocket 代码!

## 立即订阅 GraphQL

第1步：前往 https://hasura.io/learn/graphql/graphiql 第2步：在文本区编写这个 GraphQL 查询：

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

第3步：点击播放按钮。

每当在线用户的集合发生变化时，你会在右边的回复窗口中看到最新的集合。

## GraphQL 订阅如何运作？

GraphQL 查询和变更是发送到 POST 端点的字符串。什么是 GraphQL 订阅？该操作不能通过 POST 端点进行，因为简单的 HTTP 端点只会返回响应且连接会关闭。

GraphQL 订阅是发送到 WebSocket 端点的订阅查询字符串。每当后端出现数据变化，新数据都会通过 WebSocket 从服务器向客户端推送。

## 总结

- 你知道如何订阅 GraphQL

现在你对使用 GraphQL 的基础知识已经很熟悉了，让我们开始将 GraphQL API 与应用程序集成在一起！
