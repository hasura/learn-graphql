---
title: "Performance"
metaTitle: "Performance | Hasura GraphQL Advanced Tutorial"
metaDescription: "In this section, we will look at optimizing Hasura for performance. In some scenarios, the bottleneck is at the database level. In some, it is at the infrastructure level."
---

In this section, we will look at optimizing Hasura for performance. In some scenarios, the bottleneck is at the database level. In some, it is at the infrastructure level.

If it's at the database level, we have full control over what we can optimize while Hasura Cloud takes care of infrastructure optimizations required for the app to run smoothly.

We will look into performance optimizations through

- Query Caching and Response Caching
- Scaling Postgres with Read Replicas
- Scaling Hasura
- Postgres Indexes using Explain / Analyze
