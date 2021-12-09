---
title: "什么是 GraphQL？"
metaTitle: "什么是 GraphQL？ | GraphQL 教程"
metaDescription: "什么是 GraphQL？ GraphQL 是关于如何与 API 对话的规范。 这一部分还将举例介绍 GraphQL 和 REST 的区别，并带你了解 GraphQL 的优势"
---

## 什么是 GraphQL？{#what-is-graphql}
GraphQL 是关于如何与 API 对话的规范。 它通常用于 HTTP，其中的核心思路是将“查询”`POST`至 HTTP 端点，而不是为了不同的资源访问不同的 HTTP 端点。

GraphQL 专为网络/移动应用（HTTP 客户端）的开发者设计，以便能够进行 API 调用，以从其后端 API 精确抓取所需的数据。

在深入理解 GraphQL 前，有必要了解一下 GraphQL 在 HTTP 客户端的实际使用方式。

## GraphQL 通过 HTTP 提供服务 {#graphql-over-http}
查看下方图表，了解 GraphQL 通常如何用在你的堆栈中：

![GraphQL 通过 HTTP 提供服务](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### GraphQL 客户端-服务器流：{#graphql-client-server-flow}

1. 请注意，GraphQL 查询不完全是 JSON；它看起来类似
   你*想要*的 JSON 形状。 因此，当我们发出 'POST' 请求以将我们的 GraphQL 查询发送至
   服务器时，客户端将其作为“字符串”发送。
2. 服务器获取 JSON 对象并提取查询字符串。 根据
   GraphQL 语法和图表数据模型（GraphQL 模式），服务器处理
   并验证 GraphQL 查询。
3. 正如典型的 API 服务器，GraphQL API 服务器随之调用
   数据库或其他服务，以抓取客户端请求的数据。
4. 接下来，服务器获取数据并以 JSON 对象的形式将其返回客户端。

### GraphQL 客户端设置示例：{#example-of-graphql-client-setup}

在日常工作中，你其实无需担心潜在的
HTTP 请求和响应。

就像你在使用 REST API 并借助 HTTP 客户端来减少发出 API 调用和处理响应的样板时一样，你可以选择一个 GraphQL 客户端，更轻松地编写 GraphQL 查询、发送查询并处理响应。

其实，发送 GraphQL 查询和接受 GraphQL 响应的机制已发展为标准。 这使得在客户端使用 GraphQL 变得非常容易。

以下是典型的 GraphQL 客户端设置和发出查询的形式：

```javascript

// Setup a GraphQL client to use the endpoint

const client = new Client("https://myapi.com/graphql");


// Now, send your query as a string (Note that ` is used to create a multi-line
// string in javascript).

client.query(`
  query {
    user {
      id
      name
    }
  }`);
```

请务必注意，你可以使用简单的 JavaScript `fetch` API 进行 GraphQL API 调用，而且简单的用例其实不需要 GraphQL 客户端。 稍后我们将在 GraphQL 客户端部分详述这一点。
