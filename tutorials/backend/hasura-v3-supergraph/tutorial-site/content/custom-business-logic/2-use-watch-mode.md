---
title: 'Use Watch Mode'
metaTitle: 'Use Watch Mode | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Use watch mode to test your supergraph in real time.'
---

## Activate watch mode {#activate-watch-mode}

From the root directory of our project, run the following command to activate watch mode:

```bash
hasura3 watch
```

As before, you'll see tunnels generated for each of your data sources; this time, including the TypeScript Connector.

## Track the function {#track-function}

The CLI will generate a new build and you'll be able to access it via your GraphQL API. By default, functions added to
your TypeScript connector are registered as mutations. However, we need to track the function in order to use it in our
GraphQL API.

Head to the `/subgraphs/default/dataconnectors/ts_logic/ts_logic.hml` file. You'll notice the `hello` procedure has a
warning underline. We can use LSP to perform a quick fix and track this function! Hover over the procedure and click the
lightbulb icon. Then, select "Track function `hello` as a command in your subgraph".

You'll be asked to choose a subgraph; ensure it's `default`. The extension will then generate your types and — as Hasura
is in watch mode — a new build will be triggered.

## Test the connector on Hasura DDN {#test-connector}

You can create the following mutation and test it out in the Console after your build completes:

```graphql
mutation sample_hello {
  hello
}
```

This will return the string "hello world" as expected 🎉

You can also explore your supergraph and see the new `hello` mutation in the Explorer:

![Hello mutation](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/hello-mutation.png)
