---
title: "配置 JWT 密钥"
metaTitle: "配置 JWT 密钥 | Hasura 身份验证 Slack 教程"
metaDescription: "教程的这一部分介绍如何选择正确的身份验证模式"
---

这一部分将介绍如何配置 JWT 密钥。

按照[此处](https://github.com/hasura/learn-graphql/tree/master/services/backend/auth-server)的说明，设置身份验证服务器。

### 使用 GraphQL 引擎验证 JWT {#authenticate-jwt}

GraphQL 引擎内置有 JWT 身份验证功能。你需要通过 `HASURA_GRAPHQL_JWT_SECRET` 环境变量，使用与 JWT 身份验证服务器相同的密钥/键来启动引擎 。点击[文档](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#running-with-jwt)，阅读更多

请注意，你还需要配置 `HASURA_GRAPHQL_ADMIN_SECRET` 环境变量。将它视作对项目进行管理员控制的密码。[详细阅读](https://hasura.io/docs/latest/graphql/cloud/projects/env-vars/)如何在 Hasura Cloud 项目中配置新的环境变量。

使用上述令牌的 CURL 命令示例如下：

```bash
curl -X POST \
  https://ready-panda-91.hasura.app/v1/graphql \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QxMjMiLCJpYXQiOjE1NDAzNzY4MTUuODUzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZWRpdG9yIiwidXNlciIsIm1vZCJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9fQ.w9uj0FtesZOFUnwYT2KOWHr6IKWsDRuOC9G2GakBgMI' \
  -H 'Content-Type: application/json' \
  -d '{ "query": "{ users { id } }" }'
```

现在，你可以导航至控制台并在没有管理员密钥的情况下进行查询，从而测试这一点。理想情况下，你应该会收到错误消息。
