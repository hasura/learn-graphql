---
title: "架构"
metaTitle: "GraphQL 架构 | GraphQL React Apollo Hooks 教程"
metaDescription: "以http请求为例，了解GraphQL的架构、HTTP的GraphQL 、客户端服务器模型"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/what-is-graphql/"
---

在进一步了解GraphQL之前，了解一下如何是很有用的GraphQL实际上是在HTTP客户端中使用（通常是网络/移动应用）。

## GraphQL 通过 HTTP 提供服务

请看下图，以了解GraphQL在中的典型使用方式你的堆栈：

![GraphQL 通过 HTTP 提供服务](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### GraphQL 客户端-服务器流：

1. 请注意，GraphQL 查询并不是真正的 JSON； 它看起来像你*想要*的 JSON 形状。因此，当我们发出 'POST' 请求以将我们的 GraphQL 查询发送至服务器时，客户端将其作为“字符串”发送。
2. 服务器获取 JSON 对象并提取查询字符串。根据GraphQL 语法和图表数据模型（GraphQL 模式），服务器处理并验证 GraphQL 查询。
3. 正如典型的 API 服务器，GraphQL API 服务器随之调用数据库或其他服务，以抓取客户端请求的数据。
4. 接下来，服务器获取数据并以 JSON 对象的形式将其返回客户端。

### GraphQL 客户端设置示例：

在日常工作中，你其实无需担心潜在的HTTP 请求和响应。

就像你用REST API工作时，使用HTTP客户端以减少进行 API 调用和处理响应的样板文件，您可以选择一个 GraphQL 客户端来编写 GraphQL 查询，发送它们并处理响应要容易得多。

实际上，您如何发送 GraphQL 查询并接受 GraphQL 的机制响应已成为标准。这使得在上使用GraphQL非常容易客户端。

以下是典型的 GraphQL 客户端设置和发出查询的形式：

```javascript

// Setup a GraphQL client to use the endpoint

const client = new client("https://myapi.com/graphql");


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
