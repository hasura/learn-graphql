---
title: "Hasura Backend Setup"
metaTitle: "Hasura Backend Setup | ASP.NET MVC GraphQL Tutorial"
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

![Hasura Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console-updated.png)

The next step is to connect the database to Hasura. We can make use of Neon's free Postgres database tier to set this up. Head to the `Data` tab on the Console and click on `Connect Database`.

We have two options to connect a database:

- Connect an existing database
- Create a new database (free)

To quickstart this process, we are going to create a new Postgres DB from scratch using Neon Postgres. Click on `Create New Database (Free)` tab. In this tab, you now have an option to click on the `Connect Neon Database` button. Note that Neon gives you 3 free Posgres database instances.

![Create Neon Database](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-neon-database.png)

After logging in to Neon and clicking on `Create Neon Database`, Hasura Cloud will perform the following for you:

- Create a Postgres database on Neon
- Fetch database URL that you can use to configure Hasura

It will take a few seconds to connect to Neon Postgres and initialise. Once the connection is established, you will be taken to the Data Manager page on the Console, listing the database that we just connected.

![Neon database created](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/neon-database-created.png)

You can also manage the project from the Hasura Cloud Dashboard.

![Hasura Cloud Project Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page-updated.png)

Great! You have now deployed Hasura and have the admin console ready to get started!

## Local project setup

If you haven't already, clone the learn-graphql repo. Execute the following commands in your terminal:

```
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git
cd learn-graphql
git sparse-checkout init --cone
git sparse-checkout add tutorials/frontend/dotnet-mvc/
```

## Apply database migrations

Let's get started by creating the tables and relationships for the Realtime todo app.

Head to the `hasura` directory inside dotnet-mvc to apply the Hasura migrations and metadata.

Download the latest Hasura CLI from [here](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/#install-hasura-cli). We are going to use the config version v3.

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

This will create the tables and relationships for the todo app.

Great! Now navigate to the Hasura Cloud app to see the schema on the Hasura console.
