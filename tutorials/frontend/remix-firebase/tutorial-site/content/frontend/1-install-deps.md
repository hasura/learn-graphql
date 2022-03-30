---
title: "Install Dependencies"
metaTitle: "Install Dependencies | Remix Fullstack GraphQL Tutorial"
metaDescription: "You will setup a solid foundation for your Remix app"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/package.json" text="package.json" />

1. In our `package.json` we'll add the dependencies for our app, make sure everything is the latest version, and modify the scripts section. Please copy the package.json from the Github link to your folder.

   ```json
   {
     "private": true,
     "name": "remix-app-template",
     "description": "",
     "license": "",
     "dependencies": {
       "@remix-run/react": "1.2.3",
       "@remix-run/serve": "1.2.3",
       "firebase": "9.6.7",
       "firebase-admin": "10.0.2",
       "graphql": "16.3.0",
       "graphql-request": "4.0.0",
       "graphql-tag": "2.12.6",
       "react": "17.0.2",
       "react-dom": "17.0.2",
       "react-firebaseui": "6.0.0",
       "react-use": "17.3.2",
       "remix": "1.2.3",
       "remix-utils": "2.5.0",
       "zod": "3.12.1",
       "cross-env": "7.0.3"
     },
     "devDependencies": {
       "@graphql-codegen/cli": "2.6.2",
       "@graphql-codegen/typescript": "2.4.5",
       "@graphql-codegen/typescript-graphql-request": "4.3.7",
       "@graphql-codegen/typescript-operations": "2.3.2",
       "@remix-run/dev": "1.2.3",
       "@remix-run/eslint-config": "1.2.3",
       "@types/react": "17.0.39",
       "@types/react-dom": "17.0.12",
       "eslint": "8.10.0",
       "typescript": "4.6.2"
     },
     "engines": {
       "node": ">=14"
     },
     "sideEffects": false,
     "scripts": {
       "build": "cross-env NODE_ENV=production remix build",
       "dev": "cross-env NODE_ENV=development remix dev",
       "postinstall": "remix setup node",
       "start": "cross-env NODE_ENV=production remix-serve build",
       "codegen": "node -r dotenv/config node_modules/.bin/gql-gen"
     }
   }
   ```

1. Run `npm install`
