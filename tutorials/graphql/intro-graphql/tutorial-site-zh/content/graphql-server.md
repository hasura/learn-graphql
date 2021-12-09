---
title: "GraphQL 服务器"
metaTitle: "GraphQL 服务器 | GraphQL 教程"
metaDescription: "GraphQL 因其客户端优势而闻名。 GraphQL 服务器进行繁重的工作，以确保借助最少的数据库查找和 API 调用来获取适当数量的数据。"
---

GraphQL 因其客户端优势而闻名。 GraphQL 服务器进行繁重的工作，以确保借助最少的数据库查找和 API 调用来获取适当数量的数据。

GraphQL 请求已由服务器`executed`，并且包含以下信息：
GraphQL 服务的模式、GraphQL 文档（其中包含选择集和字段等操作定义）。

服务器执行以下步骤：
- 解析文档
- 确定要执行的操作（如果多于 1 个）
- 验证请求并在失败时返回错误
- 执行操作（查询/变更/订阅）

编写 GraphQL 服务器有很多方式。 来看一下 GraphQL 社群最常使用的方式。

## 解析器方式 {#resolver-approach}

编写 GraphQL 服务器最常见的方式是通过定义模式，并为不同的操作和字段编写解析器。

将解析器想象成包含如何根据上下文处理特定字段的指令的函数。

解析器的基本签名如下所示：

```
resolverFunc(data, args, context, info)
```

- `data`- 先前从父级抓取的数据。
- `args`- 参数的键值对，可选。
- `context`- 每个请求的状态信息，通常用于身份验证逻辑
- `info`- 关于遍历选择上下文的元数据。

现已为 GraphQL 查询中的每个字段执行该解析器功能。

### N+1 性能问题 {#performance-problem}

假设我必须抓取作者及其文章列表。 在简单的 REST API 中，朴素版本类似于：

```
fetchData: async () => ORM.getAuthors().getArticles();
```

对数据库的 (SQL) 查询有两个 - 一个是为了抓取作者列表，另一个是为了抓取每个作者的文章列表。

现在，使用 GraphQL 进行该操作。

这里的 GraphQL 查询类似于：

```graphql
query {
  author {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

解析器类似于：

```
resolvers = {
  Query: {
    author: async () => {
      return ORM.getAllAuthors()
    }
  },
  Author: {
    articles:  async (authorObj, args) => {
      return ORM.getArticlesBy(authorObj.id)
    }
  },
}
```

好，现在我们看一下它的执行方式。 假设有 3 个作者，每个作者链接 2 篇文章。

为`author`调用第一个解析器，返回所有作者（本例中为 3 个）。 现在对于关联查询`articles`，将为每个作者调用一次解析器`articles`。 在这一朴素法中，这形成了对数据库的 4 次点击（1 次是作者，3 次是文章）。

你可以看到这个方法对性能的明显影响。

### 数据加载器 {#dataloader}

数据加载器是一款实用工具，可作为你的应用程序数据抓取层的一部分使用。 在尝试解决 N+1 问题时，它的作用是等待所有解析器加载各自的值，合并所有的单个加载，并通过请求的键调用批处理函数。

## 编译器法 {#compiler-approach}

批量解析器在很大程度上解决了性能问题。
它减少了对数据库的多次点击。 但即使使用批处理功能，根据查询的深度，对数据库的点击仍然有多次。

编译器法可将任何深度的一个 GraphQL 查询映射到一个数据库查询。 如果你的 GraphQL 查询处理来自数据库的数据，则其性能会更高。

了解 Hasura 如何使用编译器法[执行性能 GraphQL 查询](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/)。

## 混合法 {#hybrid-approach}

如果数据来源不同，则我们需要综合使用上述方法。 编译器法适用于查询的数据库部分，使用数据加载器批处理查询最适合批处理外部数据源/HTTP 请求。

混合法架构使用含有互连数据库的服务器进行主要的 CRUD 操作，并使用解析器法执行通过不同的数据源抓取或变更数据的其他字段。

如果你从零开始自行编写 GraphQL 服务器，则要使用解析器法，编写函数，以解析查询的每个字段。 如果你希望将数据库映射至 GraphQL 以实现即时 CRUD，则编译器法就很适合。

通常，我们推荐混合法，你可以使用像 Hasura 这样的服务器，它为数据库提供即时 CRUD，而且如果你有某些其他的自定义业务逻辑，它还支持你编写自己的解析器。


