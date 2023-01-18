---
title: "Performance"
metaTitle: "Performance | Hasura GraphQL Advanced Tutorial"
metaDescription: "In this section, we will look at optimizing Hasura for performance. In some scenarios, the bottleneck is at the database level. In some, it is at the infrastructure level."
---

In this section, we will look at optimizing Hasura for performance. The bottleneck can happen either at the database level or the infrastructure level.

We have complete control over what we can optimize if it's at the database level. If it's at the infrastructure level, Hasura Cloud takes care of the infrastructure optimizations required for the app to run smoothly.

We will look into performance optimizations through the following:
- Query Caching and Response Caching
- Scaling Postgres with Read Replicas
- Scaling Hasura
- Postgres Indexes using Explain / Analyze
