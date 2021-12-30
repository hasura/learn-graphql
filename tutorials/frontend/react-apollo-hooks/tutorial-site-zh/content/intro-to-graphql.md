---
title: "GraphQL 介绍"
metaTitle: "GraphQL 介绍 | GraphQL React Apollo Hook 教程"
metaDescription: "什么是 GraphQL？GraphQL 是关于如何与 API 对话的规范。这一部分还将举例介绍 GraphQL 和 REST 的区别，并带你了解 GraphQL 的优势"
---

## 什么是 GraphQL？
GraphQL 是关于如何与 API 对话的规范。它通常用于 HTTP，其中的核心思路是将“查询”`POST`至 HTTP 端点，而不是为了不同的资源访问不同的 HTTP 端点。

GraphQL 专为网络/移动应用（HTTP 客户端）的开发者设计，以便能够进行 API 调用，方便地从它们的后端 API 中获取需要的数据。

## GraphQL 与 REST：示例
假设您有一个 API 来获取用户的个人资料及其地址。在典型的 REST 情境中，请求/响应如下所示：

![GraphQL API 示例](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

如果你的 API 服务器以前是 GraphQL 服务器，则你的 API 调用将类似于：

![GraphQL API 示例](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

可以看到，对于客户端发送的不同“查询”，响应 JSON 是不同的。

```
Request1:         |  Response1:

query {           |  {
  user (id: 1) {  |    "user": {
    id            |       "id": 1
  }               |     }
}                 |  }

----------------------------------------

Request2:         |   Response2:

query {           |   {
  user (id: 1) {  |     "user": {
    id            |       "id": 1
    name          |       "name": "Elmo"
  }               |     }
}                 |   }
```

## 培养 GraphQL 思维

我们正在改变我们对 API 调用的看法。
取代向不同的 URL调用不同的 API 来获取数据，我们正在对“单个URL 端点”进行临时查询，端点根据查询返回数据。
- 你不再“获取”（GET）资源，而是“发布”（POST）一个描述您想要的数据的查询。
- 您将 API 返回的数据视为“图形”，这使您可以进行查询以便一次性获取 "相关 "的数据片断。在上面的示例中，您在同一个 API 调用中获取用户和用户地址（作为嵌套的 JSON 对象），而不是进行 2 次 API 调用。
- 您在 POST 请求中作为数据发送的“查询”含有结构和语法。该“语言”被称为 GraphQL。

正如您在上面的示例中看到的，GraphQL 查询看起来非常简洁且易于读取！这是因为查询是您想要的最终 JSON 数据的“形状”。这是使 GraphQL 成为工作乐趣的关键原因之一！

## GraphQL 的优势

- **避免过度获取**：您避免获取比自己需要的更多的数据，因为您可以指定需要的确切**字段**。
- **防止多次 API 调用**：如果您需要更多的数据，您也可以避免多次调用 API。在上面的情形中，您不需要进行 2 次 API 调用来分别获取`user`和`address`。
- **减少与 API 开发人员的通信**：有时候，为了获取你需要的准确数据，特别是如果您需要获取更多的数据，并希望避免多次 API
   调用，您需要请求 API 开发人员创建一个新的 API。使用 GraphQL，您的工作*独立*于 API 团队！这让你能够更快地在自己的应用程序上工作。
- **自文档**：每个 GraphQL API 都符合一个“架构”，即图形数据模型，以及客户可以进行哪些类型的查询。这让社区可以构建许多很酷的工具，来探索和可视化您的 API 或创建 IDE 插件自动完成您的 GraphQL 查询，甚至执行“代码生成”。我们会在稍后更详细地介绍这一点！

以下是一个简单图表，列出了典型的 REST 式术语的 GraphQL 类似术语：

| 要求 | REST | GraphQL |
| :-- | :-- | :-- |
| 抓取数据对象 | GET | 查询 |
| 编写数据 | POST | 变更 |
| 更新/删除数据 | PUT/PATCH/DELETE | 变更 |
| 观看/订阅数据 | - | 订阅 |
