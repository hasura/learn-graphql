---
title: "Custom Business Logic"
metaTitle: "Custom Business Logic | Hasura Backend Tutorial"
metaDescription: "Hasura lets us use custom backend servers for business logic"
---

The Hasura GraphQL engine instantly generates a real-time GraphQL CRUD API on your data. For some use-cases, we may need to call a custom backend server.

## Hasura Actions {#hasura-actions}

Actions are a way to extend Hasura's schema with custom business logic using custom queries and mutations. Actions can be added to Hasura to handle various use cases such as data validation, data enrichment from external sources, and any other complex business logic.

![Hasura Actions](https://graphql-engine-cdn.hasura.io/console/assets/common/img/actions.png)

## Event Triggers {#event-triggers}

Hasura can be used to create event triggers on tables in the database. Event triggers reliably capture events on specified tables and invoke HTTP webhooks to carry out any custom logic.

## Remote Schema {#remote-schema}

Hasura has the ability to merge remote GraphQL schemas and provide a unified GraphQL API. Think of it like automated schema stitching. All you need to do is build your own GraphQL service and then provide the HTTP endpoint to Hasura. Your GraphQL service can be written in any language or framework.

![Remote Schema](https://hasura.io/docs/assets/images/remote-schema-arch-5bb135f3789ab646431fd2f60e85a59a.png)

## Query GraphQL {#query-graphql}

Different languages have different ways to query GraphQL. We will cover libraries or code generators for each language to make it easy.
