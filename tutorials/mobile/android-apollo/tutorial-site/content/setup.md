---
title: "Tutorial & boilerplate setup"
metaTitle: "Todo app Android boilerplate setup | GraphQL Android Apollo Tutorial"
metaDescription:
  "The GraphQL backend is already ready. The task is to convert the static UI into a working realtime app in Android"
---

For this tutorial, the GraphQL backend and the basic app UI is already ready. Our task will be to convert the "static"
UI into a working realtime app.

### Clone and run the boilerplate

1. Clone the [learn-graphql](https://github.com/hasura/learn-graphql) repo. Execute the following commands in your
   terminal:

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/mobile/android-apollo/app-boilerplate
```

2. Navigate to the `app-boilerplate` directory.

```bash
cd tutorials/mobile/android-apollo/app-boilerplate
```

3. This project uses Gradle for dependency resolution, so you would need the latest version of Gradle installed.
4. Sync Project with Gradle files
5. Run the app in android studio and signup with Auth0 to view the app

This is what you should see after the steps above:

![Boilerplate login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-android/boilerplate-login.png)
![Boilerplate after login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-android/boilerplate-private-todo.png)
![Boilerplate feed](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-android/boilerplate-public-feed.png)
![Boilerplate online](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-android/boilerplate-online-users.png)

### Load GraphiQL to play with your GraphQL APIs

1. Head to https://hasura.io/learn/graphql/graphiql
2. Log in (so that you can test the GraphQL APIs with a valid user token)

This is what you should see after the steps above:

![GraphiQL after login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### GraphQL Endpoint

We are going to make use of `https://hasura.io/learn/graphql` endpoint for making our GraphQL requests in the tutorial.

Now, if you want to run your own version of the above GraphQL endpoint, you can do so by following the Hasura Backend
tutorial

- Deploy Hasura Cloud

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- Set up Hasura Backend

Head to [Hasura Backend Tutorial](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole) and get started with
creating your own version.
