---
title: "Tutorial & boilerplate setup"
metaTitle: "Todo app angular boilerplate setup | GraphQL Angular Apollo Tutorial"
metaDescription: "The GraphQL backend is already ready. The task is to convert the static UI into a working realtime app in Angular"
---

For this tutorial, the GraphQL backend and the basic app UI is already ready.
Our task will be to convert the "static" UI into a working realtime app.

### Download and run the boilerplate

1. Download the boilerplate from [https://hasura.io/learn/graphql/angular-apollo/boilerplate.zip](https://hasura.io/learn/graphql/angular-apollo/boilerplate.zip)
2. Unzip and make sure you're in the `app-boilerplate` directory
3. Install dependencies and run the "static" app
    - `npm install`
    - `npm start`
4. Signup/login as a user to load the todo app page

This is what you should see after the steps above:

![Boilerplate after login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

### Load GraphiQL to play with your GraphQL APIs

1. Head to https://hasura.io/learn/graphql/graphiql
2. Log in (so that you can test the GraphQL APIs with a valid user token)

This is what you should see after the steps above:

![GraphiQL after login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### GraphQL Endpoint

We are going to make use of `https://hasura.io/learn/graphql` endpoint for making our GraphQL requests in the tutorial.

Now, if you want to run your own version of the above GraphQL endpoint, you can do so by following the Hasura Backend tutorial

- Deploy Hasura Cloud

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- Set up Hasura Backend

Head to [Hasura Backend Tutorial](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole) and get started with creating your own version.
