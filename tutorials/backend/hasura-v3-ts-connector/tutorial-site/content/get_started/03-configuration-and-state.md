---
title: "Configuration and State"
metaTitle: 'Configuration and State | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

We need to fill in implementations for each of the required functions, but we won't need all of these to work just yet.

First, you'll see that we define two types: `Configuration`, and `State`.

Let's define those now above the `connector` and `start` function:

```typescript
type Configuration = {
  tables: TableConfiguration[];
};

type TableConfiguration = {
  tableName: string;
  columns: { [k: string]: Column };
};

type Column = {};

type State = {
  db: Database;
};
```

`Configuration` is the type of the connector's configuration, which will be read from a directory on disk. By
convention, this configuration should be enough to reproducibly determine the NDC schema, so for our SQLite connector,
we configure the connector with a list of tables that we want to expose. Each table is defined by its name and a list of
columns. Columns don't have any specific configuration yet, but we leave an empty object type here because we might want
to capture things like column types later on.

[//]: # (TODO: What does it mean to validate the configuration? What does it mean to have a validated configuration?)

## State

The `State` type is for things like connection pools, handles, or any non-serializable state that gets allocated on
startup, and which lives for the lifetime of the connector. For our connector, we need to keep a handle to our sqlite
database.

Cool, so now that we've got our types defined, we can fill in the function definitions which the connector requires 
in order to interact with our SQLite database and Hasura DDN. Let's do that in the next step.