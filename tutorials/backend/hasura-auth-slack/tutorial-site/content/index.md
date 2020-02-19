---
title: "Course Introduction"
metaTitle: "Course Introduction | Hasura Auth Slack Tutorial"
metaDescription: "A powerful and concise tutorial that will introduce you to setting up a Slack clone backend in GraphQL with a walkthrough of auth and modelling permissions"
---

This course is a super fast introduction to model and think about Auth with Hasura GraphQL.

In 30 mins, you will setup a powerful, realtime and secure GraphQL Backend for Slack Clone.

## Pre-requisites

- You should have some familiarity with Hasura to quickly dive into the Auth sections that this course focuses on. In case you are new to Hasura, we recommend you go over the [Introduction to Hasura Backend](https://hasura.io/learn/graphql/hasura/introduction/) Course before taking this.

## What will I learn?

This course will help you understand how to think about permissions and access control with Hasura.

- Roles: Define roles based on business requirements
- Access Control: Who can access what part of the database.
- Authorization Mode: Setup authorization so that app users can only run operations on data that they should be allowed to.
- Authentication: Integrate a JWT based auth provider (Node.js/Passport) with Hasura.
- Auth with external services: Add a custom GraphQL resolver and forward headers to handle permissions.
- Allow Lists: Go production ready by allowing only a list of queries you specify.
- Client side implementations: How to setup headers in simple http requests, web sockets for realtime data and custom x-hasura-* headers.

## What will we be building?

We will be building the backend of a basic Slack clone, setting up permissions so that the right data is exposed to the right user. There won't be any frontend app building associated with this tutorial.

## What do I need to take this tutorial?

- Hasura CLI ([Docs](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html))
- Node.js 8+ installed to setup the Auth Server later.

We've kept this course light on developer workflows and
environment choices so that you can focus on the key concepts and
go on to set up your favorite tools and workflows.

## How long will this tutorial take?

Around 45 mins.
