---
title: "Dev Environments"
metaTitle: "Dev Environments | Hasura GraphQL Advanced Tutorial"
metaDescription: ""
---

## Local Development

The Hasura instance that is running locally on your machine with docker-compose is the dev environment setup. The Hasura CLI can be used to serve the console for automatic management of migrations and metadata.

## Staging Environment

Now let's create a staging environment and try to replicate the schema and metadata that we have in our local dev setup.

We are going to make use of Hasura Cloud for the staging environment. [Hasura Cloud](https://hasura.io/cloud/) gives you a scalable, highly available, globally distributed, fully managed, secure GraphQL API as a service!

Click on the following button to create a new project on Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

Once you register and sign in, you should see the following welcome screen:

![Hasura Cloud Welcome Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Hasura requires a Postgres database to start with. We can make use of Heroku's free Postgres database tier to set this up.

Click on `Try a free database with Heroku` button. After logging in to Heroku, Hasura Cloud will perform the following for you:

- Create an app on Heroku
- Install Postgres Add-on
- Fetch database URL that you can use to configure Hasura

![Hasura Cloud Heroku Configuration](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Once the database URL is fetched, you can click on `Create Project` button to deploy an instance of Hasura. Once the project is created, it might take a few seconds to initialize. Open the Hasura console by clicking on the `Launch Console` button to open the console.

Now copy the project URL that looks like `https://myproject.hasura.app`. (replace `myproject` with your hasura project name).

Head back to the terminal, on to the Hasura project directory. Execute the following command:

```bash
hasura migrate apply --endpoint https://myproject.hasura.app
hasura metadata apply --endpoint https://myproject.hasura.app
```

Now, try refreshing the Hasura Console on the Cloud project and see if the database schema is reflecting there. Essentially we have replicated the schema and metadata on to a new Hasura instance and new Postgres database.

As we keep changing the schema locally, we can keep applying the above two commands to apply the same changes to the staging environment.

## Squashing Migrations

As we keep changing the database, the migration directory gets noisy with too many files created in the dev iteration process. Once a feature is fixed, you might want to combine and squash all the migration files related to it into a single file. This can be achieved using the squash command of the Hasura CLI. Execute the following command:

```bash
hasura migrate squash --name "squashed-migration" --from 123 --endpoint https://myproject.hasura.app
```

and replace the value for `--from` appropriately.