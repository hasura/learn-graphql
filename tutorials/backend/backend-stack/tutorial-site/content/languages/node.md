---
title: "Node.js"
metaTitle: "Instant GraphQL for Node.js backend stack"
metaDescription: "In this tutorial, learn how to integrate Node.js in a GraphQL backend server stack with Hasura"
---

This guide is for you if any of the following satisfies:
- You want to accelerate your API creation journey
- You want to expose a GraphQL API (possibly with Node.js)
- You want a high-performance API, REST, or GraphQL

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

- You will learn how to create a GraphQL server with Node.js and why you actually shouldn't.
- You will come across the performance implications of implementing a GraphQL server and how Hasura mitigates it with some benchmarks to showcase.
- If you have an existing GraphQL API with Node.js, you can integrate it with Hasura as a [Remote Schema](https://hasura.io/docs/latest/remote-schemas/index/) to get a unified GraphQL API or supergraph.
- If you have an existing REST API with Node.js, you can transform that declaratively to GraphQL without writing any code using [Hasura REST Connectors](https://hasura.io/docs/latest/actions/rest-connectors/).
- You can also re-use or custom write REST endpoints with Node.js and map the endpoint to a GraphQL schema in Hasura.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API to build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out [the documentation](https://hasura.io/docs/latest/index/).

This guide covers common backend application tasks, such as creating REST endpoints using [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/). This example works with Node version 18 or above. We also go over how to integrate your Node app with Hasura.

## Building a custom GraphQL Server in Node.js
If you have ever built a GraphQL Server in any of the Node.js frameworks, you would have come across various steps before exposing the API endpoint in GraphQL. Some of them include:

- Setting up GraphQL dependencies and npm modules
- Defining GraphQL schema type definitions
- Writing GraphQL resolvers
- Setting up DataLoader / batching libraries for optimized performance
- Exposing a restricted list of queries to the clients with authorization

and many more during maintenance and updates.

Among all the repetitive steps above, writing resolvers in GraphQL is the most time-consuming, is a heavy lift, and is something you keep fiddling with as the API changes. Let us go over the steps outlined above.

### Node.js project setup for GraphQL server

Initialize a Node app in a new folder.

```bash
npm init -y
```

In the created package.json replace `"main": "index.js"` with `"type": "module"`

Install the dependencies we will use.

```bash
npm install express graphql graphql-request graphql-yoga
```

Install the dev dependencies.

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

Borrowing from the [GraphQL Yoga quickstart](https://the-guild.dev/graphql/yoga-server/tutorial/basic/01-project-setup) we add two scripts to our `package.json`

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development ts-node-dev --exit-child --respawn src/main.ts",
    "start": "ts-node src/main.ts"
  }
}
```

### Create a Node.js GraphQL server with GraphQL Yoga

We can make a custom GraphQL server in Node using [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) and [GraphQL Code Generator](https://the-guild.dev/graphql/codegen). Then we connect it to Hasura using a [Remote Schema](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

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

2. In `package.json` add a codgen script.

   ```json
   {
     "scripts": {
       "codegen": "graphql-codegen --config server-codegen.ts"
     }
   }
   ```

3. Define `schema.graphql`, which will create the schema for our GraphQL server.

   ```graphql
   type Post {
     id: Int!
     title: String!
   }

   type Query {
     posts: [Post]
   }
   ```

4. Run the code generator `npm run codegen`.

5. Create the GraphQL Yoga server.

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

6. Add it to Express.

   ```typescript
   app.use("/graphql", graphQLServer);
   ```

7. Run the Express app and navigate to `<Express URL>/graphql`, if everything works you should be able to query `posts`.

> Here's the [source code](https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/backend-stack/source-code/node) for the above GraphQL server.

This is the bare minimum boilerplate that you need to get your GraphQL API running for a simple query. Extrapolating this for an app like e-commerce or even a blog system, you might need to replicate schema type definitions and resolver code for as many models as your application has. 

We looked at creating an API for simple CRUD. Extending this for real-time apps and use cases, you need an API layer that supports streaming data in real time. Interestingly, GraphQL spec provides a cleaner abstraction for consumers of real-time API through GraphQL Subscriptions.

### Real-time Subscriptions

Let us break down the creation of a GraphQL Subscription API with a GraphQL Server in Node.js that you write yourself.

- You will need a pub-sub connection, exposed via WebSockets.
- Set up some directives (`@live` etc). This varies for server implementations and clients consuming them.
- Optimize performance through multiplexing.

Hasura exposes a real-time GraphQL API on many databases. There are two forms of subscriptions that your clients can listen in: 
- Live queries (Gives the entire result set of the query)
- Streaming Subscriptions (Gives only the newly added result set from the cursor)

The GraphQL Subscriptions API is out of the box with Hasura.

> Read more about various [types of GraphQL Subscriptions](https://hasura.io/blog/types-of-realtime-graphql-subscriptions/) and the intricacies around the same.

### High-performance GraphQL for Node.js

Building a high-performance GraphQL Server is tricky. Look at Ben Awad’s performance benchmarks for Node.js GraphQL Servers. Although these numbers are old, they throw light on why writing your own GraphQL Server in Node.js is not a great choice.

Let’s deep dive into how performance becomes a blocker at a high level.

- You start with one data source/database. Define schema. Write GraphQL sesolvers
- Find N+1 query problem 😭with naive implementations
- Optimize with DataLoader pattern and batching techniques
- Try to federate across multiple data sources
- Face more performance issues

And finally, give up on GraphQL. 

#### Why is it hard to nail performance with a GraphQL API?

It is easy to implement a naive resolver that has N+1 problems. Resolvers typically overfetch data on the server side and return the same or a filtered object back to the client.

Compiler approach to GraphQL allows you to transform an incoming GraphQL query of any arbitrary depth, querying a single relational store to a highly optimized SQL query.

In a series of benchmarks with varying complexity of queries and data shapes, we measured query response times, query execution times, and memory usage and found that Hasura significantly outperformed a custom-written GraphQL resolver in Node.js. Some key takeaways include:

- Hasura was 3.6x faster in a benchmark against graphql-yoga on PostgreSQL.
- Apollo server requires 9x more nodes to have similar performance that Hasura was able to accomplish for 1k concurrent users on Oracle.

> [Benchmarks for Hasura vs. Apollo on Oracle](https://hasura.io/blog/hasura-vs-apollo-graphql-performance-benchmarks-oracle-rds/)

> [Benchmarks for Hasura vs. GraphQL Yoga on PostgreSQL](https://github.com/hasura/sample-apps/tree/main/graphql-benchmark)
> [Read more on the benchmark setup](https://hasura.io/blog/graphql-performance-benchmarks-hasura-vs-diy-nodejs-dataloader/)

### Node.js GraphQL API federation using Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [Remote Schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. In the Hasura Console Remote Schema tab, add your Node server `<Express URL>/graphql`

1. In the API Explorer tab, try querying the sample shows.

   ```graphql
   {
     posts {
       title
     }
   }
   ```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/node/node-remote-schema.png" alt="Hasura Event Triggers with Node backend" />

## Convert a Node.js REST API endpoint to GraphQL

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/node/expose-a-graphql-api.jpg" alt="Expose a GraphQL API" />

In this section, we will write a REST endpoint in Node.js using Express and see how to transform that to GraphQL. We will create a login POST endpoint that takes a username and password and returns an access code.

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

Run the app.

```bash
npm run dev
```

### Add Node REST endpoint to GraphQL schema using Hasura Actions

When writing a backend we usually have to write around 80% of our code doing boilerplate CRUD operations. Hasura helps us by autogenerating this part.

When we need to write custom business logic, we can integrate our Node REST endpoint using [Hasura Actions](https://hasura.io/docs/latest/actions/index/), giving us the best of both worlds.

In the Actions tab on the Hasura Console, we will set up a custom login function that calls the REST endpoint we created:

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

In the Hasura API explorer tab you should now be able to test it.

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

### Run async scheduled events using a Node REST API and Hasura GraphQL

Databases like PostgreSQL can run triggers when data changes, with [Hasura Event Triggers](https://hasura.io/docs/latest/event-triggers/index/) we can easily call an HTTP endpoint whenever we have one of these events.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

2.  In the Event Trigger tab, on the `user` table, check the insert via console trigger operations.

3.  The Event Trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We make an interface in TypeScript to represent this:

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

4.  Now we make a REST controller that handles the event.

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

5.  Add the route to `src/main.ts`.

    ```typescript
    app.use("/event", eventRouter);
    ```

When you add a user in Hasura your Express server should receive the event.

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/node/node-event-triggers.png" alt="Hasura Event Triggers with Node backend" />


## Example: Querying GraphQL with Node Client graphql-request

To query a GraphQL endpoint from Node we use [graphql-request](https://github.com/prisma-labs/graphql-request).

1. Create `client-codegen.ts`.

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

2. Modify the `package.json` codegen script.

   ```json
   {
     "scripts": {
       "codegen": "graphql-codegen --config server-codegen.ts && graphql-codegen --config client-codegen.ts"
     }
   }
   ```

3. In `src/action/action.ts` we add our query. We are going to fetch all users.

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

4. Run codegen `npm run codegen`.

5. In our action handler query all users.

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

6. Call your action REST endpoint and you should see all users printed out!

## Summary

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us nice hooks for this custom logic. 

We've gone over a few ways you can use the power of Node and TypeScript. This is also improving a lot more with Hasura v3, which lets you write TypeScript functions that get mapped to a GraphQL API. We will update this guide once that becomes GA.

See the [server source code on GitHub](https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/backend-stack/source-code/node).

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>

