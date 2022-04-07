---
title: "自定义业务逻辑"
metaTitle: "自定义业务逻辑 | Hasura GraphQL 教程"
metaDescription: "可借助 Hasura 以两种方式处理自定义业务逻辑。 一种方式是通过编写自定义 GraphQL 解析器并将其添加为远程模式，另一种是在变更后异步触发 webhook。"
---

Hasura 通过授权和访问控制向你提供 CRUD + 实时 GraphQL API。 但是，在有些情况下，你希望在应用程序中添加自定义/业务逻辑。 例如，在我们正在创建的待办事项应用程序中，在将待办事项插入到公共信息源中之前，我们希望验证文本是否包含不文明用语。

可以在 Hasura 中以几种灵活的方式处理自定义业务逻辑：

操作（推荐）{#actions}
---------

[操作](https://hasura.io/docs/latest/graphql/core/actions/index/)是使用自定义查询和变更通过自定义业务逻辑扩展 Hasura 的模式的一种方式。 将“操作”添加至 Hasura，可处理各种用例，如数据验证、来自外部源的数据扩充以及任何其他复杂的业务逻辑。

![操作架构](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/actions-architecture.png)

“操作”可以是“查询”或“变更”。

- `Query Action`- 如果你正在通过外部 API 查询某些数据或进行某些验证/变换，然后再发送回数据，则可以使用“查询操作”。
- `Mutation Action`- 如果你希望执行数据验证或某些自定义逻辑，然后再操作数据库，则可以使用“变更操作”。

远程模式 {#remote-schemas}
-------

Hasura 能够合并远程 GraphQL 模式并提供统一的 GraphQL API。 把它当作自动模式拼接。 这样一来，我们就可以编写自定义 GraphQL 解析器，并将其添加为远程模式。

![远程模式架构](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/remote-schema-architecture.png)

如果你正在“操作”和“远程模式”之间进行选择，则请注意以下两点：

- 如果你有 GraphQL 服务器或愿意自行创建一个服务器，则选择“远程模式”。
- 如果你需要调用一个 REST API，则选择“操作”

事件触发器 {#event-triggers}
--------

可以借助 Hasura 在 Postgres 数据库中的表上创建事件触发器。 事件触发器可靠地捕获指定表上的事件并触发 webhook，以执行任何自定义逻辑。 在变更操作后，触发器可异步调用网钩。

待办事项应用程序用例 {#use-case-todo-app}
-----------------

在你已创建的待办事项应用程序后端，你可能希望添加某些自定义功能：

如果你希望通过 Auth0 获取配置文件信息，则需要使用令牌对 Auth0 进行 API 调用。 Auth0 仅公开一个 REST API，而非 GraphQL。 必须向 GraphQL 客户端公开此 API。

我们将在 Hasura 中添加一个“操作”，以扩展该 API。 此外，我们还将介绍如何借助作为“远程模式”添加的自定义 GraphQL 服务器来实现同样的目的。

- 每当有新用户在你的应用程序中注册，你都会收到电子邮件通知。 这是一个异步操作，可通过“事件触发器 webhook”触发。

我们将介绍如何在 Hasura 中管理这两个用例。
