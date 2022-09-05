---
title: "课程简介"
metaTitle: "课程简介 | Hasura 身份验证 Slack 教程"
metaDescription: "这个强大而简洁的教程将向你介绍如何在 GraphQL 中设置 Slack 克隆后端，以及身份验证和建模权限步骤。"
---

本课程将超快速地介绍使用 Hasura GraphQL 进行身份验证的模型和考量。

只需 30 分钟，你就可以为 Slack 克隆设置一个强大而安全的实时 GraphQL 后端。

## 前提条件 {#prerequisites}

- 你应该对 Hasura 有一定的了解，才能快速深入了解本课程的重点，即身份验证部分。如果你刚接触 Hasura，我们建议你先阅读 [Hasura 后端介绍](https://hasura.io/learn/graphql/hasura/introduction/)课程，再学习本课程。

## 我可以学到什么？{#what-will-i-learn}

本课程将帮助你了解如何考虑 Hasura 的权限和访问控制。

- 角色：根据业务要求定义角色
- 访问控制：谁可以访问数据库的哪一部分。
- 授权模式：设置授权，以便应用程序用户仅可对他们应该有权限的数据进行操作。
- 身份验证：将基于 JWT 的身份验证提供方 (Node.js/Passport) 与 Hasura 集成。
- 使用外部服务进行身份验证：添加自定义 GraphQL 解析器和转发标头，以处理权限。
- 允许列表：通过仅允许你指定的查询列表，为生产环境做好准备。
- 客户端实现：如何在简单的 http 请求、网络套接字中设置标头，以用于实时数据和自定义 x-hasura-* 标头。

## 我们要构建什么？{#what-will-we-be-building}

我们将构建一个基本的 Slack 克隆后端，设置权限，以便为正确的用户提供正确的数据。不存在任何与本教程相关的前端应用程序构建。

## 学习该教程需要准备什么？{#what-do-i-need}

- Hasura CLI（[文档](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)）
- 安装 Node.js 8+，以稍后设置身份验证服务器。

我们在本课程中保持开发人员的工作流程和环境选择的简化，以便你能够专注于关键概念，并继续设置自己偏好的工具和工作流程。

## 完成该教程需要多长时间？{#how-long}

大约 30 分钟。
