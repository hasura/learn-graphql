---
title: "可观察性"
metaTitle: "可观察性 | Hasura GraphQL 高级教程"
metaDescription: "可观察性意味着您可以通过观察系统外部的指标来回答关于系统内部发生的任何问题"
---

可观察性意味着你可以通过观察系统外部的指标来回答关于系统内部发生的任何问题。

在 GraphQL 应用程序中，这些是要捕获的重要指标和上下文：

- 查询时间和查询执行时间
- 实际查询载荷/查询 hash
- 查询/变更/订阅的响应状态代码
- graphql 服务器版本
- 查询源头的 ip_address

特别是在 Hasura GraphQL 引擎的情况下，您可能希望捕获上下文，例如

- 进行查询的用户的 user_id
- 用户的角色
- 查询的元数据

有了这些信息，您就可以在生产部署中提出有意义的问题，以找出内部出了什么问题，或者为什么您的 Hasura GraphQL API 会有这样的表现。
例如，如果您看到某个查询的执行时间出现异常，就可以尝试找出该查询的问题所在（可能是有一个数据库瓶颈，需要优化）。


## 监控{#monitoring}

Hasura Cloud 内置了监测错误、websocket 连接、订阅的指标，并可深入到单个操作中。

下面是 Cloud 中的错误标签的样子：

![错误](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/error-monitoring.png)

仔细观察，您可以确定哪些请求失败了以及失败的原因。对于 GraphQL，您没有状态代码来唯一地识别错误。因此对响应的`errors`对象的请求需要进行检查。

## 分布式追踪{#distributed-tracing}

Hasura Cloud 的追踪功能可以跨数据库、远程架构、事件触发器、auth webhook 和操作运行。

以下是一个追踪请求的例子。这是一个专门针对数据库的请求。

![检查请求](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/inspect-request.png)

这里检查的是缓存查询。检查一个单独的请求可以得到更详细的指标，如标头、请求的追踪和方便以后进行调试的独特标识符。

同样，对远程架构、操作和事件的任何请求都可以进行追踪。
