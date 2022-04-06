---
title: "Cloud Deployment"
metaTitle: "Cloud Deployment | Remix Fullstack GraphQL Tutorial"
metaDescription: "Deploy your Remix and Hasura app to the cloud"
---

We will start with Hasura Cloud

1. [Navigate to Hasura cloud](https://cloud.hasura.io/projects) and create a new project.

   <a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

2. You should be on the project details page, copy the admin secret and GraphQL API URL and save them for later

3. In the `env vars` tab, we need to add a couple of entries

   - HASURA_GRAPHQL_JWT_SECRET - from your ./hasura/.env file
   - HASURA_GRAPHQL_UNAUTHORIZED_ROLE - anonymous

4. In the data tab, add a Postgres DB either using Heroku or your own DB with the `PG_DATABASE_URL` environment variable

5. Now, we set the Hasura Cloud migrations and metadata using our local setup

   1. On our local machine run `hasura migrate apply --endpoint <Your hasura cloud Graphql URL but remove /v1/graphql> --admin-secret <admin secret from Hasura Cloud> --project hasura --all-databases`

   2. Then run `hasura metadata apply --endpoint <Your hasura cloud Graphql URL but remove /v1/graphql> --admin-secret <admin secret from Hasura Cloud> --project hasura`

Your Hasura cloud instance should now be synced up with what you had locally
