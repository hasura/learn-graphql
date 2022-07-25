---
title: "Configuring JWT Secret"
metaTitle: "Configuring JWT Secret | Hasura Auth Slack Tutorial"
metaDescription: "This part of the tutorial covers how to choose the right auth mode"
---

In this part, we will look at how to configure the JWT secret.

Follow the instructions [here](https://github.com/hasura/learn-graphql/tree/master/services/backend/auth-server) to setup the Auth server.

### Authenticate JWT using GraphQL Engine {#authenticate-jwt}

The GraphQL engine comes with built in JWT authentication.  You will need to start the engine with the same secret/key as the JWT auth server using the environment variable `HASURA_GRAPHQL_JWT_SECRET`. Read more in [docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#running-with-jwt)

Note that you also need to configure `HASURA_GRAPHQL_ADMIN_SECRET` environment variable. Consider this like the password to have admin control over the project. [Read more](https://hasura.io/docs/latest/graphql/cloud/projects/env-vars/) on how to configure a new environment variable in a Hasura Cloud project.

A sample CURL command using the above token would be:

```bash
curl -X POST \
  https://ready-panda-91.hasura.app/v1/graphql \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QxMjMiLCJpYXQiOjE1NDAzNzY4MTUuODUzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZWRpdG9yIiwidXNlciIsIm1vZCJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9fQ.w9uj0FtesZOFUnwYT2KOWHr6IKWsDRuOC9G2GakBgMI' \
  -H 'Content-Type: application/json' \
  -d '{ "query": "{ users { id } }" }'
```

Now you can test this out by navigating to console and making queries without the admin secret. You should ideally get an error.
