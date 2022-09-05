---
title: "应用迁移"
metaTitle: "应用迁移 | Hasura 身份验证 Slack 教程"
metaDescription: "Hasura 迁移适用于创建表和关系"
---

我们先为 Slack 应用程序创建表和关系。

## 下载带有迁移的 Hasura 项目 {#download}

1. 克隆 [learn-graphql](https://github.com/hasura/learn-graphql) 代码库。在终端执行以下命令：

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/backend/hasura-auth-slack/slack-backend
```

2. 导航至 `slack-backend` 目录。

```bash
cd tutorials/backend/hasura-auth-slack/slack-backend
```

配置端点，以指向 Hasura Cloud 应用程序 URL。打开 `config.yaml` 文件，并设置端点值。

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**注：**你的端点因 Hasura 项目不同而有所不同。

现在，我们来应用迁移。

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

这将为 Slack 应用程序创建表和关系。

太棒了！现在导航至 Hasura 控制台，以查看包含关系的表。
