---
title: "健康检查"
metaTitle: "健康检查 | Hasura GraphQL 高级教程"
metaDescription: "Hasura 提供健康检查端点，以监测 GraphQL API 的状况。这一服务通过所有 Hasura 项目（包括 OSS GraphQL 引擎）的 `/healthz` 端点提供。"
---

Hasura 提供健康检查端点，以监测 GraphQL API 的状况。这一服务通过所有 Hasura 项目（包括 OSS GraphQL 引擎）的`/healthz`端点提供。

向`/healthz`端点发出`GET`请求以获取状态。

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz
```

用你的项目名称替换（advanced-hasura）。

状态可能是以下之一：

- `200, OK`- 这不需要任何行动。一切都在按预期工作。
- `200, WARN, inconsistent objects in schema`- 这需要审查元数据，因为已经发现了一些不一致的对象。通常发生在有一个元数据应用有错误的对象时。
- `500, ERROR`- 这意味着 API 未能正常运行，需要检查日志。
