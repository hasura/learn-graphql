---
title: "服务级安全"
metaTitle: "服务级安全 | Hasura GraphQL 高级教程"
metaDescription: "Hasura 支持在服务级别确定访问权限。可以进行多种配置，以确保在多个层面安全访问数据。现在，我们来查看各个配置。"
---

Hasura 支持在服务级别确定访问权限。可以进行多种配置，以确保在多个层面安全访问数据。现在，我们来查看各个配置。

## 配置 API 密码 {#configure-api-secret}

你最初可能已配置一个 `admin secret`，以保证 GraphQL API 的安全。后续将由基于角色的数据访问权限系统跟进。但如果你通过 `Actions`、 `Remote Schemas`和 `Events` 使用自定义代码，则你需要一种方法将该自定义代码限制为仅由 Hasura 调用，而不能从其他任何地方调用。

这需要 Hasura 服务器和自定义代码服务器之间的信任。这一信任是通过共享的 API 密码建立的。

在创建操作/远程模式/事件时，你可以添加类似下面的自定义标头：

![通过标头共享的密码](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/shared-secret.png)

## 设置 CORS 策略 {#set-cors-policies}

在默认情况下，Hasura 允许所有 CORS 请求。在生产情况下，你可能希望仅限少数选定网域进行查询。

例如，如果你的应用程序托管在某个网域中，如 https://example.com，即可通过启用配置 HASURA_GRAPHQL_CORS_DOMAIN="http://*.example.com"，允许来自该网域及其任何子网域的请求。

![Cors 网域](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cors-domain.png)

当然，该限制仅适用于客户端（浏览器）。由于 API 在任何情况下都可以公开访问，这些策略仅用于限制浏览器发出的请求。比如，这仍然不能阻止任何人从服务器端或移动应用程序发出请求，况且无论如何不应该将其用作此类情况的限制手段。

## SSL 和 HTTPS {#ssl-https}

Hasura Cloud 项目为所有应用程序提供免费的 SSL，包括自定义网域，因此可以通过 `https` 普通查询和 `wss` 实时订阅查询访问 API。

请注意，`wss` 可用于发出所有请求。（不仅仅是订阅，也包括查询和变更操作）。

## 管理团队成员及其访问权限 {#manage-team-access}

在 Hasura Cloud 中，你可以将控制台访问权限分享给访问权限受限的不同团队成员。在项目设置页面添加协作者，即可实现这一点，如下所示：

![团队控制台](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/collaborator.png)

Hasura Cloud 项目有两个级别的访问权限：

- `admin` 可以不受任何限制地执行 API 调用、查看指标和配置规则。
- 根据是否提供了执行 GraphQL 和查看指标的权限，`user` 的访问权限受到限制。
