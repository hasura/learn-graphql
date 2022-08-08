---
title: "日志级别"
metaTitle: "日志级别 | Hasura GraphQL 高级教程"
metaDescription: "Hasura 服务器为你的 GraphQL API 输出结构化日志，可以将 GraphQL API 配置为从 http-log、websocket-log、webhook-log 输出不同的日志级别"
---

在本教程的前面部分，我们为 hasura/graphql-engine 和 Postgres 运行了一个 docker-compose 设置。可以使用 `docker logs` 命令，后跟 Hasura 容器 id，以访问服务器日志。这会为你的本地实例输出 graphql-engine 日志。如果希望调试 Hasura Cloud 项目，请前往 Hasura 控制台上的 `Pro/Monitoring` 选项卡。

该选项卡将提供 API 使用的不同结构化指标。从错误到 Websocket 连接，可以单独检查每个查询。与开源版本不同，云实例在检查单个请求方面可提供更好的用户体验。

在默认情况下，所有日志类型均在 Hasura Cloud 上启用。如果希望禁用其中任何一种，通过配置 `HASURA_GRAPHQL_ENABLED_LOG_TYPES` 环境变量即可实现。

以下是可配置的日志类型：

- http-log
- websocket-log
- webhook-log

可以配置一个日志级别，以指定信息的明确程度。日志级别层次结构是：`debug > info > warn > error`。可以使用 `HASURA_GRAPHQL_LOG_LEVEL` 进行更新，最高日志级别为 `debug`。这与 `dev` 模式相结合，可以深入了解底层查询/处理程序中出了什么问题。
