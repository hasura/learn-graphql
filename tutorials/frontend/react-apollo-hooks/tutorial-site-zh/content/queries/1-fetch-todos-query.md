---
title: "获取待办事项 - 查询"
metaTitle: "查询以获取待办事项 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 查询以获取个人待办事项。在 GraphiQL 中尝试，通过授权令牌来获取认证结果"
---

您将写的第一个graphql 查询将是获取个人待办事项。您将需要从属于登录用户的数据库中加载待办事项数据。让我们定义一个graphql 查询以获取所需数据。

```graphql
query getMyTodos {
  todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
    id
    title
    created_at
    is_completed
  }
}
```

在 GraphiQL 中针对应用程序数据库[尝试](https://hasura.io/learn/graphql/graphiql)此查询，以查看响应是什么样的。

**注**：您需要在查询前传递`Authorization: Bearer <token>`标头，以获取结果。在通过Auth0登录后，该令牌会在用户界面中自动填充。

该查询是实际的graphql查询，我们将在我们的React应用中使用，因此对其进行测试是为了确保它能按预期运行。

现在让我们将这个graphql查询集成到我们的React应用程序中。