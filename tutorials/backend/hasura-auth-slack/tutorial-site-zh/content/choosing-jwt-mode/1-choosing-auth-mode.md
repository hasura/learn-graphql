---
title: "选择正确的模式"
metaTitle: "选择正确的模式 | Hasura 身份验证 Slack 教程"
metaDescription: "教程的这一部分介绍如何选择正确的身份验证模式"
---

这一部分将介绍哪种模式适合 Slack 克隆。

### 使用 JWT 模式 {#using-jwt-mode}

如果你的身份验证服务器支持 Hasura，则 JWT 模式是 Hasura 的推荐解决方案。

我们的 Slack 应用程序克隆不需要与传统的身份验证系统集成，也不需要复杂的自定义规则，这些规则仅可通过 webhook 处理。可以配置身份验证服务器，以将正确的 Hasura 声明插入它生成的每个令牌，从而确保可以应用权限规则。

Slack 应用程序含有需要向其分配角色的用户。JWT 模式是推荐的模式，因为它集成简单，并且为客户端提供了诸多优势。

### 何时使用 webhook 模式？{#webhook-mode}

如果你使用的身份验证服务器无法以 Hasura 期望的格式发布 JWT 令牌，或根本没有与 JWT 集成，则通常需要 webhook 模式。这是现有的传统身份验证系统中更为常见的用例。请注意，使用 webhook 模式时，必须部署、维护 webhook，并且每次向 Hasura 发出请求时，它都会转而向 webhook 发出请求以授权该请求。这可能会有轻微的延迟，具体取决于 webhook 的部署位置。
