---
title: "Database Schema"
metaTitle: "Setup Database schema| React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "A powerful and concise tutorial that will show you how to build an offline first app with RxDB and Hasura."
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

A user should be able to create, select, update and delete only todos belonging to him. This can be enforced by setting permissions as shown below:

![Permissions](https://i.ibb.co/kH87TV2/Screenshot-from-2020-07-29-16-00-36.png)

