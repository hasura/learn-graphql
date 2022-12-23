---
title: "Database Schema"
metaTitle: "Setup Database schema| React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "In this step, we will create the tables, relationships and permissions required for the app"
---

We will be using two tables for our app. You can create these tables from the Hasura console.

## Users

The `users` table will contain two fields

- **auth0_id**: text primary key unique
- **name**: text

## Todos

The `todos` table will contain the following fields

- **id**: text primary key unique
- **userId**: text
- **text**: text
- **isCompleted**: boolean
- **deleted**: boolean; default: false
- **createdAt**: timestamp with timezone, default: now()
- **updatedAt**: timestamp with time zone, default: now()

## Permissions

A user is able to create, select, update and delete only todos that belong to them. This can be enforced by [setting permissions](https://hasura.io/docs/latest/auth/authorization/basics/) as shown below:

![Permissions](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react-rxdb/todos-permission.png)
