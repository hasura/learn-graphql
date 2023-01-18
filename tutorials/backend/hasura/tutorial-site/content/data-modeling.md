---
title: "Data Modeling"
metaTitle: "Data Modeling with Hasura | Hasura GraphQL Tutorial"
metaDescription: "This tutorial covers how to do data modeling in Postgres and create tables using Hasura console"
---

In this part of the course, we will build the [data model](https://hasura.io/docs/latest/schema/common-patterns/data-modeling/index/) for a realtime todo app. Our todo app will have the following features:

- Users can maintain personal todos
- Users can view public todos
- A list of currently online users using the app
- Send email when a user signs up

Broadly this means that we have two main models in this app: `users` and `todos`, each with its own set of properties.

We will go over them in the subsequent steps.

The final model looks like the following:

![Schema Todo app](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

As we [create tables using the console or directly on postgres](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/), Hasura GraphQL engine automatically creates GraphQL schema object types and corresponding query/mutation fields with resolvers.
