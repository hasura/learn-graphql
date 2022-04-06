---
title: "迁移和元数据"
metaTitle: "迁移和元数据 | Hasura GraphQL 高级教程"
metaDescription: "这一部分将介绍如何在本地开发环境设置中管理数据库迁移和 Hasura 元数据，并了解数据库模式和元数据配置"
---

这一部分将介绍如何在本地开发环境设置中管理数据库迁移和 Hasura 元数据。

Hasura 需要两个组件，才能创建或者重新创建一个 GraphQL API。

- 数据库模式
- 元数据

数据库模式可以是现有数据库的，也可以是从头开始创建的。元数据将描述 GraphQL API 和 Hasura 的不同组件，如权限、事件、操作和远程模式。

Hasura 不会自动为整个数据库创建 GraphQL API。我们需要具体说明哪些表格/视图/函数需要通过 GraphQL 公开，而且这一信息将成为元数据的一部分。

我们将在该演示中使用 Slack 克隆数据库模式。但在此之前，让我们在本地开发环境中运行 Hasura。

## 通过 docker-compose 运行 Hasura {#running-hasura-via-docker-compose}

本地运行 Hasura 的最简单设置是使用 docker-compose 设置，以运行 graphql-engine 和 postgres docker 容器。

前往文档，[使用 docker-compose 在本地设置 Hasura](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/#step-1-get-the-docker-compose-file)。

在本地设置 Hasura 后，即可在 `http://localhost:8080` 上访问控制台。

![Hasura 控制台 OSS](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-console-oss-local.png)