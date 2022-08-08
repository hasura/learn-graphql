---
title: "通过 GraphQL API 探索待办事项"
metaTitle: "通过 GraphQL API 探索待办事项 | Hasura GraphQL 教程"
metaDescription: "探索待办事项表的 GraphQL API，其中的查询、变更和订阅是通过 Hasura GraphQL 引擎自动生成的"
---

与`users`表类似，在上一步创建的`todos`表将包含自动生成的 GraphQL API，供我们探索。

开始探索`todos`表的 GraphQL API 吧。

## 变更 {#mutation}

转到“控制台” -> API -> GraphiQL 选项卡，然后使用 GraphQL 变更插入待办事项。

```graphql
mutation {
  insert_todos(objects:[{title: "My First Todo", user_id: "1"}]) {
    affected_rows
  }
}
```

单击 GraphiQL 界面上的`Play`按钮，以执行查询。

你应该会得到类似这样的响应：

![待办事项变更](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-todo.png)

## 查询 {#query}

现在让我们查询刚刚插入的数据。

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

你应该会得到类似这样的响应：

![待办事项查询](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-todo.png)

请注意，某些列（如`is_public`、`is_completed`）有默认值，即使你并没有在变更过程中插入它们。

## 订阅 {#subscription}

让我们对`todos`表进行订阅查询，以观察对表的更改。 在上面的 GraphQL 查询中，用`subscription`替换`query`

```graphql
subscription {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

最初，订阅查询将返回响应中的现有结果。

现在，在待办事项表中插入新数据，然后查看出现在响应中的更改。

在新选项卡中，转到“控制台” -> `DATA`选项卡 -> 待办事项 -> “插入行”，然后插入另一行。

![插入新待办事项](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todo-insert-new-row.png)

切换到上一个`API`选项卡，然后查看返回 2 个结果的订阅响应。

![待办事项订阅](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-todo.png)
