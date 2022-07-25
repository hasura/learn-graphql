---
title: 写入数据 - 变更
metaTitle: "GraphQL 变更以插入数据 | GraphQL React Apollo Hooks 教程"
metaDescription: "使用 GraphiQL 尝试 GraphQL 变更。GraphQL 变更示例：含有动态参数和变量，用以插入数据"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-mutations/"
---

import {Link} from "gatsby";

这些是在攻克变更（哈哈）前应该了解的概念：
- <Link to="/intro-to-graphql/2-fetching-data-queries/#tryoutgraphqlqueries">使用 GraphiQL</Link>
- <Link to="/intro-to-graphql/2-fetching-data-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">使用查询变量</Link>

现在，让我们开始看看如何使用 GraphQL 来“写入”数据。GraphQL 变更是 GraphQL 查询类型，可能导致
你的后端状态“变更”或变化，就像典型的 `'POST'`、`'PUT'`、`'PATCH'`、`'DELETE'` API。

## 基本变更

由于我们的 GraphQL API 使用 Hasura，我们得到的变更包括插入、更新或删除，可以在我们的应用中使用。

让我们在待办事项应用上下文中尝试这些变更，观察变更是什么样子的。你从另一个 GraphQL 服务获得的变更
（比如说你的 API 团队建立了自己的服务）可能会有所不同。

### 创建待办事项

让我们进行一次 API 调用来创建一个待办事项。如你所料，这将是我们的待办事项应用程序的关键部分。😉

> **专业提示**：假设我们现在还不知道变更的名称来创建待办事项。GraphiQL 来帮你！前往 GraphiQL，在右边点击 "文档 "标签。在那里输入 “todo”，你会看到一个使用待办事项的 GraphQL 查询和类型的列表。阅读它们的描述，你很快就会发现 `insert_todos` 是你需要的操作。

创建待办事项的变更的标题为`insert_todos`。

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 变更后返回数据
请注意，要插入的待办事项的数据是作为`insert_todos`变更的一个参数发送的。但变更的“字段”指定您希望从服务器获得的_响应_的形状。


假设我们想在创建后获取整个待办事项对象作为响应：

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 将你插入的内容参数化

对于变更，我们几乎始终必须进行参数化！即使有的话，我们也很少会在应用程序中使用“硬编码”变更。 这是因为关于捕获哪些数据、如何修改或删除某些内容等的参数通常取决于某些用户操作。

既然我们已了解如何使用查询变量进行参数化，那么我们应用一下：

```graphql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

```javascript
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

稍后，我们将探索更多更新或删除数据的变更。这是深入了解变更的良好开端！

## 总结

- 你可以进行基本的 GraphQL 变更
- 你可以使用查询变量将动态参数/数据传递至变更

接下来，我们来了解 GraphQL 订阅
