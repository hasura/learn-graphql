---
title: "Custom Business Logic"
metaTitle: "Custom Business Logic | GraphQL Backend Stack Tutorial"
metaDescription: "Custom business logic in traditional backend apps and Hasura"
---

You may have to implement custom business logic, such as sending an email, while building your application.

You could make a GraphQL or REST endpoint in a traditional backend application. With Hasura there are a few ways to implement these features like [Hasura Actions](#hasura-actions), [event triggers](#event-triggers), and [remote schemas](#remote-schema). We will also cover querying a GraphQL endpoint.

## Hasura Actions

Actions are a way to extend Hasura's schema with custom business logic using custom queries and mutations. Actions can be added to Hasura to handle various use cases such as data validation, data enrichment from external sources, and any other complex business logic.

![Hasura Actions](https://graphql-engine-cdn.hasura.io/console/assets/common/img/actions.png)

## Event Triggers

Hasura can be used to create event triggers on tables in the database. Event triggers reliably capture events on specified tables and invoke HTTP webhooks to carry out any custom logic.

## Remote Schema

Hasura can merge remote GraphQL schemas and provide a unified GraphQL API. Think of it like automated schema stitching. All you need to do is build your GraphQL service and provide the HTTP endpoint to Hasura. Your GraphQL service can be written in any language or framework.

![Remote Schema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/remote-schema-architecture.png)
