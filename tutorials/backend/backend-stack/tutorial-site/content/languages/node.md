---
title: "Node.js"
metaTitle: "Node.js | GraphQL Backend Stack Tutorial"
metaDescription: "Learn how to integrate Node.js with Hasura."
---

## What is Node

Node.js is an open-source, cross-platform JavaScript runtime environment. Learn more at [the official website](https://nodejs.org).

This guide covers common backend application tasks, such as creating REST endpoints using [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/). We use Node version 18 or above. We also go over how to integrate your Node app with Hasura.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out [the documentation](https://hasura.io/docs/latest/index/).

See the [the server source code on Github](https://github.com/hasura/learn-graphql/backend/backend/tutorial-site/source-code/node).

## Setup

Initialize a Node app in a new folder

```bash
npm init -y
```

In the created package.json replace `"main": "index.js"` with `"type": "module"`

Install the dependencies we will use

```bash
npm install express graphql graphql-request graphql-yoga
```

Install the dev dependencies

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/typescript @graphql-codegen/typescript-resolvers @tsconfig/node18-strictest @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser cross-env eslint ts-node ts-node-dev typescript
```

Create `tsconfig.json`

```json
{
  "extends": "@tsconfig/node18-strictest/tsconfig.json",
  "compilerOptions": {
    "importsNotUsedAsValues": "remove"
  }
}
```

Create `.eslintrc.cjs`

```javascript
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};
```

Borrowing from the [GraphQL Yoga quickstart](https://www.the-guild.dev/graphql/yoga-server/tutorial/basic/01-project-setup) we add two scripts to our `package.json`

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development ts-node-dev --exit-child --respawn src/main.ts",
    "start": "ts-node src/main.ts"
  }
}
```

## Create Node REST Endpoint

We will create a login POST endpoint that takes a username and password and returns an access code using Express.

In our `src/main.ts`, we use Express to create an HTTP server:

```typescript
import express from "express";
import { actionRouter } from "./action/action";

export interface ActionPayload<T> {
  action: {
    name: string;
  };
  input: T;
  request_query: string;
  session_variables: Record<string, string>;
}

const app = express();

app.use(express.json());

const port = 3000;

app.use("/action", actionRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

In `action/action.ts`, we generate the handler:

```typescript
import express, { Router, Request, Response } from "express";
import { ActionPayload } from "../main";

const actionRouter: Router = express.Router();

interface loginArgs {
  username: string;
  password: string;
}

interface LoginResponse {
  AccessToken: string;
}

actionRouter.post(
  "",
  async (
    req: Request<object, object, ActionPayload<loginArgs>>,
    res: Response<LoginResponse>
  ) => {
    console.log(req.body);
    res.send({ AccessToken: "test" });
  }
);

export { actionRouter };
```

Run the app

```bash
npm run dev
```

### Hasura Action

When writing a backend we usually have to write around 80% of our code doing boilerplate CRUD operations. Hasura helps us by autogenerating this part.

When we need to write custom business logic we can integrate our Node REST endpoint using [Hasura Actions](https://hasura.io/docs/latest/actions/index/), giving us the best of both worlds.

In the Actions tab on the Hasura Console we will set up a custom login function that calls the REST endpoint we created:

```graphql
type Mutation {
  login(username: String!, password: String!): LoginResponse
}
```

New types definition:

```graphql
type LoginResponse {
  AccessToken: String!
}
```

Create the action, click the `Codegen` tab, and select `typescript-express`.

Copy the files and run the Express application:

```bash
npm run dev
```

In the Hasura API explorer tab you should now be able to test it

```graphql
mutation {
  login(password: "password", username: "username") {
    AccessToken
  }
}
```

Result:

```json
{
  "data": {
    "login": {
      "AccessToken": "test"
    }
  }
}
```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/node/node-hasura-actions.png" alt="Hasura Actions with Node backend" />

### Event Triggers

Databases like Postgres can run triggers when data changes, with [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can easily call an HTTP endpoint whenever we have one of these events.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

1.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

1.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We make an interface in TypeScript to represent this

    ```typescript
    interface EventPayload<New, Old> {
      created_at: string;
      delivery_info: {
        current_retry: number;
        max_retries: number;
      };
      event: {
        data: {
          new: New;
          old: Old;
        };
        op: "INSERT" | "UPDATE" | "DELETE" | "MANUAL";
        session_variables: Record<string, string>;
        trace_context: {
          span_id: string;
          trace_id: string;
        };
      };
      id: string;
      table: {
        name: string;
        schema: string;
      };
      trigger: {
        name: string;
      };
    }
    ```

1.  Now we make an REST controller that handles the event

    ```typescript
    interface UserTable {
      id: string;
      name: string;
    }

    const eventRouter: Router = express.Router();

    eventRouter.post(
      "",
      async (
        req: Request<object, object, EventPayload<UserTable, null>>,
        res: Response
      ) => {
        console.log(req.body);
        res.sendStatus(200);
      }
    );

    export { eventRouter };
    ```

1.  Add the route to `src/main.ts`

    ```typescript
    app.use("/event", eventRouter);
    ```

When you add a user in Hasura your Express server should receive the event.

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/node/node-event-triggers.png" alt="Hasura Event Triggers with Node backend" />

## Create a GraphQL Yoga Server

We can make a custom GraphQL server in Node using [GraphQL Yoga](https://www.the-guild.dev/graphql/yoga-server) and [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen). Then we connect it to Hasura using a [remote schema](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. Create `server-codegen.ts`

   ```typescript
   import type { CodegenConfig } from "@graphql-codegen/cli";

   const server: CodegenConfig = {
     schema: "schema.graphql",
     generates: {
       "./src/gql/server/resolvers-types.ts": {
         config: {
           useIndexSignature: true,
         },
         plugins: ["typescript", "typescript-resolvers"],
       },
     },
   };
   export default server;
   ```

1. In `package.json` add a codgen script

   ```json
   {
     "scripts": {
       "codegen": "graphql-codegen --config server-codegen.ts"
     }
   }
   ```

1. Define `schema.graphql` which will create the schema for our GraphQL server

   ```graphql
   type Post {
     id: Int!
     title: String!
   }

   type Query {
     posts: [Post]
   }
   ```

1. Run the code generator `npm run codegen`

1. Create the GraphQL Yoga server

   ```typescript
   import { readFileSync } from "node:fs";
   import { createServer } from "@graphql-yoga/node";
   import { Resolvers } from "./gql/server/resolvers-types";

   const typeDefs = readFileSync("./schema.graphql", "utf8");

   const resolvers: Resolvers = {
     Query: {
       posts: async () => {
         return [
           {
             id: 1,
             title: "hi",
           },
         ];
       },
     },
   };

   const graphQLServer = createServer({ schema: { typeDefs, resolvers } });
   ```

1. Add it to Express

   ```typescript
   app.use("/graphql", graphQLServer);
   ```

1. Run the Express app and navigate to `<Express URL>/graphql`, if everything worked you should be able to query `posts`

### Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. In the Hasura Console remote schema tab, add your Node server `<Express URL>/graphql`

1. In the API Explorer tab, try querying the sample shows.

   ```graphql
   {
     posts {
       title
     }
   }
   ```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/
backend-stack/node/node-remote-schema.png" alt="Hasura Event Triggers with Node backend" />

## Query GraphQL from Java

To query a GraphQL endpoint from Node we use [graphql-request](https://github.com/prisma-labs/graphql-request).

1. Create `client-codegen.ts`

   ```typescript
   import type { CodegenConfig } from "@graphql-codegen/cli";

   const client: CodegenConfig = {
     overwrite: true,
     schema: "<GraphQL URL>",
     documents: "src/**/*.ts",
     generates: {
       "./src/gql/client/": {
         preset: "client",
         plugins: [],
       },
     },
   };

   export default client;
   ```

1. Modify the `package.json` codegen script

   ```json
   {
     "scripts": {
       "codegen": "graphql-codegen --config server-codegen.ts && graphql-codegen --config client-codegen.ts"
     }
   }
   ```

1. In `src/action/action.ts` we add our query. We are going to fetch all users.

   ```typescript
   import { GraphQLClient } from "graphql-request";

   import { graphql } from "../gql/client/index";

   const userQuery = graphql(`
     query AllUsers {
       users: user {
         id
       }
     }
   `);
   ```

1. Run codegen `npm run codegen`

1. In our action handler query all users

   ```typescript
   actionRouter.post(
     "",
     async (
       req: Request<object, object, ActionPayload<loginArgs>>,
       res: Response<LoginResponse>
     ) => {
       const { users } = await request(
         "http://localhost:8080/v1/graphql",
         userQuery
       );
       console.log(users, req.body);
       res.send({ AccessToken: "test" });
     }
   );
   ```

1. Call your action REST endpoint and you should see all users printed out!

## Conclusion

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us escape hatches for this custom logic. We've gone over a few ways you can use the power of Node and TypeScript. Enjoy!

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
