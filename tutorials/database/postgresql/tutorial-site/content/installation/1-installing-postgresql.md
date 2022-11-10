---
title: "Installing PostgreSQL"
metaTitle: "Installing PostgreSQL on Local and Cloud | PostgreSQL Tutorial"
metaDescription: "There are multiple ways to install Postgres and we will look at how to use docker-compose for local installation and Heroku for cloud installation."
---

Before we dive in to the core concepts, we will install Postgres on the local machine to try out all the SQL statements given in examples. There are multiple ways to set up Postgres, but for this tutorial we will focus on local development and one Cloud alternative.

## Setup Postgres locally using Docker

We can make use of docker-compose to install Postgres locally

Create a new file called `compose.yaml` and copy the contents below:

```yaml
version: '3.6'
services:
  postgres:
    image: postgres:13.3
    restart: always
    ports:
    - "5432:5432"
    volumes:
    - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgrespassword
volumes:
  db_data:
```

In your terminal, execute the following command:

```bash
docker-compose up -d
```

Now you can check if the above command was successful, by executing the following command:

```bash
docker ps
```

This should give an output which should look something like this:

```bash
CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS         PORTS                                       NAMES
2aa0954cd3e0   postgres:13.3                         "docker-entrypoint.s…"   12 seconds ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp         postgres_1
```

If the status is up, then Postgres is ready to be connected. In the next step, we will look at how to connect to this instance.

## Setup PostgreSQL via Heroku Postgres

Alternatively, you can also set up PostgreSQL via Heroku. Heroku has a free tier Postgres add-on that can be used for quick testing and of course can be later upgraded for production usage.

Head to [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) Add-on page and click on `Install Heroku Postgres` button.

![Heroku Postgres Addon](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-postgresql/heroku-postgres-addon-page.png)

In the next step you will be asked to select an app in your Heroku account to provision the Postgres addon. In case you are new to Heroku or don't have an app created yet, you can head to [Heroku Dashboard](https://dashboard.heroku.com) to create a new app and map that to your Postgres addon in the above step.

![Postgres Provisioning](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-postgresql/postgres-provision.png)

This will provision the database on the app you have selected.
