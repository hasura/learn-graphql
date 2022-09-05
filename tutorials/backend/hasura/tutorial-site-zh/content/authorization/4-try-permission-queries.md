---
title: "测试权限"
metaTitle: "测试权限 | Hasura GraphQL 教程"
metaDescription: "探索 GraphQL API 对待办事项表的权限，并了解如何限制数据访问"
---

现在开始通过 GraphQL API 测试`todos`表的权限。

## 查询 {#query}

现在继续，通过添加两个请求头查询数据：

- `x-hasura-role`：`user`
- `x-hasura-user-id`：`1`

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

![待办事项查询](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-permission-testing.png)

请注意，你收到的响应已针对用户 id `1`进行了过滤。如果你将`x-hasura-user-id`的值改为`2`，则将仅返回用户 id `2`的数据。这确认了我们在先前步骤中配置的权限。

你也可以以类似方式测试`users`表的权限配置。
