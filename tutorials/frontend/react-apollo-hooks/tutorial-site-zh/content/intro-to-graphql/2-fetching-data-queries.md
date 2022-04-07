---
title: 提取数据 - 查询
metaTitle: "GraphQL 查询以提取数据 | GraphQL React Apollo Hooks 教程"
metaDescription: "使用 GraphiQL 尝试 GraphQL 查询。GraphQL 查询示例：含有形参、实参和变量，用以动态抓取数据"
canonicalUrl: "\nhttps://hasura.io/learn/graphql/intro-graphql/graphql-queries/"
---

## 尝试 GraphQL 查询

在本教程中，我们为你创建了一个 GraphQL API。最常见的浏览 GraphQL API 的方式是使用 GraphiQL。GraphiQL 是一个工具由 Facebook 构建，（发音为“graphical”）便于探索任何 GraphQL API。

当你将 GraphiQL 连接到 GraphQL 端点时，它会查询服务器的 GraphQL 架构，并为您提供一个用户界面，用于浏览和测试查询，这为其惊人的自动完成功能提供支持!

![GraphiQL 演示](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

像 GraphiQL 这样的工具使 GraphQL API 非常容易在您的应用程序中使用和集成，而不需要外部文档工具。

在此处访问 GraphiQL，了解这款实时待办事项应用程序的教程：[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)


当你在一个项目中使用 GraphQL API 时，你奖几乎总是使用类似 GraphiQL 的工具来探索和测试你的 GraphQL 查询。

## 基本的 GraphQL 查询

1. 打开 GraphiQL：[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)。你必须登录，才能获得查询该 API 的身份验证令牌。在现实世界情景中你的 GraphQL API 将得到保护。
2. 您将看到一个 URL 和包含身份验证令牌的标头，它们将与您的 GraphQL 查询一起发送。
3. 现在，将该 GraphQL 查询粘贴在 GraphiQL 窗口中

```graphql
 query {
   users {
     name
   }
 }
```

4. 点按`ctrl + enter`或`cmd + enter` (mac) 或单击 ▶️ 图标，以运行 GraphQL 查询
5. 右侧将显示系统中按名称排列的用户列表！

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

请谨记，这不是魔法！托管的 GraphiQL 应用程序正在发送一个 GraphQL 查询字符串到具有 HTTP 标头的给定端点处的服务器。然后，服务器会发送响应，您会在右手边看到。

## 抓取“图表”

我们的待办事项应用程序包含用户、待办事项和关于当前在线的用户的信息。这是我们的 API“模式”的形式：

![模式](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

如你所见，这是一个“图表”样的模式，其中的 3 个模型均互相链接。

我们尝试进行查询，从整个“图表”中获取不同的数据片段。

### 提取用户及其待办事项

该 GraphQL 查询将提取所有用户及其公开可见的待办事项：

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


### 提取在线用户及其个人资料信息

该 GraphQL 查询将提取所有当前在线用户和他们的个人资料信息（目前只是他们的名字）：

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


## 将参数添加至 GraphQL 查询

在大多数 API 调用中，您通常使用参数。例如，要指定您需要获取哪些数据。如果你熟悉如何进行`GET`调用，那么你应该使用过查询参数。例如，要只提取 10 个待办事项，您可能会这样进行 API 调用：`GET /api/todos?limit=10`。

它的 GraphQL 查询模拟是*参数*，可以将其附加到一个“字段”。

### 基本参数：提取 10 个待办事项

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

这里要检查的最重要的一点是 `limit: 10`。GraphQL 服务器将提供一个参数列表，可以用在特定字段旁边的`()`。在我们的例子中，我们使用 Hasura 创建提供过滤器、排序和分页参数的 GraphQL 后端。你使用的 GraphQL 服务器或 API 可能提供可以使用的不同参数集。

### 多个字段的多个参数：提取 1 个用户和每个用户的 5 个最近的待办事项

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

请注意，我们正在将参数传递到不同的字段。该 GraphQL 查询读作：
> 抓取用户（限值为 1）及其待办事项（按创建时间降序排列，限值为 5）。

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

<a name="query-variables"></a>

## GraphQL 变量：动态地将参数传递给您的查询

很好，不过我们还有个问题。如果我们想要创建使用动态提供的参数提取数据的查询，我们必须再次创建整个查询字符串。

这是我们不希望进行的操作：

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

幸运的是，我们永远不必像这样进行操作！GraphQL 变量是额外的变量，你可以在一个查询中发送，这样就可以动态地提供 "参数"！

## 抓取待办事项的$限值

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

现在，我们不再只是向 GraphQL 服务器发送查询，而是从客户端
同时发送查询和变量。GraphQL 服务器将为我们在查询中的正确位置自动使用变量！

在 GraphiQL 中尝试此操作：
1. 转到 GraphiQL
2. 写出该查询
3. 滚动至页面底部，这里有个较小的面板“查询变量”
4. 将查询变量添加为 JSON 对象

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 总结

- 现在就可以进行 GraphQL 查询了
- 你知道如何将参数传递至 GraphQL 查询
- 你知道如何通过使用查询变量使你的参数动态化

接下来，我们来看一下写入数据，而不仅仅是抓取数据！
