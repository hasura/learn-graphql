---
title: "Setup Graphql Code Generator"
metaTitle: "Setup GraphQL Code Generator | Remix Fullstack GraphQL Tutorial"
metaDescription: "Setting up GraphQL Code Generator allows us to make easy GraphQL calls in Remix"
---

import GithubLink from "../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/codegen.yaml" text="codegen.yaml" />

Using [Graphql Code Generator](https://www.graphql-code-generator.com/) and the library [graphql-request](https://github.com/prisma-labs/graphql-request) we setup type safe and easy Graphql calls in Remix.

In the project root, create the file `codegen.yaml`

```yaml
schema:
  - http://localhost:8080/v1/graphql:
      headers:
        x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}
documents: "./app/**/*.graphql"
generates:
  ./app/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-graphql-request
```
