---
title: "Client Side Elm Setup"
metaTitle: "Client Side Elm Setup | GraphQL Elm Tutorial"
metaDescription: "The GraphQL backend is already ready. We have a task to setup our client side, autogenerate Elm Types for the GraphQL Schema"
---

import GithubLink from "../src/GithubLink.js";

### Why?

We looked into the problems of making a GraphQL query from an elm application in the architecture section. Elm is statically typed and hence everything needs to be properly typed. 

Elm GraphQL [CLI](https://www.npmjs.com/package/@dillonkearns/elm-graphql#setup) is a tool which spits out elm types based on the GraphQL schema. We can use these types to interact with the GraphQL server.

### Elm GraphQL CLI Installation
Let's get started by installing elm-graphql:

```bash
$ npm install --save-dev @dillonkearns/elm-graphql
```

### Generate Elm Types
Let's generate Elm Types by adding a script to our package.json file as follows

Open `package.json` and add the following script:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/elm-graphql/app-final/package.json" text="package.json" />

```json
{
  "name": "elm-todo-hasura",
  "version": "0.0.1",
  "description": "",
  "main": "app.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run browserify && elm make src/Main.elm --output public/app.js --optimize && uglifyjs public/app.js --compress 'pure_funcs=\"F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9\",pure_getters=true,keep_fargs=false,unsafe_comps=true,unsafe=true,passes=2' --output=public/app.js && uglifyjs public/app.js --mangle --output=public/app.js",
    "start": "npm run browserify && cd public && elm-live ../src/Main.elm --port=8081 --host=localhost --open --pushstate --start-page=index.html -- --output=app.js --debug",
    "browserify": "browserify public/index.js -o public/bundle.js",
+   "generate-elm-types": "elm-graphql https://hasura.io/learn/graphql --base Hasura"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@dillonkearns/elm-graphql": "^4.1.3",
    "elm": "^0.19.1-5",
    "elm-live": "^4.0.2",
    "uglifyjs": "^2.4.11"
  }
}

```

Before we generate our types, we will need to get the `Authorization` token to access the GraphQL server. Lets login using the below link and get the `Authorization Token`

[hasura.io/learn/graphql/graphiql?tutorial=react-native](https://hasura.io/learn/graphql/graphiql?tutorial=react-native)

![Copy authorization token](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-elm/CopyAuthorizationToken.jpg)

Copy the `Authorization Token` header as in the screenshot and execute the following command to generate elm types

```bash
npm run generate-elm-types -- --header "Authorization: Bearer <token>"
```

You should see a folder called `Hasura` inside `src/` as in the screenshot below

![Generated elm types](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-elm/GeneratedTypes.jpg)

This folder contains everything you need to interact with this GraphQL server.

Woo hoo, you have successfully configured your client. You can straight away dive into the action. Here is how the tutorial will be structured. 

For every functionality we will definitely have following snippets of code:

  - Add imports
  - Side effects ([Commands and Subscriptions](https://guide.elm-lang.org/effects/))
  - Add/Modify data types 
  - Generate a GraphQL query/mutation using `elm-graphql` generated functions
  - Handle new `Msg` types
  - Handle new `Msg` scenarios in `update` function
  - Create/Update render functions
