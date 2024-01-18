---
title: 'Custom Business Logic'
metaTitle: 'Custom Business Logic | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Everything you need to know to get started with building your supergraph.'
---

A necessary part of any application is the business logic. This is the code that is responsible for the core
functionality of your application. Historically, this code has been written in the backend and has required a
significant amount of effort to build and maintain.

With Hasura, you can write your business logic using TypeScript, access it directly from your GraphQL API, and even
deploy it to Hasura DDN with a single command.

As our hypothetical supergraph is organized around teams, we'll create a series of functions that each team will own and
manage. This means we'll reuse the TypeScript connector to quickly and easily write our business logic.
