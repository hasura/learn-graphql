---
title: "创建待办事项 - 变更"
metaTitle: "变更以创建待办事项 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 变更以创建新的个人待办事项。在 GraphiQL 中尝试变更，传递授权令牌来获得认证结果。"
---

在本教程的这一部分中，您将学习如何使用 GraphQL 变更创建新的待办事项。

让我们定义一个 graphql 变更以执行插入到待办事项中。

```graphql
mutation ($todo: String!, $isPublic: Boolean!) {
  insert_todos(objects: {title: $todo, is_public: $isPublic}) {
    affected_rows
    returning {
      id
      title
      created_at
      is_completed
    }
  }
}
```

你还需要传入变量的值。

在 GraphiQL 中针对应用程序数据库[尝试](https://hasura.io/learn/graphql/graphiql)此变更，以查看响应是什么样的。

现在让我们将这个 graphql 变更集成到我们的 React 应用程序中。

