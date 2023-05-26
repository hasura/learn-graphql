---
title: "Tutorial & boilerplate setup"
metaTitle: "Todo app react native boilerplate setup | GraphQL React Native Apollo Tutorial"
metaDescription:
  "The GraphQL backend is already ready. The task is to convert the static UI into a working realtime app in React
  Native"
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

git sparse-checkout add tutorials/mobile/react-native-apollo/app-boilerplate
```

2. Navigate to the `app-boilerplate` directory.

```bash
cd tutorials/mobile/react-native-apollo/app-boilerplate
```

3. Make sure you have `expo-cli` installed

   - `npm install -g expo-cli`

4. Install dependencies and run the app. This will start the development server

   - `yarn`
   - `yarn start`

5. Open this app from your phone using `Expo`

6. Signup/login as a user to load the todo app screen

After you login, you should get something like this:

![UI after logging in](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react-native/ui-after-login.png)

### Load GraphiQL to play with your GraphQL APIs

1. Head to https://hasura.io/learn/graphql/graphiql?tutorial=react-native
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
