We will be building the backend of a realtime todo app.

You can use the one-click to deploy on Hasura Cloud to get started quickly.

[![Deploy to Hasura Cloud](https://hasura.io/deploy-button.svg)](https://cloud.hasura.io/deploy?github_repo=https://github.com/hasura/learn-graphql&hasura_dir=services/backend/hasura)

In this sample app,

- Users can maintain personal todos
- Users can view public todos
- A list of currently online users using the app
- Send email when a user signs up

Broadly this means that we have two main models in this app: `users` and `todos`, each with its own set of properties.

We will go over them in the subsequent steps.

The final model looks like the following:

![Schema Todo app](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

Check out the full tutorial here - [https://hasura.io/learn/graphql/hasura/introduction/](https://hasura.io/learn/graphql/hasura/introduction/)

## Apply Todo App Migrations and Metadata Manually

Update `config.yaml` to point to the right `graphql-engine` endpoint with/without `admin_secret`.

Run the following command in the console:
```bash
$ hasura deploy
```
This will apply the migrations and metadata.
