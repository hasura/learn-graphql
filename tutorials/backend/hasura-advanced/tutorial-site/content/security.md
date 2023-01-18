---
title: "Security"
metaTitle: "Security | Hasura GraphQL Advanced Tutorial"
metaDescription: "In this section, we will look at optimizing Hasura for security. Some settings might be more open by default, so they need explicit configuration to secure data access."
---

GraphQL fundamentally differs from REST APIs in the way it works - API is served over a single endpoint. That means URL-based filtering doesn't work for GraphQL APIs. Moreover, REST APIs rely on request methods like GET, POST, PUT and DELETE, whereas GraphQL uses POST (or WebSockets for real-time). Attackers can crawl the GraphQL endpoint (typically served at /graphql) and exploit interface consoles like GraphiQL if not protected behind auth.

In this section, we will look at optimizing Hasura for security. Some settings might be more "open" by default, so they need explicit configuration to secure data access.

You will learn about the following features:
- Service level security
- Authentication and Authorization
- Allow Lists
- Rate Limiting
- Response Limiting

And optimize for each of the use cases.
