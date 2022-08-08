---
title: "Security"
metaTitle: "Security | Hasura GraphQL Advanced Tutorial"
metaDescription: "In this section, we will look at optimizing Hasura for security. By default, some settings might be more open and hence needs explicit configuration to secure data access."
---

GraphQL is fundamentally different from REST APIs in the way it is served - API is served over a single endpoint. This means that URL based filtering cannot be applied to GraphQL APIs. Morever REST APIs rely on request methods like GET, POST, PUT and DELETE where as GraphQL is typically served over POST (or websockets for realtime). Attackers can crawl GraphQL endpoint (typically served at /graphql) and exploit interface consoles like GraphiQL if not protected behind auth.

In this section, we will look at optimizing Hasura for security. By default, some settings might be more "open" and hence needs explicit configuration to secure data access.

We will look at the following

- Service level security
- Authentication and Authorization
- Allow Lists
- Rate Limiting
- Response Limiting

and optimize for each of the use cases.
