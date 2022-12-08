import express from 'express';
import { actionRouter } from './action/action';
import { eventRouter } from './event/event';
import { readFileSync } from 'node:fs'
import { createServer } from '@graphql-yoga/node'
import { Resolvers } from './gql/server/resolvers-types';

export interface ActionPayload<T> {
  action: {
    name: string;
  },
  input: T,
  request_query: string;
  session_variables: Record<string, string>;
}

const typeDefs = readFileSync('./schema.graphql', 'utf8')

const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      return [{
        id: 1,
        title: "hi"
      }]
    }
  }
}

const graphQLServer = createServer({ schema: { typeDefs, resolvers } });

const app = express();

app.use(express.json());

app.use('/graphql', graphQLServer);

const port = 3000;

app.use('/action', actionRouter);
app.use('/event', eventRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});