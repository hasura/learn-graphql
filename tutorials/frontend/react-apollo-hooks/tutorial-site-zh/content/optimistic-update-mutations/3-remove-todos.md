---
title: "删除待办事项 - 变更"
metaTitle: "变更以删除待办事项 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 变更以删除现有的个人待办事项。在GraphiQL中尝试变更，通过授权令牌来删除一个待办事项"
---

在本教程的这一部分中，您将学习如何使用 GraphQL 变更删除现有的待办事项。

让我们定义一个graphql 查询以对待办事项进行变更。

```graphql
mutation removeTodo ($id: Int!) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
```

在 GraphiQL 中针对应用程序数据库[尝试](https://hasura.io/learn/graphql/graphiql)此变更，以查看响应是什么样的。你还需要传入变量的值。

现在让我们将这个graphql 变更集成到我们的React应用程序中。