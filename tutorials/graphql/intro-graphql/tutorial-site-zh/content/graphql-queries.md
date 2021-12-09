---
title: 查询 - 抓取数据
metaTitle: "通过 GraphQL 查询抓取数据 | GraphQL 教程"
metaDescription: "使用 GraphiQL 尝试 GraphQL 查询。 GraphQL 查询示例：含有形参、实参和变量，用以动态抓取数据"
---

## 尝试 GraphQL 查询 {#try-out-graphql-queries}

在本教程中，我们为你创建了一个 GraphQL API。 浏览 GraphQL API 最常见的方式是使用 GraphiQL。 GraphiQL 是 Facebook 开发的工具（念作 "graphical"），可轻松探索任何 GraphQL API。

在将 GraphiQL 连接到 GraphQL 端点后，它会向服务器查询其 GraphQL 模式，并提供一个用于浏览和测试查询的 UI，提供令人叹为观止的自动完成功能！

![GraphiQL 演示](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

有了 GraphiQL 等工具，GraphQL API 可极其轻松地在你的应用程序中使用并集成 API，而无需外部文档工具。

点击此处，访问 GraphiQL，了解这款实时待办事项应用程序的教程：[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

如果你在某个项目中使用 GraphQL API，你几乎无一例外地要使用像 GraphiQL 这样的工具来探索并测试你的 GraphQL 查询。

## 基本的 GraphQL 查询 {#basic-graphql-query}

1. 打开 GraphiQL：[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)。 你必须登录，才能获得查询该 API 的身份验证令牌。 在实际应用情境中，你的 GraphQL API 会得到保护。
2. 你会看到一个 URL 以及含有身份验证令牌的标头，令牌将与你的 GraphQL 查询一起发送。
3. 现在，将该 GraphQL 查询粘贴在 GraphiQL 窗口中

```graphql
 query {
   users {
     name
   }
 }
```

4. 按`ctrl + enter`或`cmd + enter` (mac) 或单击 ▶️ 图标，以运行 GraphQL 查询 5。 右侧将显示系统中按名称排列的用户列表！

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

请谨记，这不是魔法！ 托管的 GraphiQL 应用程序向给定端点处的服务器发送带有 HTTP 标头的 GraphQL 查询字符串。 然后，该服务器发送右手边显示的响应。

## 抓取“图表” {#fetching-graphs}

我们的待办事项应用程序包含用户、待办事项和关于当前在线的用户的信息。 这是我们的 API“模式”的形式：

![模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

如你所见，这是一个“图表”样的模式，其中的 3 个模型均互相链接。

我们尝试进行查询，从整个“图表”中获取不同的数据片段。

### 抓取用户及其待办事项 {#fetch-users-and-their-todos}

该 GraphQL 查询将抓取所有用户及其公开可见的待办事项：

```graphql
 query {
   users {
     name
     todos {
       title
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>


### 抓取在线用户及其个人资料信息 {#fetch-online-users}

该 GraphQL 查询将抓取所有当前在线的用户及其个人资料信息（目前只有他们的名称）：

```graphql
 query {
   online_users {
     last_seen
     user {
       name
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>


## 将参数添加至 GraphQL 查询 {#adding-parameters}

大多数 API 调用通常使用参数等指定你要抓取什么数据。 如果你熟悉如何进行`GET`调用，则你应该使用过查询参数。 例如，如需抓取仅 10 个待办事项，你可能已进行这一 API 调用： `GET /api/todos?limit=10`。

它的 GraphQL 查询模拟是*参数*，可以将其附加到一个“字段”。

### 基本参数： 抓取 10 个待办事项 {#basic-argument}

该 GraphQL 查询将抓取 10 个待办事项，而非全部。

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

这里要检查的最重要的一点是`limit: 10`。GraphQL 服务器将提供一列参数，可用在特定字段旁的`()`中。 在我们的例子中，我们使用 Hasura 创建 GraphQL 后端，它提供筛选、排序和分页参数。 你使用的 GraphQL 服务器或 API 可能提供可以使用的不同参数集。

### 多个字段的多个参数： 为每个用户抓取 1 个用户和 5 个最新待办事项 {#multiple-arguments}

```graphql
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
```

请注意，我们正在将参数传递到不同的字段。 该 GraphQL 查询读作：
> 抓取用户（限值为 1）及其待办事项（按创建时间降序排列，限值为 5）。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## GraphQL 变量： 动态地将参数传递至你的查询 {#graphql-variables}

很好，不过我们还有个问题。 如果想创建一个查询，使用动态提供的参数抓取数据，就必须再次创建整个查询字符串。

这是我们不希望进行的操作：

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

幸运的是，我们永远不必进行这项操作！ GraphQL 变量是可以在查询中发送的额外变量，这样才能动态提供“参数”！

## 抓取待办事项的$限值 {#fetch-limit}

这是 GraphQL 查询的形式：
```graphql
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
```

除了上述查询，我们还发送一个变量对象：

```json
{
   "limit": 10
}
```

现在，我们将从客户端发送查询和变量，而不是仅仅将查询发送至 GraphQL 服务器。 GraphQL 服务器将自动为我们将此变量用在查询中的正确位置！

在 GraphiQL 中尝试此操作：
1. 转到 GraphiQL
2. 写出该查询
3. 滚动至页面底部，这里有个较小的面板“查询变量”
4. 将查询变量添加为 JSON 对象

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 总结 {#summary}

- 现在就可以进行 GraphQL 查询了
- 你知道如何将参数传递至 GraphQL 查询
- 你知道如何通过使用查询变量使你的参数动态化

接下来，我们来看一下写入数据，而不仅仅是抓取数据！
