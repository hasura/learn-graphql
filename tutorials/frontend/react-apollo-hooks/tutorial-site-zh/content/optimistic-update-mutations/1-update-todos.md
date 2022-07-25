---
title: "更新待办事项 - 变更"
metaTitle: "变更以更新待办事项 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 变更以更新现有个人待办事项。尝试在 GraphiQL 中进行变更，传递授权令牌以将待办事项标记为已完成"
---

在本教程的这一部分中，您将学习如何使用 GraphQL 变更将现有的待办事项标记为已完成。

让我们定义一个 graphql 查询，以对待办事项进行变更。

```graphql
  mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
      affected_rows
    }
  }
```
你还需要传入变量的值。

在 GraphiQL 中针对应用程序数据库[尝试](https://hasura.io/learn/graphql/graphiql)此变更，以查看响应是什么样的。

现在让我们将这个 graphql 变更集成到我们的 React 应用程序中。
