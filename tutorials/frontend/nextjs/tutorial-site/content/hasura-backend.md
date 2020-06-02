---
title: "Hasura Backend Setup"
metaTitle: "Hasura Backend Setup | Next.js GraphQL Serverless Tutorial"
metaDescription: "The GraphQL backend will be done with Hasura. In this step we will apply database migrations."
---

The first step in the tutorial is to setup the backend with Hasura and create the necessary data models.

## Setup GraphQL Backend with Hasura

Let's start by deploying Hasura.

#### One-click deployment on Heroku

The fastest way to try Hasura out is via Heroku.

- Click on the following button to deploy GraphQL Engine on Heroku with the free Postgres add-on:

    [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

    This will deploy Hasura GraphQL Engine on Heroku. A PostgreSQL database will be automatically provisioned along with Hasura. If you don’t have an account on Heroku, you would be required to sign up. 
    *Note*: It is free to signup and no credit-card is required.

![Deploy on Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/deploy-on-heroku.png)

Type in the app name, select the region of choice and click on Deploy app button.

## Hasura Console

Once the app is deployed, you should see the following on your Heroku dashboard.

![Hasura GraphQL on Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/app-deployed-heroku.png)

- Open the Hasura console

    Click on the `View` button to open the app. 
    Alternatively you can always visit `https://<app-name>.herokuapp.com` (*replace &lt;app-name> with your app name*) to open the admin console.

It should look something like this:

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console-initial-load.png)

Great! You have now deployed Hasura GraphQL Engine and have the admin console ready to get started!

## Apply database migrations

Let's get started by creating the tables and relationships for the Realtime todo app.

Download the hasura project with migrations from [here](https://hasura.io/learn/graphql/nextjs-fullstack-serverless/hasura.zip)

Configure the endpoint to point to the heroku app URL. Open the `config.yaml` file and set the endpoint value. Note that your Heroku app URL will be different.

```yaml
endpoint: https://nextjs-tutorial.herokuapp.com
```

Now let's apply the migrations.

```bash
hasura migrate apply
```

This will create the tables and relationships for the realtime todo app.

Great! Now navigate to the heroku app to see the it on the Hasura console.


