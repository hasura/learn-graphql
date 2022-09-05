---
title: "尝试关系查询"
metaTitle: "尝试关系查询 | Hasura GraphQL 教程"
metaDescription: "使用 Hasura GraphQL 引擎，通过查询和嵌套数据探索表待办事项的 GraphQL API"
---

我们来探索一下已创建的关系的 GraphQL API。

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

你可以看到以下格式的响应：

![关系查询](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

如你所见，在同一个响应中，你会获得用户信息的结果，与你查询的结果完全一致。 这是一个一对一查询/对象关系的示例。
