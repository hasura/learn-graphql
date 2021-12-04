---
title: "Hasura Backend Setup"
metaTitle: "Hasura Backend Setup | Next.js GraphQL Serverless Tutorial"
metaDescription: "The GraphQL backend will be done with Hasura. In this step we will apply database migrations."
---

The first step in the tutorial is to setup the backend with Hasura and create the necessary data models.

## Setup GraphQL Backend with Hasura

Let's start by deploying Hasura.

## One-click deployment on Hasura Cloud

The fastest way to try out Hasura is via Hasura Cloud. [Hasura Cloud](https://hasura.io/cloud/) gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service!

Click on the following button to create a new project on Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**Note**: It is free to signup and no credit card is required.

Once you register and sign in, you should see the following welcome screen and a new Hasura project will be created automatically for you:

![Hasura Cloud Welcome Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Once the project is initialised, you can click on `Launch Console` button on the pop up screen. If you already have a Hasura Cloud account before, you can manually create a new project by clicking on the `+ New Project` action at the top, followed by `Launch Console`.

## Hasura Console

This will open up Hasura Console for your project. It should look something like this:

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

The next step is to connect the database to Hasura. We can make use of Heroku's free Postgres database tier to set this up. Head to the `Data` tab on the Console and click on `Connect Database`.

We have two options to connect a database:

- Connect an existing database
- Create Heroku Database (Free)

To quickstart this process, we are going to create a new Postgres DB from scratch using Heroku Postgres. Click on `Create Heroku Database (Free)` tab. In this tab, you now have an option to click on the `Create Database` button. Note that it is free to create an account on Heroku.

![Create Heroku Database](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

After logging in to Heroku and clicking on `Create Database`, Hasura Cloud will perform the following for you:

- Create an app on Heroku
- Install Postgres Add-on
- Fetch database URL that you can use to configure Hasura

![Hasura Cloud Heroku Configuration](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

It will take a few seconds to connect to Heroku Postgres and initialise. Once the connection is established, you will be taken to the Data Manager page on the Console, listing the database that we just connected.

You can also manage the project from the Hasura Cloud Dashboard.

![Hasura Cloud Project Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

Great! You have now deployed Hasura and have the admin console ready to get started!

## Local project setup

If you haven't already, clone the learn-graphql repo. Execute the following commands in your terminal:

```
git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git
cd learn-graphql
git sparse-checkout init --cone
git sparse-checkout add tutorials/frontend/nextjs
```

## Apply database migrations

Let's get started by creating the tables and relationships for the Realtime todo app.

Head to the `hasura` directory inside nextjs to apply the Hasura migrations and metadata.

Download the latest Hasura CLI from [here](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli). We are going to use the config version v3.

Configure the endpoint to point to the Hasura Cloud app URL. Open the `config.yaml` file and set the endpoint value.

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

Open the `metadata/databases/databases.yaml` file and set your Custom Env Vars PG_DATABASE_URL value.

```yaml
      database_url:
        from_env: PG_DATABASE_URL
...
```

**Note:** Your Hasura Cloud app URL will be different.

Now let's apply the metadata and migrations.

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --database-name default --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

This will create the tables and relationships for the realtime todo app.

Great! Now navigate to the Hasura Cloud app to see the schema on the Hasura console.
