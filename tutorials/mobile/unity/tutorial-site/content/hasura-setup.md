---
title: "Deploy Hasura"
metaTitle: "Deploy Hasura to Hasura Cloud | GraphQL Unity Hasura Tutorial"
metaDescription: "This tutorial covers how to deploy Hasura GraphQL Engine on Hasura Cloud using one-click deployment and access the Hasura Console"
---

Let's start by deploying Hasura.

## One-click deployment on Hasura Cloud

The fastest way to try out Hasura is via Hasura Cloud. [Hasura Cloud](https://hasura.io/cloud/) gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service!

Click on the following button to create a new project on Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-unity&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**Note**: It is free to signup and no credit-card is required.

Once you register and sign in, you should see the following welcome screen:

![Hasura Cloud Welcome Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Hasura requires a Postgres database to start with. We can make use of Heroku's free Postgres database tier to set this up.

Click on `Try a free database with Heroku` button. After logging in to Heroku, Hasura Cloud will perform the following for you:

- Create an app on Heroku
- Install Postgres Add-on
- Fetch database URL that you can use to configure Hasura

![Hasura Cloud Heroku Configuration](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Once the database URL is fetched, you can click on `Create Project` button to deploy an instance of Hasura. Once the project is created, it might take a few seconds to initialise.

## Hasura Console

Once the project is initialised, we can open the Hasura Console to get started.

![Hasura Cloud Project Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

- Open the Hasura console

    Click on the `Launch Console` button to open the console. 

It should look something like this:

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

Great! You have now deployed Hasura and have the admin console ready to get started!
