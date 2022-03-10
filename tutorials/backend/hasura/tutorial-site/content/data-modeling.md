---
title: "Data Modeling"
metaTitle: "Data Modeling with Hasura | Hasura GraphQL Tutorial"
metaDescription: "This tutorial covers how to do data modeling in Postgres and create tables using Hasura console"
---

In this part of the course, we will build the data model for a realtime todo app. Our todo app will have the following features:

- Users can maintain personal todos
- Users can view public todos
- Users can view a list of currently online users
- The app will send an email when a user signs up

Broadly this means that we will have two main models in this app: `users` and `todos`, each with its own set of properties.

We will go over them in the subsequent steps.

The final model will look like the following:

![Schema Todo app](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

To implement this model we'll create new tables using the console (or [directly on postgres](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/)), and under the hood the Hasura GraphQL engine will automatically create GraphQL [schema object types](https://graphql.org/learn/schema/) and corresponding [query/mutation fields](https://graphql.org/learn/queries/) with [resolvers](https://hasura.io/learn/graphql/intro-graphql/graphql-server/).
