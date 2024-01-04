---
title: 'Add the TypeScript Connector'
metaTitle: 'Add the TypeScript Connector | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Add the TypeScript Connector to a subgraph.'
---

We'll start by adding the TypeScript Connector to the UX (`default`) subgraph. While we can have multiple functions
included within a single connector, we'll keep it simple and create a function that will take a user's orders and
profiles them into a category of either "GadgetPro" or "Homebody".

## Add the TypeScript Connector to the User Experience subgraph {#add-ux-connector}

Start by killing watch mode by pressing `Ctrl+C` in the terminal where you ran `hasura3 watch`. Then, run the following
command to add the TypeScript Connector to the UX subgraph:

```bash
hasura3 metadata add-hub-connector ts_logic --dir . --subgraph default --id hasura/ts-deno --url http://localhost:8100
```

Let's break down this command:

- `hasura3 metadata add-hub-connector`: This command adds a connector to a subgraph.
- `ts_logic`: This is the name we want to give the connector; this can be anything you want.
- `--dir .`: This tells Hasura to look in the current directory for the connector.
- `--subgraph default`: This tells Hasura to add the connector to the (`default`) UX subgraph.
- `--id hasura/ts-deno`: This is the ID of the connector we want to add. This is lets us know the author is Hasura and
  the connector is `ts-deno`.
- `--url http://localhost:8100`: This is the URL of the connector. We'll be running the connector locally, so we'll use
  `localhost` and the port we'll be running the connector on.

After running this command, have a peek in your `/subgraphs/default/dataconnectors` directory. You should see a new
directory called `ts_logic` and structure that looks like this:

```bash
├── pg_db
│   └── pg_db.hml
├── pg_db-types.hml
└── ts_logic
    ├── index.ts
    ├── ts.connector.config.json
    └── ts_logic.hml
```

We'll write our business logic in the `index.ts` file. Currently, it has a `hello()` function that simply returns the
string "hello world".

In the next step, we'll use watch mode to run the connector and test it on Hasura DDN. Then, we'll update the `index.ts`
file to include our business logic and see the changes instantly reflected in our GraphQL API 🚀
