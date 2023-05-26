---
title: "部署 Hasura"
metaTitle: "将 Hasura 部署到 Hasura Cloud | Hasura GraphQL 教程"
metaDescription: "该教程介绍如何使用一键部署功能在 Hasura Cloud 上部署 Hasura GraphQL 引擎并访问 Hasura 控制台"
---

我们先部署 Hasura。

## 在 Hasura Cloud 上一键部署 {#one-click-deployment}

测试 Hasura 的最快方式是通过 Hasura Cloud。 [Hasura Cloud](https://hasura.io/cloud/) 提供可扩展、高可用、全球分布、全托
管、安全的 GraphQL API 即服务！

单击以下按钮，在 Hasura Cloud 上创建一个新项目：

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**注**： 注册免费，不需要信用卡。

注册并登录后，应该就会看到以下欢迎界面，而且会自动为你创建一个新的 Hasura 项目：

![Hasura Cloud 欢迎页面](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

在项目初始化后，即可单击弹出屏幕上的`Launch Console`按钮。 如果你之前已有 Hasura Cloud 帐户，则可以单击顶部
的`+ New Project`操作，然后单击`Launch Console`，手动创建一个新项目。

## Hasura 控制台 {#hasura-console}

这会为你的项目打开 Hasura 控制台。 它应该类似于：

![Hasura 控制台](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

下一步是将数据库连接到 Hasura。 我们可以利用 Heroku 的免费 Postgres 数据库层来设置它。 转到控制台上的`Data`选项卡，然后
单击`Connect Database`。

我们提供两个连接数据库的选项：

- 连接现有数据库
- 创建 Heroku 数据库（免费）

为快速开始这个过程，我们将借助 Heroku Postgres 从零开始创建一个新的 Postgres 数据库。 单
击`Create Heroku Database (Free)`选项卡。 在这个选项卡中，你现在可以选择单击`Create Database`按钮。 请注意，在 Heroku 上
创建帐户是免费的。

![创建 Heroku 数据库](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

在登录 Heroku 并单击`Create Database`后，Hasura Cloud 会为你执行以下操作：

- 在 Heroku 上创建一款应用程序
- 安装 Postgres 附加组件
- 获取你用来配置 Hasura 的数据库 URL

![Hasura Cloud Heroku 配置](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

连接到 Heroku Postgres 并进行初始化需要花费几秒钟的时间。 在建立连接后，你将来到控制台上的“数据管理器”页面，其中列有我们
刚刚连接的数据库。

你也可以通过 Hasura Cloud 控制面板管理项目。

![Hasura Cloud 项目页面](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

太好了！ 现在，你已成功部署 Hasura、连接数据库，并准备好开始使用管理控制台！
