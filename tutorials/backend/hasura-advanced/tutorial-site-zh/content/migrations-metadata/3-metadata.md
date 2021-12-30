---
title: "管理元数据"
metaTitle: "管理元数据 | Hasura GraphQL 高级教程"
metaDescription: "除了管理迁移文件，Hasura 的元数据也需要维护和版本控制。"
---

除了管理迁移文件，Hasura 的元数据也需要维护和版本控制。迁移文件主要是为了执行更新`database schema`的操作而创建的。另一方面，元数据文件在控制台进行任何操作时都会更新，比如跟踪表/视图/函数、创建关系、配置权限、创建事件触发器和远程架构等。元数据可以导出为 JSON/yaml 元数据文件，这些文件可以进行版本控制。

元数据文件可以稍后导入至另一个 Hasura 实例，以获得相同的配置（只要数据库架构存在）。您还可以手动编辑元数据文件以向其中添加更多对象，然后用它来更新实例。

在控制台的数据选项卡中，单击`Track All`来跟踪所有表，然后跟踪它们的关系。

元数据可以通过以下命令导出：

```bash
hasura metadata export
```

这会将元数据导出为 yaml 文件，并更新 `metadata`目录中的正确文件。

```bash
├── actions.graphql
├── actions.yaml
├── allow_list.yaml
├── cron_triggers.yaml
├── databases
│   ├── databases.yaml
│   └── default
│       ├── functions
│       │   └── functions.yaml
│       └── tables
│           ├── public_channel.yaml
│           ├── public_channel_member.yaml
│           ├── public_channel_thread.yaml
│           ├── public_channel_thread_message.yaml
│           ├── public_online_users.yaml
│           ├── public_user_message.yaml
│           ├── public_users.yaml
│           ├── public_workspace.yaml
│           ├── public_workspace_member.yaml
│           ├── public_workspace_user_type.yaml
│           └── tables.yaml
├── inherited_roles.yaml
├── query_collections.yaml
├── remote_schemas.yaml
├── rest_endpoints.yaml
└── version.yaml
```

- `actions.graphql`- 此文件包含为操作定义的 GraphQL 类型。请注意，类型可以在操作之间共享，并且将是单一的事实来源。
- `actions.yaml`- 它包含操作定义，如查询/变更和处理程序配置。
- `allow_list.yaml`- 它包含允许列表的配置，以限制对服务器的查询。
- `cron_triggers.yaml`- 它包含关于所创建的计划触发器的元数据。
- `databases` - 这是一个包含本项目所有连接的数据库的目录。
   - `functions`- 这包含要跟踪的 Postgres 函数。
   - `tables`- 所有需要通过 GraphQL 公开的 postgres 表和视图以及它们的权限信息。
- `inherited_roles.yaml`- 这包含所有继承的角色的定义。
- `query_collections.yaml`- 查询可以在一个集合内进行分组。该文件包含此类群组。
- `remote_schemas.yaml` - 关于所有添加的远程架构的元数据，包括关于 GraphQL 端点和可选标头的信息。
- `rest_endpoints.yaml`- 为一个给定的 GraphQL 查询而创建的所有 RESTified 端点的元数据。
- `version.yaml`- 正在使用的元数据的版本。目前是第 3 版。

在我们的 slack 架构中，我们将所有 postgres 表和基于角色的权限填充到`tables`目录中。随着我们不断改变架构和修改与之相关的元数据，这些文件将自动更新。

## 从控制台导入/导出元数据{#import-export-metadata}

Hasura 控制台设置页面有以`.json`格式快速导入/导出元数据的选项。
