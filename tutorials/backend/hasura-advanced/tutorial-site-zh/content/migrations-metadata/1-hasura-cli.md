---
title: "Hasura CLI"
metaTitle: "Hasura CLI | Hasura GraphQL 高级教程"
metaDescription: "我们将利用 Hasura CLI 在本地管理项目。从空文件夹开始，执行以下命令"
---

## 安装 Hasura CLI {#install-hasura-cli}

根据平台的不同，按照文档中的步骤[安装 Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)。

我们将利用 Hasura CLI 在本地管理项目。从空文件夹开始，执行以下命令：

```bash
hasura init
```

这将在给定的目录下（默认为 `hasura`）在本地创建新的项目结构。目录结构的示例如下：

```
├── config.yaml
├── metadata
│   ├── actions.graphql
│   ├── actions.yaml
│   ├── allow_list.yaml
│   ├── cron_triggers.yaml
│   ├── databases
│   │   └── databases.yaml
│   ├── query_collections.yaml
│   ├── remote_schemas.yaml
│   └── version.yaml
├── migrations
└── seeds
```

`migrations` 和 `seeds` 目录最初为空。`metadata` 目录含有大量的 yaml 文件，每个文件描述 GraphQL API 的不同部分，如操作、远程模式和连接到该项目的不同数据库及其表格和函数等。

由于你通过 docker-compose 在本地运行 Hasura，请运行以下命令

```bash
hasura console
```

这会在 `http://localhost:9695` 上打开控制台，且与你在 `http://localhost:8080` 处的服务器控制台上看到的 GUI 相同
