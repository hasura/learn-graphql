---
title: "GraphQL 核心概念"
metaTitle: "GraphQL 核心概念 | GraphQL 教程"
metaDescription: "了解 GraphQL 的核心概念 - 文档、操作、字段、参数、变量、别名、片段和指示"
---

GraphQL 向来自 REST API 后端的人士介绍一组新概念。 这一部分将从客户端/前端的角度介绍 GraphQL 的核心概念。

## GraphQL 文档 {#graphql-document}
GraphQL 请求字符串的内容叫作 GraphQL 文档。 这是文档的一个示例：

```graphql
{
  author {
    id
    name
  }
}
```

该字符串遵循 GraphQL 服务器或客户端可解析并验证的上述语法。 上述语法使用查询操作的简化符号。

## GraphQL 操作 {#graphql-operation}
GraphQL 操作的类型包括

- 查询（只读抓取）
- 变更（先写入后抓取）
- 订阅（响应源事件抓取数据的持久请求。）

GraphQL 文档可包含一个或多个此类操作（如多个请求/变更/订阅）。

我们来看一个含有操作的 GraphQL 文档示例：

```graphql
query {
  author {
    id
    name
  }
}
```

在这个例子中，文档包含一个查询操作。 GraphQL 操作选择它所需的信息集，其被称为选择集。 在上述示例中，查询操作选择关于`author`及其`id`和`name`的信息。

现在，我们将详细解析该文档。

## GraphQL 文档解析 {#anatomy-of-graphql-document}

现在，我们来看下面的示例：

```graphql
query {
  author(limit: 5) {
    id
    name
  }
}
```

你可能已经发现，这是另一个带有查询操作的 GraphQL 文档。

文档的其余部分由什么组成？ 我们来看一下。

#### 字段 {#fields}

一个 GraphQL 字段描述一条独立信息。 该信息可简单可复杂，含有数据之间的关系。

在上述文档中，操作中包含的全部内容都是字段。 （作者，id 和姓名）。

```
author {
  id
  name
}
```

可能存在含有如下关系的复杂信息：

```graphql
query {
  author(limit: 5) {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

其中除了作者字段，我们还提供文章字段，允许表示字段之间的关系。

#### 参数 {#arguments}

将字段想象成可以返回值的函数。 现在，假设该函数也接受行为不同的参数。

在上述示例中，

```
author(limit: 5)
```

作者字段接受一个参数`limit`，以限制返回的结果的数量。 这些参数是可选的或强制的，且可以出现在本文档中的任何字段。

#### 变量 {#variables}

GraphQL 查询可使用变量参数化，以便在客户端重用和轻松构建查询。

在上述示例中，假设该限制参数可通过用户浏览页面进行配置，那么将变量传递至字段参数就会更容易。

```
query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
```

该变量在操作的顶部定义，且该变量的值可由客户端以服务器理解的格式发送。 通常变量以 JSON 表示，如下所示：

```
{
  limit: 5
}
```

#### 操作名称 {#operation-name}

当文档中含有多个操作时，服务器必须了解执行哪些操作并以相同的顺序将结果映射回来。 例如：

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic
  }
}
query fetchAuthors {
  author(limit: 5, order_by: { name: asc }) {
    id
    name
    profile_pic
  }
}
```

这包含两个操作 - 一个是抓取单个作者，一个是抓取多个作者。

这些是通常应用于简单 GraphQL 请求中的最常见操作。

以下是一些由较为复杂的应用程序使用的其他概念。

#### 别名 {#aliases}

考虑以下示例：

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic_large: profile_pic(size: "large")
    profile_pic_small: profile_pic(size: "small")
  }
}
```

在你抓取关于某个作者的信息时，比如说你有两张大小不同的图像，而且有一个带参数的字段来执行此操作。 在这种情况下，你不能在同一选择集下两次使用相同的字段，因此，`Alias`就有助于区别这两个字段。

#### 片段 {#fragments}

片段可以提高 GraphQL 的重用性。 如果文档中的某些部分在给定的类型上重用相同的字段集，那么片段就大有帮助。

例如：

```graphql
fragment authorFields on author {
  id
  name
  profile_pic
  created_at
}

query fetchAuthor {
  author(id: 1) {
    ...authorFields
  }
}

query fetchAuthors {
  author(limit: 5) {
    ...authorFields
  }
}
```

请注意此处对片段的使用 - `...authorFields`。这种用法叫作片段扩展。 还有内联片段，即没有分别明确声明片段却在查询中内联使用了它。

#### 指示 {#directives}

指示是在不影响响应值的情况下添加附加功能的标识符，但会影响返回到客户端的响应。

标识符`@`后可以跟一列已命名的参数。

GraphQL 规范支持的一些默认服务器指示包括：

- @deprecated(reason: String) - 将字段标为已弃用
- @skip (if: Boolean) - 跳过该字段的 GraphQL 执行
- @include (if: Boolean) - 如果为 true，则为带注解的字段调用解析器。

例如：

```graphql
query ($showFullname: Boolean!) {
  author {
    id
    name
    fullname @include(if: $showFullname)
  }
}
```

在上述查询中，我们仅在条件为 true 时（条件可有自己的逻辑，具体取决于应用程序）包含字段全名。

你也可以使用自定义指示来处理其他用例。

在你的 GraphQL 探险之旅中，你一定会遇到这些核心概念。 现在，你已准备好使用它们了！
