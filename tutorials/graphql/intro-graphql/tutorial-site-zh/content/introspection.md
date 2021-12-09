---
title: "GraphQL 内省"
metaTitle: "GraphQL 内省 | GraphQL 教程"
metaDescription: "了解什么是 GraphQL 内省，以及它如何有助于开发类似 GraphiQL 的社群工具。"
---

与 REST 相比，赋予 GraphQL 众多优势的一个主要功能是“内省”。 GraphQL 查询语言是强类型的。 这种强类型系统提供了查询和理解潜在模式的能力。

模式充当前端和后端团队之间的契约。 但前端开发者如何了解后端模式是怎样的？ 他们如何防止过度抓取或不足抓取？ 这可能是由于“内省”查询。

## 内省查询 {#introspection-queries}

GraphQL 服务器支持使用同样的 GraphQL 查询语言对其模式进行内省。

服务器公开以下有关`Query`操作类型的内省查询。

- `__schema`
- `__type`
- `__typename`

请注意，内省查询的开头是`__`。

## 社群工具 {#community-tooling}

内省的能力支持社群围绕 GraphQL 开发出色的工具。 存在 [GraphiQL](https://github.com/graphql/graphiql) 和 [GraphQL Playground](https://github.com/prisma-labs/graphql-playground)，两者利用“内省”功能，为开发者提供自编文件功能并快速试用 API。

以上工具利用`__schema`内省查询提供模式的文档。 尝试`__schema`查询以查看不同的选择集、字段和指示，从而进行详细了解。
