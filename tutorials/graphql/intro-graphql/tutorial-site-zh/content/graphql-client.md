---
title: "GraphQL 客户端"
metaTitle: "GraphQL 客户端 | GraphQL 教程"
metaDescription: "GraphQL 客户端有助于更好地进行查询、缓存和创建可重用模块。 我们来看一下我们为什么需要 GraphQL 客户端和可用的热门客户端库"
---

这一部分将介绍专门的 GraphQL 客户端如何有助于更好地进行查询、缓存和创建可重用模块。

可以使用原生 JavaScript Fetch API 发出 GraphQL 请求。 例如，为了抓取作者列表，我们可以使用以下代码发出查询：

```javascript
const limit = 5;
const query = `query author($limit: Int!) {
    author(limit: $limit) {
        id
        name
    }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { limit },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

这当然是假设你的服务器接受通过 HTTP 发出的 GraphQL 请求。 （还记得 GraphQL 是与协议无关的吗？）。

## 我为什么需要一个 GraphQL 客户端？{#why-do-i-need-a-graphql-client}

既然我们已知道可以使用旧有的抓取 API 方式发出请求，那么 GraphQL 客户端的意义是什么？

#### 构建查询、处理响应 {#constructing-query-processing-response}

GraphQL 客户端有助于构建完整的查询，只需将 GraphQL 文档作为具有相关标头和上下文信息的输入。 因此，你不用每次编写抓取 API 调用，客户端就会为你处理，在解析后提供响应数据和错误。

#### 管理 UI 状态 {#managing-ui-state}

GraphQL 客户端也有助于跨多个 UI 组件管理 UI 状态并同步数据。

#### 更新缓存 {#updating-cache}

GraphQL 客户端也可用来管理从查询或变更中抓取的数据的缓存项。 上面提到的对 UI 的响应式更新是通过缓存实现的。

流行在社群中的 GraphQL 客户端包括 [Apollo Client](https://github.com/apollographql/apollo-client) 和 [Relay](https://github.com/facebook/relay)。

## 流畅的 GraphQL 客户端 {#fluent-graphql-clients}

在使用客户端编写 GraphQL 查询或变更时，你会发现它只是一个含有自己的语法的原始字符串。 通常使用外部库将该字符串解析为有效的 GraphQL 查询。

借助流畅的 GraphQL 客户端，即可将这些查询编写为对象。 流畅的 API 旨在通过方法链增加代码的可读性，即通过每种方法返回 this 或 self。 流畅的 GraphQL 客户端支持你将查询编写为对象，然后在幕后将其转换为字符串查询。

除了不用处理字符串，该客户端还提供：
- 强类型
- 类型定义的单一事实来源
- 自动完成查询

以下是一个可以尝试的[流畅 GraphQL 客户端列表](https://github.com/hasura/awesome-fluent-graphql)。

