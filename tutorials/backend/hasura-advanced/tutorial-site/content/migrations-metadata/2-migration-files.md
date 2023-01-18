---
title: "Managing migration files"
metaTitle: "Managing migration files | Hasura GraphQL Advanced Tutorial"
metaDescription: "Hasura comes with a built-in migration system to manage the database schema. Managing the database schema to perform incremental, reversible updates that are version controlled is a critical component for apps running in production."
---

Managing the database schema to perform incremental, reversible updates that are version controlled is a critical component for apps running in production. Hasura comes with a [built-in migration system](https://hasura.io/docs/latest/migrations-metadata-seeds/manage-migrations/) to manage the database schema.

More importantly, migration files are generated automatically by the Console UI when served through the CLI. This makes it easy to make changes to the schema, such as creating tables, columns, functions, and views using the UI. Read more about the [architecture of how Hasura built the UI to autogenerate database migrations](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/).

It's important to mention that the UI is not the only way to generate migration files. The `hasura` CLI lets you create migration files manually, which we will use to initialize our schema for this tutorial.

[Download the SQL file](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql) and execute the following command:

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

Update the path to the SQL file appropriately. This would create a migration file with the contents of the above SQL file. Check the newly created migration files in the `migrations` directory of your hasura project.

Next up, execute the following command:

```bash
hasura migrate apply --database-name default
```

This would apply the migration files present in the `migrations` directory, following the order of files.

Now head to `http://localhost:9695/console/data` (the Data tab) to see the list of untracked tables. These tables were part of the SQL file used in the initial migration.

If you are looking to reset migration, follow this blog post [Resetting Hasura Migrations](https://hasura.io/blog/resetting-hasura-migrations/)

**Note**: Using Hasura's migration system is optional. If you are comfortable or familiar with other database migration tooling, you can continue to use that to manage your database schema. To disable Hasura's migration, you can do so via the Console served by the CLI. Head to the Data -> Migrations tab and switch off the toggle `Allow Postgres schema changes via console`.
