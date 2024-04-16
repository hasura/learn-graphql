---
title: "Add the TypeScript Connector"
metaTitle: "Add the TypeScript Connector | Hasura v3 Supergraph Modeling Tutorial"
metaDescription: "Add the TypeScript Connector to a subgraph."
---

We'll start by adding the TypeScript Connector to the UX (`app`) subgraph. While we can have multiple functions included
within a single connector, we'll keep it simple and create a function that will take a user's orders and profiles them
into a category of either "GadgetPro" or "Homebody".

## Add the TypeScript Connector to the User Experience subgraph {#add-ux-connector}

Start by killing dev mode by pressing `Ctrl+C` in the terminal where you ran `ddn dev`. Then, run the following command
to add the TypeScript Connector to the UX subgraph:

```bash
ddn add connector-manifest ts_logic --subgraph app --hub-connector hasura/nodejs --type cloud
```

After running this command, have a peek in your `/app` directory. You should see a new sub-directory called
`/app/ts_logic` and structure that looks like this:

```bash
├── commands
├── connector
│   ├── functions.ts
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── ts_functions.build.hml
│   └── tsconfig.json
├── ts_functions-types.hml
└── ts_functions.hml
```

We'll write our business logic in the `functions.ts` file. Currently, it has a `hello()` function that simply returns
the string "hello world".

In the next step, we'll use watch mode to run the connector and test it on Hasura DDN. Then, we'll update the
`functions.ts` file to include our business logic and see the changes instantly reflected in our GraphQL API 🚀
