---
title: "Deploy Hasura"
metaTitle: "Deploy Hasura to Hasura Cloud | Hasura GraphQL Tutorial"
metaDescription: "This tutorial covers how to deploy Hasura GraphQL Engine on Hasura Cloud using one-click deployment and access the Hasura Console"
---

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

Great! You have now deployed Hasura, connected a database and have the admin console ready to get started!
