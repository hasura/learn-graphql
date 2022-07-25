---
title: "教程和样板设置"
metaTitle: "待办事项应用程序反应样板设置 | GraphQL React Apollo Hooks 教程"
metaDescription: "GraphQL 后端已经准备就绪。任务是在React.js中把静态用户界面转换为一个工作的实时应用程序"
---

在本教程中，GraphQL后端和基本的应用程序用户界面已经准备就绪。我们的任务将是将“静态”用户界面转换为一个工作实时应用程序。

### 克隆并运行样板

1. 克隆[学习-graphql](https://github.com/hasura/learn-graphql)报告。在您的终端执行以下命令：

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/frontend/react-apollo-hooks/app-boilerplate
```

2. 导航至`app-boilerplate`目录。

```bash
cd tutorials/frontend/react-apollo-hooks/app-boilerplate
```

3. 安装依赖项并运行“静态”应用程序
   - `npm install`
   - `npm start`

4. 以用户身份注册/登录以加载待办事项应用程序页面

这就是在完成上述步骤后应该看到的：

![登录后的样板](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

### 加载GraphiQL，玩转您的GraphQL APIs

1. 前往https://hasura.io/learn/graphql/graphiql
2. 登录（这样你就可以用一个有效的用户令牌来测试GraphQL API）

这就是在完成上述步骤后应该看到的：

![登录后的GraphiQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### GraphQL端点

在本教程中，我们将利用`https://hasura.io/learn/graphql`端点来提出我们的GraphQL请求。

现在，如果您想运行自己版本的上述 GraphQL 端点，你可以按照 Hasura 后端教程进行操作

- 部署 Hasura Cloud

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- 设置 Hasura 后端

前往 [Hasura 后端教程](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole)，并开始创建您自己的版本。
