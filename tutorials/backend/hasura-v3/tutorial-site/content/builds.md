---
title: 'Builds'
metaTitle: 'Builds with Hasura | Hasura v3 Tutorial'
metaDescription: "Here, we'll cover what builds are and how to create them in Hasura v3."
---

**Builds** are a new concept in Hasura that allow you to quickly iterate and prototype on your project's metadata. A
build is an immutable, fully-functioning GraphQL API that represents a milestone in your development cycle.

It may be helpful to think of builds as git commits. Since each is deployed on Hasura DDN, it can be shared with other
users.

Each build is completely independent. One project can have multiple builds, out of which, one is applied to production.
This workflow allows for easier rollbacks on production, and greater collaboration during development.
