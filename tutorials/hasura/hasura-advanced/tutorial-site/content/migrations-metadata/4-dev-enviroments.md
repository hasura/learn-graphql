---
title: "Dev Environments"
metaTitle: "Dev Environments | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura can be used in different environments starting from local development, staging and production with the use of migrations and metadata."
---

## Local Development {#local-development}

The Hasura instance that is running locally on your machine with docker-compose is the dev environment setup. The Hasura CLI can be used to serve the console for automatic management of migrations and metadata.

## Staging Environment {#staging-environment}

Now let's create a staging environment and try to replicate the schema and metadata that we have in our local dev setup.

We are going to make use of Hasura Cloud for the staging environment. [Hasura Cloud](https://hasura.io/cloud/) gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service!

Click on the following button to create a new project on Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

Once you register and sign in, you should see the following welcome screen and a new Hasura project will be created automatically for you:

![Hasura Cloud Welcome Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Once the project is initialised, you can click on `Launch Console` button on the pop up screen. If you already have a Hasura Cloud account before, you can manually create a new project by clicking on the `+ New Project` action at the top, followed by `Launch Console`.

## Hasura Console {#hasura-console}

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

Now copy the project URL that looks like `https://myproject.hasura.app`. (replace `myproject` with your hasura project name).

Head back to the terminal, on to the Hasura project directory. Execute the following command:

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

Now, try refreshing the Hasura Console on the Cloud project and see if the database schema is reflecting there. Essentially we have replicated the schema and metadata on to a new Hasura instance and new Postgres database.

As we keep changing the schema locally, we can keep applying the above two commands to apply the same changes to the staging environment.

**Note**: You can also create a project on Hasura Cloud for development. All the steps required to sync between dev and staging would remain the same. Typically, the webhook URL handlers need to be exposed to a public endpoint that Hasura Cloud can access and hence they cannot be `localhost` urls. We recommend using something like `ngrok` to expose a local server running for Actions/Remote Schemas/Events to a publicly accessible endpoint.

## Squashing Migrations {#squashing-migrations}

As we keep changing the database, the migration directory gets noisy with too many files created in the dev iteration process. Once a feature is fixed, you might want to combine and squash all the migration files related to it into a single file. This can be achieved using the squash command of the Hasura CLI. Execute the following command:

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

and replace the value for `--from` appropriately.
