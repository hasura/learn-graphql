---
title: "Hasura Backend Setup"
metaTitle: "Hasura Backend Setup | Next.js GraphQL Serverless Tutorial"
metaDescription: "The GraphQL backend will be done with Hasura. In this step we will apply database migrations."
---

The first step in the tutorial is to setup the backend with Hasura and create the necessary data models.

## Setup GraphQL Backend with Hasura

Let's start by deploying Hasura.

### One-click deployment on Hasura Cloud

The fastest way to try out Hasura is via Hasura Cloud. [Hasura Cloud](https://hasura.io/cloud/) gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service!

Click on the following button to create a new project on Hasura Cloud:

<a href="https://cloud.hasura.io" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

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

### Hasura Console

Once the project is initialised, we can open the Hasura Console to get started.

![Hasura Cloud Project Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

- Open the Hasura console

    Click on the `Launch Console` button to open the console. 

It should look something like this:

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

Great! You have now deployed Hasura and have the admin console ready to get started!

## Apply database migrations

Let's get started by creating the tables and relationships for the Realtime todo app.

Download the hasura project with migrations from [here](https://hasura.io/learn/graphql/nextjs-fullstack-serverless/hasura.zip)

Configure the endpoint to point to the Hasura Cloud app URL. Open the `config.yaml` file and set the endpoint value. Note that your Hasura Cloud app URL will be different.

```yaml
endpoint: https://ready-panda-91.hasura.app
```

Now let's apply the migrations.

```bash
hasura migrate apply
```

This will create the tables and relationships for the realtime todo app.

Great! Now navigate to the Hasura Cloud app to see the schema on the Hasura console.


