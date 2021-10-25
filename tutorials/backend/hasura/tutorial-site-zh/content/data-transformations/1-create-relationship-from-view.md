---
title: "创建用户关系"
metaTitle: "从视图手动创建关系 | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何使用 Hasura 控制台手动创建视图到表的关系"
---

既然已创建视图，我们就需要一种能够根据视图的`id`列获取用户信息的方式。 我们使用视图的`id column`，手动创建视图`online_users`到表`users`的关系。

转到“控制台” -> “数据” -> online_users -> “关系”页面。

通过选择关系类型`Object Relationship`，手动添加新关系。将关系名称输入为`user`。
将当前列的配置选择为`id`，则远程表将为`users`，且远程列将再次为`id`。

我们正在将当前视图的 id 列映射到用户表的 id 列，从而创建关系。

![从视图创建关系](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-relationship-view.png)

我们来探索一下已创建的关系的 GraphQL API。

```graphql
query {
  online_users {
    id
    last_seen
    user {
      id
      name
    }
  }
}
```

太好了！ 我们已彻底完成该应用程序的数据建模。
