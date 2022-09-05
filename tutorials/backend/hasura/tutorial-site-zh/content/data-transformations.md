---
title: "数据转换"
metaTitle: "在 Postgres 中进行数据转换 | Hasura GraphQL 教程"
metaDescription: "我们将借助“视图”和 SQL 函数利用 Postgres 数据转换功能，查找该应用程序所需的在线用户"
---



该待办事项应用程序的一个实时功能是显示在线用户列表。 我们需要一种根据`last_seen`的值获取这一信息的方式，该值显示用户最后在线的时间。

到目前为止，我们创建了表和关系。
Postgres 支持我们使用以下功能进行数据转换：

- 视图
- SQL 函数

在这个例子中，我们将使用`Views`。应用程序需要该视图，才能查找已登录用户和最近 30 秒内在线的用户。

## 创建视图 {#create-view}

用于创建该视图的 SQL 语句与此类似：

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

我们添加该视图并使用 Hasura 跟踪视图，以使之能够对其进行查询。

转到“控制台” -> “数据” -> SQL 页面。

![创建在线用户视图](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-view.png)

单击`Run`，以创建该视图。

## 在线用户订阅 {#subscription-to-online-users}

现在，通过对`online_users`视图提出订阅查询，进行测试。

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

在另一个选项卡中，更新现有用户的`last_seen`值，以查看订阅响应得到更新。

![更新最近在线的用户](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/update-users-last-seen.png)

将`last_seen`列的值输入为`now()`，然后单击`Save`。

现在，回到运行订阅查询的选项卡，以查看更新的响应。

![在线用户订阅](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-subscription.png)





