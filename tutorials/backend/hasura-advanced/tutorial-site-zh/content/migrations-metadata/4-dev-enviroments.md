---
title: "开发环境"
metaTitle: "开发环境 | Hasura GraphQL 高级教程"
metaDescription: "使用迁移和元数据，Hasura 可以在不同的环境中使用，从本地开发、暂存和生产开始。"
---

## 本地开发{#local-development}

使用 docker-compose 在你的机器上本地运行的 Hasura 实例是开发环境设置。Hasura CLI 可用来为控制台提供自动管理迁移和元数据
的服务。

## 暂存环境{#staging-environment}

现在让我们创建一个暂存环境，并尝试复制我们在本地开发设置中的架构和元数据。

我们将利用 Hasura Cloud 作为暂存环境。[Hasura Cloud](https://hasura.io/cloud/) 提供可扩展、高可用、全球分布、全托管、安
全的 GraphQL API 即服务！

单击以下按钮，在 Hasura Cloud 上创建一个新项目：

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

注册并登录后，应该就会看到以下欢迎界面，而且会自动为你创建一个新的 Hasura 项目：

![Hasura Cloud 欢迎页面](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

项目初始化后，您可以单击弹出屏幕上的`Launch Console`按钮。如果你之前已有 Hasura Cloud 帐户，则可以单击顶部
的`+ New Project`操作，然后单击`Launch Console`，手动创建一个新项目。

## Hasura 控制台{#hasura-console}

这会为你的项目打开 Hasura 控制台。它应该类似于：

![Hasura 控制台](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

下一步是将数据库连接到 Hasura。我们可以利用 Heroku 的免费 Postgres 数据库层来进行设置。转到控制台上的`Data`选项卡，然后
单击`Connect Database`。

我们提供两个连接数据库的选项：

- 连接现有数据库
- 创建 Heroku 数据库（免费）

为快速启动这一过程，我们将借助 Heroku Postgres 从头开始创建一个新的 Postgres 数据库。点
击`Create Heroku Database (Free)`选项卡。在这个选项卡中，你现在可以选择单击`Create Database`按钮。请注意，在 Heroku 上创
建帐户是免费的。

![创建 Heroku 数据库](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

在登录 Heroku 并单击`Create Database`后，Hasura Cloud 会为你执行以下操作：

- 在 Heroku 上创建一款应用程序
- 安装 Postgres 附加组件
- 获取你用来配置 Hasura 的数据库 URL

![Hasura Cloud Heroku 配置](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

连接到 Heroku Postgres 并进行初始化需要几秒钟的时间。在建立连接后，你将来到控制台上的“数据管理器”页面，其中列有我们刚刚
连接的数据库。

现在复制看起来像`https://myproject.hasura.app`的项目 URL。（用你的 Hasura 项目名称替换`myproject`）。

返回终端，进入 Hasura 项目目录。执行以下命令：

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

现在请尝试在云项目上刷新 Hasura 控制台，查看数据库架构是否已经反映出来。从本质上讲，我们已经将架构和元数据复制到一个新的
Hasura 实例和新的 Postgres 数据库中。

随着我们不断在本地更改架构，我们可以继续使用上述两个命令来将同样的更改应用于暂存环境。

**注**：您也可以在 Hasura Cloud 上创建一个项目进行开发。所有在开发和暂存环境之间同步所需的步骤将保持不变。通常情况下
，webhook URL 处理程序需要在 Hasura Cloud 可以访问的公共端点上公开，因此它们不能是 `localhost`URL。我们建议使用类
似`ngrok`的方法，通过可公开访问的端点来公开运行操作/远程架构/事件的本地服务器。

## 压缩迁移{#squashing-migrations}

随着我们不断更改数据库，迁移目录会因开发迭代过程中创建的文件过多而变得繁杂。当某项功能稳定以后，您可能希望将与其相关的所
有迁移文件合并压缩到一个文件中。这可以使用 Hasura CLI 的 squash 命令来实现。执行以下命令：

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

并适当替换 `--from` 的值。
