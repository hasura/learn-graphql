---
title: "Builds"
metaTitle: "Builds with Hasura | Hasura v3 Tutorial"
metaDescription: "Here, we'll cover what builds are and how to create them in Hasura v3."
---

[**Builds**](https://hasura.io/docs/3.0/ci-cd/builds/) are a new concept in Hasura that allow you to quickly iterate and
prototype on your project's metadata. A build is an immutable, fully-functioning GraphQL API that represents a milestone
in your development cycle.

It may be helpful to think of builds as git commits. Since each is deployed on Hasura DDN, it can be shared with other
users. Each build is completely independent. One project can have multiple builds, out of which, one is applied to
production.

A typical workflow will see you create a build, test it, and then apply it to production. If you need to make changes,
you can create a new build and apply that to production instead. This workflow allows for easier rollbacks on
production, and greater collaboration during development.

Additionally, for ease in development, the `ddn dev` command will watch your project directory for changes and
automatically create a new build when it detects a change. This allows you to quickly iterate on your project's metadata
and shorten feedback loops.
