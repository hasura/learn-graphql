---
title: 变更 - 写入数据
metaTitle: "通过 GraphQL 变更插入数据 | GraphQL 教程"
metaDescription: "使用 GraphiQL 尝试 GraphQL 变更。 GraphQL 变更示例：含有动态参数和变量，用以插入数据"
---

import {Link} from "gatsby";

这些是在攻克变更（哈哈）前应该了解的概念：
- <Link to="/graphql-queries/#graphiql">使用 GraphiQL</Link>
- <Link to="/graphql-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">使用查询变量</Link>

现在开始了解如何使用 GraphQL“写入”数据。 GraphQL 变更是 GraphQL 查询的类型，可能导致后端“变更”或变化的状态，比如常见的`'POST'`、
`'PUT'`、`'PATCH'`、`'DELETE'`API。

## 基本变更 {#basic-mutations}
由于我们将 Hasura 用于 GraphQL API，因此我们可以在应用程序中进行插入、更新或删除等变更。

我们在待办事项应用程序上下文中尝试这些变更，以了解变更的运作方式。 你从另一个 GraphQL 服务中获得的变更，比如你的 API 团队已自行创建，则会有所不同。

### 创建待办事项 {#create-a-todo}

现在，发送 API 调用，以创建待办事项。 如你所料，这是我们的待办事项应用程序的关键一环。 😉

> **专业提示**： 比方说，我们现在还不知道创建待办事项的
> 变更的名称。 GraphiQL 来帮你！
> 转到 GraphiQL，然后点击右侧的“文档”选项卡。
> 在这里输入“待办事项”，即可看到一个使用待办事项的 GraphQL 查询和类型
> 列表。 通读它们的说明，很快你就会
> 发现`insert_todos`就是你需要的操作。

创建待办事项的变更的标题为`insert_todos`。

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 变更后返回数据 {#returning-data-after-the-mutation}
请注意，待插入的待办事项的数据作为参数发送至`insert_todos`变更。 但是，变更的“字段”指定了你希望从服务器获得的_响应_的形状。

假设我们希望在将待办事项作为响应创建后获得整个待办事项对象：

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

## 将你插入的内容参数化 {#parameterise-what-you-insert}

对于变更，我们几乎始终必须对参数进行参数化！ 我们的应用程序中很少（如有）出现“硬编码”突变。 这是因为要捕获什么数据、如何修改或删除某些内容的参数通常取决于用户的操作。

既然我们已了解如何使用查询变量进行参数化，那么我们应用一下：

```graphql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

```javascript
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

在这里，`todos_insert_input`是变量`$todo`的类型，且`!`用来表示这是个强制输入。

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">在 GraphiQL 中尝试</a></b>

稍后，我们将探索更多更新或删除数据的变更。 这是深入了解变更的良好开端！

## 总结 {#summary}

- 你可以进行基本的 GraphQL 变更
- 你可以使用查询变量将动态参数/数据传递至变更

接下来，我们来了解 GraphQL 订阅
