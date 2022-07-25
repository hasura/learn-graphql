---
title: "Setup Hasura"
metaTitle: "Setup Hasura | Remix Fullstack GraphQL Tutorial"
metaDescription: "Now we add Hasura to our Remix App folder"
---

import GithubLink from "../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/docker-compose.yml" text="docker-compose.yml" />

Make sure the [Hasura CLI is installed](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)

1. [Download the Hasura Docker compose](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/#step-1-get-the-docker-compose-file) file to the project root

2. Modify the graphql-engine service to point to our own Dockerfile

   ```yml
   graphql-engine:
     build:
       context: ./hasura
       dockerfile: ./Dockerfile
     ports:
       - "8080:8080"
     depends_on:
       - "postgres"
     restart: always
     env_file:
       - ./hasura/.env
   ```

3. Run the command `hasura init hasura --admin-secret <the string you created in .env>`

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/hasura/Dockerfile" text="Dockerfile" />

4. Create `./hasura/Dockerfile` with the [auto applying migrations image](https://hasura.io/docs/latest/graphql/core/migrations/advanced/auto-apply-migrations.html)

   ```dockerfile
   FROM hasura/graphql-engine:v2.2.0.cli-migrations-v3

   COPY ./metadata /hasura-metadata
   COPY ./migrations /hasura-migrations
   ```

5. Create `./hasura/.env`

   ```env
   HASURA_GRAPHQL_METADATA_DATABASE_URL="postgres://postgres:postgrespassword@postgres:5432/postgres"
   PG_DATABASE_URL="postgres://postgres:postgrespassword@postgres:5432/postgres"
   HASURA_GRAPHQL_ENABLE_CONSOLE=false
   HASURA_GRAPHQL_DEV_MODE=true
   HASURA_GRAPHQL_ENABLED_LOG_TYPES="startup, http-log, webhook-log, websocket-log, query-log"
   HASURA_GRAPHQL_ADMIN_SECRET="<Your admin secret you made in .env>"
   HASURA_GRAPHQL_JWT_SECRET=<Hasura JWT secret config>
   HASURA_GRAPHQL_UNAUTHORIZED_ROLE="anonymous"
   ```

6. Startup Hasura `docker compose up -d --build` remember to run `docker compose down` when you want to stop it.

7. Start the Hasura console `hasura console --project hasura --admin-secret <Your admin secret from .env>`

8. Click the data tab and connect database. Name will be `default` and we connect via the environment variable `PG_DATABASE_URL`
