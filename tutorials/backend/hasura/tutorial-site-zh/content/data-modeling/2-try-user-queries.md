---
title: "通过 GraphQL API 探索用户"
metaTitle: 通过 GraphQL API 探索用户 | Hasura GraphQL 教程"
metaDescription: "探索用户表的 GraphQL API，其中的查询、变更和订阅是通过 Hasura GraphQL 引擎自动生成的"
---

Hasura 为你提供 Postgres 和其他数据库的即时 GraphQL API。 因此，可以在我们刚刚创建的表上进行测试。

开始探索`users`表的 GraphQL API 吧。 我们将使用 GraphiQL 探索 API。 GraphiQL 是 GraphQL 集成开发环境 (IDE)。 这是我们用来与 API 交互的强大工具。

转到“控制台” -> API -> GraphiQL 选项卡，即可访问 GraphiQL。

## 变更 {#mutation}

我们使用一个 GraphQL 变更添加用户。 将以下代码复制到 GraphiQL 界面中。

```graphql
mutation {
  insert_users(objects:[{id: "1", name:"Praveen"}]) {
    affected_rows
  }
}
```

单击 GraphiQL 界面上的`Play`按钮，以执行查询。

你应该会得到类似这样的响应：

![用户变更](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-mutation-user.png)

太好了！ 现在，你已使用刚刚为`users`表创建的变更查询。

**提示**： 单击几下，即可使用 GraphiQL 界面上的`Explorer`生成变更。

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

现在，我们将新数据插入到`users`表中，然后查看响应中出现的更改。

在新的浏览器选项卡中，转到控制台 -> `DATA`选项卡 -> 默认 -> 公共 -> 用户 -> 插入行，然后插入另一行。

![插入新用户](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/user-insert-new-row.png)

切换到上一个`GRAPHIQL`选项卡，然后查看返回 2 个结果的订阅响应。

![用户订阅](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphql-subscription-user.png)

活跃的订阅查询将根据该查询不断返回最新的结果集。
