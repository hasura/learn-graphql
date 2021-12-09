---
title: "GraphQL 与 REST"
metaTitle: "GraphQL 与 REST | GraphQL 教程"
metaDescription: "GraphQL 与 REST 的对比。 对比 GraphQL 和 REST API，举例突出其主要差异并详细说明其互补性"
---

GraphQL 通常被标榜为 REST API 的替代品。 这一部分将举例说明 GraphQL 和 REST 之间的主要差异，也会介绍两者如何共存与互补。

## GraphQL 与 REST：示例 {#example}

假设你有一个抓取用户个人信息及其地址的 API。 在典型的 REST 情境中，请求/响应如下所示：

![GraphQL API 示例](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

REST API 的核心围绕资源展开。 资源由 URL 和请求类型（GET、POST 等）识别。

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

## 培养 GraphQL 思维 {#thinking-in-graphql}

我们正在改变我们对 API 调用的看法。 我们根据查询对返回数据的“单一 URL 端点”进行临时查询，而不是对不同的 URL 发出不同的 API 调用以获取数据。
- 'POST' 一条描述你需要的数据的查询，而非 'GET' 资源。
- 将你的 API 返回的数据视作一个“图表”，这支持你进行查询，从而一次性抓取“相关”数据片段。 在上述示例中，你在同一个 API 调用中抓取用户及该用户的地址（作为嵌套 JSON 对象），而不是发出两次 API 调用。
- 你在 POST 请求中作为数据发送的“查询”含有结构和语法。 该“语言”被称为 GraphQL。

如上面的例子所示，GraphQL 查询非常简洁而且易读！ 这是因为查询是你想要的最终 JSON 数据的“形状”。
这是使用 GraphQL 趣味十足的一个关键原因！

## GraphQL 的优势 {#graphql-benefits}

- **避免过度抓取**： 要避免抓取多于你需要的数据，因为你可以指定你需要的具体**字段**。
- **防止多次 API 调用**： 如果需要更多数据，也可以避免多次调用你的 API。 在上述用例中，你不需要发出两次 API 调用，以分别抓取`user`和`address`。
- **减少与 API 开发者的通信费用**： 有时候为了抓取你需要的确切数据，特别是如果你需要抓取更多的数据并希望避免多次 API 调用，则需要要求 API 开发者创建一个新 API。 借助 GraphQL，你即可*独立于* API 团队开展工作！ 这有助于你更快地开发你的应用程序。
- **自文档化**： 每个 GraphQL API 均符合一个“模式”，即图表数据模型和客户端可以发出哪些类型的查询。 这种功能支持社群开发大量酷炫的工具，以探索并可视化你的 API，或创建自动完成 GraphQL 查询、甚至执行“代码生成”的 IDE 插件。 我们稍后会更详细地介绍这一点！

以下是一个简单图表，列出了典型的 REST 式术语的 GraphQL 类似术语：

| 要求 | REST | GraphQL |
| :-- | :-- | :-- |
| 抓取数据对象 | GET | 查询 |
| 插入数据 | POST | 变更 |
| 更新/删除数据 | PUT/PATCH/DELETE | 变更 |
| 观看/订阅数据 | - | 订阅 |

### 模式和类型系统 {#schema-and-type-system}

在 REST API 中，没有模式或类型系统的概念。
另一方面，GraphQL 具有强大的类型系统，用来定义 API 的形式。 模式由映射至类型的字段定义，并用作客户端和服务器之间的契约。

该模式契约支持前端和后端开发者独立工作，同时保证满足数据要求。 在 REST API 中，虽然没有严格的契约，但遵循 OpenAPI 规范即可在文档方面更深入地了解 GraphQL 文档。 围绕 OpenAPI 的社群工具可带我们了解 REST API 的不同端点和数据有效负载。

### HTTP 状态代码 {#http-status-codes}

每个 GraphQL 请求，无论成功或报错，都应返回 200。 这与 REST API 相比是明显的差异，在 REST API 中，每个状态代码都指向某种类型的响应。

| 状态代码 | REST | GraphQL |
| :-- | :-- | :-- |
| 200 | Ok | Ok |
| 400 | 错误的请求 | - |
| 401 | 未授权 | - |

借助 REST API，错误可以是除 200 以外的任何错误，并且处理错误的客户端，应处理可能出现的不同代码。

借助 GraphQL，任何有效的响应（数据和错误）均应为 200。 在特殊的`errors`对象下处理作为响应正文的一部分的错误，且客户端工具将有助于更好地处理错误。

#### 监控 {#monitoring}

借助 REST API 和正确的 HTTP 状态代码，给定端点上的简单健康检查应该会显示 API 正常运行时间状态。 200 状态代码表示 API 已启动且正在运行，而 5xx 则意味着服务器出错。 这与 GraphQL 并不是无缝的，因为监控工具必须解析响应正文，以查看服务器是否返回数据或错误。

## 缓存 {#caching}

借助 REST API，所有的 GET 端点均可缓存在服务器端或使用 CDN。 它们可以由浏览器缓存，并由客户端标记，以供频繁调用。
GraphQL 不遵循 HTTP 规范，而且通过单个端点提供，通常是 (/graphql)。 因此，无法以与 REST API 相同的方式缓存查询。

但是，由于该工具，客户端的缓存优于 REST。 某些执行缓存层的客户端 (Apollo Client、URQL) 使用“内省”借助 GraphQL 的模式和类型系统，以支持其在客户端维护缓存。

在接下来的部分，我们将深入了解“内省”。


