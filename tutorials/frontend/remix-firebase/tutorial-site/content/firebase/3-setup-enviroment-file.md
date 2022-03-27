---
title: "Setup Remix Environment Variables"
metaTitle: "Setup Remix Environment Variables | Remix Fullstack GraphQL Tutorial"
metaDescription: "Setup our Remix environment variables and load them with dotenv"
---

1. Follow the [Remix enviroment variables guide](https://remix.run/docs/en/v1/guides/envvars#server-environment-variables) with these values

   ```env
   FIREBASE_ADMIN_SERVICE_ACCOUNT='Your firebase service account stringifyed, should be wrapped in a single quote'

   HASURA_ADMIN_SECRET="A randomly generated sequence of letters and numbers"

   COOKIE_SECRET="Another randomly generated sequence of letters and numbers"

   GRAPHQL_ENDPOINT="http://localhost:8080/v1/graphql"

   NODE_ENV="development"
   ```
