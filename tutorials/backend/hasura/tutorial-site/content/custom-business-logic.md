---
title: "Custom Business Logic"
metaTitle: "Custom Business Logic | Hasura GraphQL Tutorial"
metaDescription: "Custom business logic can be handled in two ways using Hasura. One is by writing custom GraphQL resolvers and adding it as remote schema and another is to trigger a webhook asynchronously after a mutation."
---

Hasura gives you CRUD + realtime GraphQL APIs with authorization & access control. However, there are cases where you would want to add custom/business logic in your app. For example, in the todo app that we are building, before inserting todos into the public feed we want to validate the text for profanity.

Custom business logic can be handled in a few flexible ways in Hasura:

Actions (Recommended) {#actions}
---------------------

[Actions](https://hasura.io/docs/latest/graphql/core/actions/index/) are a way to extend Hasura’s schema with custom business logic using custom queries and mutations. Actions can be added to Hasura to handle various use cases such as data validation, data enrichment from external sources and any other complex business logic.

![Actions architecture](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/actions-architecture.png)

Actions can be either a Query or a Mutation.

- `Query Action` - If you are querying some data from an external API or doing some validations / transformations before sending back the data, you can use a Query Action.
- `Mutation Action` - If you want to perform data validations or do some custom logic before manipulating the database, you can use a Mutation Action.

Remote Schemas {#remote-schemas}
--------------

Hasura's [Remote Schema](https://hasura.io/docs/latest/remote-schemas/index/) feature provides the ability to merge remote GraphQL schemas and provide a unified GraphQL API. Think of it like automated schema stitching. This way, we can write custom GraphQL resolvers and add it as a remote schema.

![Remote schema architecture](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/remote-schema-architecture.png)

If you are choosing between Actions and Remote Schemas, here's something to keep in mind:

- Use Remote Schemas if you have a GraphQL server or if you're comfortable building one yourself.
- Use Actions if you need to call a REST API

Event Triggers {#event-triggers}
--------------

Hasura can be used to [create event triggers on tables in the Postgres database](https://hasura.io/learn/database/postgresql/triggers/). [Event Triggers](https://hasura.io/docs/latest/event-triggers/index/) reliably capture events on specified tables and invoke webhooks to carry out any custom logic. After a mutation operation, triggers can call a webhook asynchronously.

Use case for the todo app {#use-case-todo-app}
-------------------------

In the todo app backend that you have built, there are certain custom functionalities you may want to add:

If you want to fetch profile information from Auth0, you need to make an API call to Auth0 with the token. Auth0 only exposes a REST API and not GraphQL. This API has to be exposed to the GraphQL client.

We will add an Action in Hasura to extend the API. We will also see how the same thing can be done with a custom GraphQL server added as a Remote Schema.

- Get notified via email whenever a new user registers in your app. This is an asynchronous operation that can be invoked via Event trigger webhook.

We will see how these 2 use-cases can be handled in Hasura.
