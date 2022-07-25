---
title: "尝试 GraphQL API"
metaTitle: "尝试 GraphQL API | Hasura 身份验证 Slack 教程"
metaDescription: "探索用户表的 GraphQL API，Hasura GraphQL 引擎在该表中自动生成查询、变更和订阅"
---

如你所知，Hasura 通过 [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) 为你提供即时 GraphQL API，你可以在[我们刚刚创建的表上](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/)测试该 API。

开始探索 `users` 表的 GraphQL API 吧。

## 变更 {#mutation}

转到控制台 -> GRAPHIQL 选项卡，然后使用 GraphQL 变更插入一位用户。

```graphql
mutation {
  insert_users(objects:[{name:"Praveen", email: "myemail@example.com", password: "password123"}]) {
    affected_rows
  }
}
```

单击 GraphiQL 界面上的`Play`按钮，以执行查询。

你应该会得到类似这样的响应：

```graphql
{
  "data": {
    "insert_users": {
      "affected_rows": 1
    }
  }
}
```

太棒了！现在，你已使用刚刚为 `users` 表创建的变更查询。很简单，对不对？

**提示**：单击几下，即可使用 GraphiQL 界面上的 `Explorer` 生成变更。

## 查询 {#query}

现在让我们查询刚刚插入的数据。

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

你应该会得到类似这样的响应：

![用户查询](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-query-user.png)

请注意，某些列（如`created_at`）有默认值，即使你并没有在变更过程中插入它们。

## 订阅 {#subscription}

让我们对`users`表进行订阅查询，以观察对表的更改。

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

最初，订阅查询将返回响应中的现有结果。

现在，在用户表中插入新数据，然后查看出现在响应中的更改。

在新选项卡中，转到控制台 -> DATA 选项卡 -> 用户 -> 插入行，然后插入另一行。

切换到上一个`GRAPHIQL`选项卡，然后查看返回 2 个结果的订阅响应。

![用户订阅](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

活跃的订阅查询将根据该查询不断返回最新的结果集。
